var userno;
// to get the number count of registerd users in firebase database
  document.getElementById('error').style.color="red"
  document.getElementById('error1').style.color="red"
  document.getElementById('error2').style.color="red"


function get(){

  if(localStorage.getItem('myid')==undefined ||localStorage.getItem('myid')=='' || localStorage.getItem('myid')==null ||
     localStorage.getItem('myemail')==undefined ||localStorage.getItem('myemail')=='' || localStorage.getItem('myemail')==null){
       showToast('Oops some thing went wrong');
       window.location.replace('index.html');
     }

  var _db = firebase.database();
  var todosRef = _db.ref('Users');
  todosRef.on('value', (data) => {
    userno = data.numChildren();
    console.log(userno);
  })

}

//when image is selected for student account . this function checking it length
document.getElementById('itemfile').onchange = function() {
  if(this.files[0].size > 307200){
    document.getElementById('error').style.color="red"
    document.getElementById('error').innerHTML ="File Size must less than 300 KB";
     this.value = "";
  };
};

// when image is selected for teacher account . this function checking it length
document.getElementById('itemfile1').onchange = function() {
  if(this.files[0].size > 307200){
    document.getElementById('error1').style.color="red"
    document.getElementById('error1').innerHTML ="File Size must less than 300 KB";
     this.value = "";
  };
};

// when image is selected for Co-principal account . this function checking it length
document.getElementById('itemfile2').onchange = function() {
  if(this.files[0].size > 307200){
    document.getElementById('error2').style.color="red"
    document.getElementById('error2').innerHTML ="File Size must less than 300 KB";
     this.value = "";
  };
};



function addTeacher() {
 
  document.getElementById('error1').innerHTML = '';
  document.getElementById('error1').style.color="red"
  
  var tename = document.getElementById('tname').value;
  var teemail = document.getElementById('temail').value;
  var teaddress = document.getElementById('taddress').value;
  var tepass = document.getElementById('tpass').value;
  var tecpass = document.getElementById('tconfirmpass').value;
  var tetpno = document.getElementById('tpno').value;
  var tetdept = document.getElementById('tdeptname').value;
  var  file = document.getElementById("itemfile1").files[0]; 

  if(!tepass===tecpass)
  {
    document.getElementById('error1').innerHTML="Confirm Password Not Match";
  }

   else if(!teemail.includes('@teacher.com'))
   {
    document.getElementById('error1').innerHTML="Domain Must Contain '@student.com' "
   }
   else if(file==undefined)
   {
    document.getElementById('error1').innerHTML="Select Image";
   }

   else if(!tetpno.length==11)
   {
    document.getElementById('error1').innerHTML="Invalid Phone Number (Must contain 11 characters)";
   }

   else if(teemail.includes('@gmail.com') || teemail.includes('@yahoo.com') || teemail.includes('@hotmail.com') || teemail.includes('@outlook.com'))
  {
    document.getElementById('error1').innerHTML="Invalid Email";
  }


else{

  document.getElementById('loaddiv1').removeAttribute('hidden');
  document.getElementById('stdbtn1').disabled=true;

  firebase.auth().createUserWithEmailAndPassword(teemail, tepass).then(function(success){

// varible to create refrence of firebase storage
var storageref = firebase.storage().ref("storage");
// function for uploading file in firebase database
var uploadtask= storageref.child(''+(new Date()).getTime()+file.name).put(file).then((snapshot)=>{
 // returns the download url to download image from storage
return snapshot.ref.getDownloadURL();
}).then(downloadURL => {
// pushing data  and image url object into firebase database
   var database = firebase.database().ref();

   var skey =firebase.database().ref('Users/').push();

      var teacherObj = {
        id : skey.key,
        userno : userno,
        name : tename ,
        Email : teemail,
        teacherAddress : teaddress,
        teacherPassword : tepass,
        teacherPhoneNo : tetpno,
        teacherDepartment : tetdept,
        accountType : "teacher" ,
        imgURL : downloadURL
      }

      skey.set(teacherObj);  

        var myasynktask = new Promise(function(sucess , failure){
        setTimeout(function()  {
        
        // for updation user no info
          get();

         document.getElementById('loaddiv1').hidden="true";
         document.getElementById('error1').style.color="rgb(7,215,155)"
         document.getElementById('error1').innerHTML="Teacher added Sucessfully";
         document.getElementById('error1').style.color="red"
         document.getElementById('stdbtn1').disabled=false;

         // used for show empty input field  of 'additem' form after sucessfully uploading  a file
         document.getElementById('tname').value='';
         document.getElementById('temail').value='';
         document.getElementById('taddress').value='';
         document.getElementById('tpass').value='';
         document.getElementById('tconfirmpass').value='';
         document.getElementById('tpno').value='';
         document.getElementById('tdeptname').value='';
         document.getElementById("itemfile1").value=''; 
       }, 3000)});

   })
// catch of file upload promise
.catch((error)=>{
console.log('error' , error)
document.getElementById('loaddiv1').hidden=true;
document.getElementById('stdbtn1').disabled=false;
document.getElementById('error1').innerHTML=''+error;
})

// catch of user Auth promise
}).catch((error)=>{
  console.log('error' , error)
  document.getElementById('loaddiv1').hidden=true;
  document.getElementById('stdbtn1').disabled=false;
  document.getElementById('error1').innerHTML=''+error;
  })

}
}


function addStudent(){

  document.getElementById('error').innerHTML = '';
  document.getElementById('error').style.color="red"

   var suname = document.getElementById('sname').value;
  var semail = document.getElementById('semail').value;
  var saddress = document.getElementById('saddress').value;
  var spass = document.getElementById('spass').value;
  var srepass = document.getElementById('srepass').value;
  var sphone = document.getElementById('sphone').value;
  var sroll = document.getElementById('sroll').value;
  var ssection = document.getElementById('ssection').value;
  var ssem = document.getElementById('semester').value;
  var stdepart = document.getElementById('deptname').value;
  var  file = document.getElementById("itemfile").files[0]; 
  var batch = document.getElementById("sbatch").value; 
  var chek ;

  if(spass==0 || srepass==0 || semail.length==0 || sphone.length==0 || ssem.length==0 || batch.length==0){
    document.getElementById('error').innerHTML="Please Must fill out all the field";
  }
  else if(!spass===srepass)
  {
    document.getElementById('error').innerHTML="Confirm Password Not Match";
  }

   else if(!semail.includes('@student.com'))
   {
    document.getElementById('error').innerHTML="Domain Must Contain '@student.com' "
   }

   else if(!sphone.length==11)
   {
    document.getElementById('error').innerHTML="Invalid Phone Number (Must contain 11 characters)";
   }
   else if(ssem.length==0 || ssem>6)
   {
    document.getElementById('error').innerHTML="Empty or Invalid Semester choosen";
   }
   else if(batch.length<4)
   {
    document.getElementById('error').innerHTML="Invalid Batch Number (Must contain 4 characters)";
   }

   else if(semail.includes('@gmail.com') || semail.includes('@yahoo.com') || semail.includes('@hotmail.com') || semail.includes('@outlook.com'))
  {
    document.getElementById('error').innerHTML="Invalid Email";
  }
  else if(file==undefined){
    document.getElementById('error').innerHTML="Select image";
  }

else{

  var short;
 

  if(stdepart.includes('Software-Engineering')){
    short="SE"
  }else if(stdepart.includes('Computer-Engineering')){
    short="CE"
   }else if(stdepart.includes('Computer-Science')){
    short="CS"
  }

  chek=`${batch}-${short}-${sroll}`;


  firebase.database().ref('Users').orderByChild("scompRoll").equalTo(chek).once("value",snapshot => {
    if (snapshot.exists()){
      document.getElementById('error').innerHTML='Account Already Exist with '+chek+' following Details'
    }
    else{
      
   firebase.auth().createUserWithEmailAndPassword(semail, spass).then(function(success){

    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('stdbtn').disabled=true;

// varible to create refrence of firebase storage
var storageref = firebase.storage().ref("storage");
// function for uploading file in firebase database
var uploadtask= storageref.child(''+(new Date()).getTime()+file.name).put(file).then((snapshot)=>{
 // returns the download url to download image from storage
return snapshot.ref.getDownloadURL();
}).then(downloadURL => {
// pushing data  and image url object into firebase database
   var database = firebase.database().ref();

   var skey =firebase.database().ref('Users/').push();

   var sr = batch+'-'+stdepart+'-'+sroll;
  
  var studentobj = {
  id : skey.key,
  name : suname ,
  Email : semail,
  studentAddress : saddress,
  studentPassword : spass,
  studentNumber : sphone,
  studentRoll : sroll,
  scompRoll : chek ,
  studentSection : ssection.toUpperCase(),
  studentSemester : ssem ,
  studentBatch : batch ,
  studentDepart : stdepart,
  accountType : "student",
  imgURL : downloadURL ,
  userno :  userno

}

skey.set(studentobj);



       var myasynktask = new Promise(function(sucess , failure){
         setTimeout(function()  {
          // for updation user no info
          get();
        
         document.getElementById('loaddiv').hidden="true";
         document.getElementById('error').style.color="rgb(7,215,155)"
         document.getElementById('error').innerHTML="Student added Sucessfully";
         document.getElementById('error').style.color="red"
         document.getElementById('stdbtn').disabled=false;

         // used for show empty input field  of 'additem' form after sucessfully uploading  a file
         document.getElementById('sname').value='';
         document.getElementById('semail').value='';
         document.getElementById('semester').value='';
         document.getElementById('saddress').value='';
         document.getElementById('spass').value='';
         document.getElementById('srepass').value='';
         document.getElementById('sphone').value='';
         document.getElementById('sroll').value='';
         document.getElementById('ssection').value='';
         document.getElementById('deptname').value='';
         document.getElementById('sbatch').value='';
         file = document.getElementById("itemfile").value=''; 
       }, 3000)});

   })

// catch of file uploading 
.catch((error)=>{
console.log('error' , error)
document.getElementById('loaddiv').hidden=true;
document.getElementById('stdbtn').disabled=false;
document.getElementById('error').innerHTML=''+error;
})

// catch of user Auth promise
}).catch((error)=>{
  console.log('error' , error)
  document.getElementById('loaddiv').hidden=true;
  document.getElementById('stdbtn').disabled=false;
  document.getElementById('error').innerHTML=''+error;
  })

}
}); 

}
}



function addPrincipal() {
  document.getElementById('error2').style.color="red"
  document.getElementById('error2').innerHTML = '';

  var tename = document.getElementById('pname').value;
  var teemail = document.getElementById('pemail').value;
  var teaddress = document.getElementById('paddress').value;
  var tepass = document.getElementById('ppass').value;
  var tecpass = document.getElementById('pconfirmpass').value;
  var tetpno = document.getElementById('ppno').value;
  var  file = document.getElementById("itemfile2").files[0]; 

  if(!tepass===tecpass)
  {
    document.getElementById('error2').innerHTML="Confirm Password Not Match";
  }

   else if(!teemail.includes('@principal.com'))
   {
    document.getElementById('error2').innerHTML="Domain Must Contain '@principal.com' "
   }

   else if(!tetpno.length==11)
   {
    document.getElementById('error2').innerHTML="Invalid Phone Number (Must contain 11 characters)";
   }
   else if(file==undefined)
   {
    document.getElementById('error2').innerHTML="Select Image";
   }

   else if(teemail.includes('@gmail.com') || teemail.includes('@yahoo.com') || teemail.includes('@hotmail.com') || teemail.includes('@outlook.com'))
  {
    document.getElementById('error2').innerHTML="Invalid Email";
  }


else{

  document.getElementById('loaddiv2').removeAttribute('hidden');
  document.getElementById('stdbtn2').disabled=true;

  firebase.auth().createUserWithEmailAndPassword(teemail, tepass).then(function(success){

// varible to create refrence of firebase storage
var storageref = firebase.storage().ref("storage");
// function for uploading file in firebase database
var uploadtask= storageref.child(''+(new Date()).getTime()+file.name).put(file).then((snapshot)=>{
 // returns the download url to download image from storage
return snapshot.ref.getDownloadURL();
}).then(downloadURL => {
// pushing data  and image url object into firebase database
   var database = firebase.database().ref();

   var skey =firebase.database().ref('Users/').push();

      var principalObj = {
        id : skey.key,
        userno : userno,
        name : tename ,
        Email : teemail,
        principalAddress : teaddress,
        principalPassword : tepass,
        principalPhoneNo : tetpno,
        accountType : "principal" ,
        imgURL : downloadURL
      }

      skey.set(principalObj);  

        var myasynktask = new Promise(function(sucess , failure){
        setTimeout(function()  {
        
        // for updation user no info
          get();

         document.getElementById('loaddiv2').hidden="true";
         document.getElementById('error2').style.color="rgb(7,215,155)"
         document.getElementById('error2').innerHTML="Co-Principal added Sucessfully";
        
         document.getElementById('stdbtn2').disabled=false;

         // used for show empty input field  of 'additem' form after sucessfully uploading  a file
          document.getElementById('pname').value='';
          document.getElementById('pemail').value='';
          document.getElementById('paddress').value='';
          document.getElementById('ppass').value='';
          document.getElementById('pconfirmpass').value='';
          document.getElementById('ppno').value='';
          document.getElementById("itemfile2").value=''; 
       }, 3000)});

   })
// catch of file upload promise
.catch((error)=>{
console.log('error' , error)
document.getElementById('loaddiv2').hidden=true;
document.getElementById('stdbtn2').disabled=false;
document.getElementById('error2').innerHTML=''+error;
})

// catch of user Auth promise
}).catch((error)=>{
  console.log('error' , error)
  document.getElementById('loaddiv2').hidden=true;
  document.getElementById('stdbtn2').disabled=false;
  document.getElementById('error2').innerHTML=''+error;
  })

}
}


function sendNote(){

var n = document.getElementById('note').value;
var o = document.getElementById('tsdeptname').value;
var p = document.getElementById('tsdetail').value;


document.getElementById('nerror').innerHTML="";

if(n.length==0){
  document.getElementById('nerror').style.color="red"
  document.getElementById('nerror').innerHTML="Please fill out the fields";
}else{
  document.getElementById('nerror').innerHTML="";
  document.getElementById('nloaddiv').removeAttribute('hidden');

  var database = firebase.database().ref();

  var skey =firebase.database().ref('Notification').push();

     var not = {
       email : localStorage.getItem('myemail') , 
       note : n ,
       department : o ,
       to : p 
     }

     skey.set(not);
     document.getElementById('nerror').style.color="rgb(7,215,155)"
     document.getElementById('nerror').innerHTML="Notification Submitted Successfully";
     document.getElementById('nloaddiv').hidden=true;
     document.getElementById('note').innerHTML="";
          

}

}