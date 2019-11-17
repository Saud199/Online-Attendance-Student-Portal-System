//when image is selected for student account . this function checking it length
document.getElementById('file').onchange = function() {
    if(this.files[0].size > 507200){
      document.getElementById('error').innerHTML ="File Size must less than 500 KB";
       this.value = "";
    };
  };

function addFile(){
    document.getElementById('error').style.color="red"
    document.getElementById('error').innerHTML = '';
  
    var name = document.getElementById('filename').value;
    var desc = document.getElementById('filedesc').value;
    var sec = document.getElementById('filesec').value;
    var  file = document.getElementById("file").files[0];
    var batch = document.getElementById('filebatch').value;
    var dept = document.getElementById('filedept').value; 
    var sem = document.getElementById('filesem').value;
    var cname = document.getElementById('coursename').value
  
   
     
     if(name.length<4  || desc.length<4 )
     {
      document.getElementById('error').innerHTML="Name and Description Contains atleast 4 characters ";
     }
     else if(sec.length==0){
        document.getElementById('error').innerHTML="Enter Section";
     }
  
     else if(file.length==0)
    {
      document.getElementById('error').innerHTML="Select file";
    }
    else if(sem.length==0)
    {
      document.getElementById('error').innerHTML="Select file";
    }
  
    else if(dept.length==0)
    {
      document.getElementById('error').innerHTML="Enter Department";
    }
  
    else if(batch.length==0)
    {
      document.getElementById('error').innerHTML="Select Batch";
    }
  
  else{
  
    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('stdbtn').disabled=true;

  // varible to create refrence of firebase storage
  var storageref = firebase.storage().ref("storage");
  // function for uploading file in firebase database
  var uploadtask= storageref.child(''+(new Date()).getTime()+file.name).put(file).then((snapshot)=>{
   // returns the download url to download image from storage
  return snapshot.ref.getDownloadURL();
  }).then(downloadURL => {
  // pushing data and image url object into firebase database
     var database = firebase.database().ref();
  
     var skey =firebase.database().ref('Files/').push();
    
    var fileobj = {

    key : skey.key,
    fileURL : downloadURL,
    fileName : name ,
    fileDescription : desc ,
    fileSection : sec.toUpperCase() ,
    fileBatch : batch ,
    fileDepart : dept ,
    fileSemester : sem ,
    courseName : cname ,
    teacherKey : localStorage.getItem("myid"),
    fileDate : ''+new Date().getDate()+'-'+new Date().getMonth()+'-'+ new Date().getFullYear()
  

}
  
  skey.set(fileobj);
  
  
  
         var myasynktask = new Promise(function(sucess , failure){
           setTimeout(function()  {
            // for updation user no info
          
           document.getElementById('loaddiv').hidden="true";
           document.getElementById('error').style.color="rgb(7,215,155)"
           document.getElementById('error').innerHTML="File Added Sucessfully";
           document.getElementById('stdbtn').disabled=false;
  
           // used for show empty input field  of 'additem' form after sucessfully uploading  a file
           document.getElementById('filename').value;
           document.getElementById('filedesc').value;
           document.getElementById('filesec').value;
           document.getElementById("file").files[0]; 
           document.getElementById("filesem").files[0]; 
         }, 3000)});
  
     })
  
  // catch of file uploading 
  .catch((error)=>{
  console.log('error' , error)
  document.getElementById('loaddiv').hidden=true;
  document.getElementById('stdbtn').disabled=false;
  document.getElementById('error').innerHTML=''+error;
    })
   }
  }

  
// Generating QR code

var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 230,
    height : 235
});

function makeCode () {		
  document.getElementById('qerror').innerHTML="";
  document.getElementById('qerror').style.color="red"

  var a = document.getElementById('qtname').value;
  var b = document.getElementById('qsname').value;
  var c = localStorage.getItem('myemail');
  var d = document.getElementById('qdate').value;
    
    if (a.length==0 || b.length==0 || c.length==0 || d.length==0) {
      document.getElementById('qerror').innerHTML="Please Fill out all fields";
        return;
    }
    else if(d.length!=10){
      document.getElementById('qerror').innerHTML="Enter Correct date format (dd-mm-yyyy)"
    }
    else{
    var fval = a +'%' + b +'$'+ c +'*'+ d;  
    qrcode.makeCode(fval);
  }
}

$("#text").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            makeCode();
        }
    });
