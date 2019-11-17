function showdata(){
   
    var checker=0;
    
        firebase.database().ref("Users").orderByChild("Email").equalTo(localStorage.getItem('myemail'))
       .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
                 var mid= localStorage.getItem('myid');
    
                 checker=1;
    
                 document.getElementById('loaddiv').hidden="true";
                 document.getElementById('offline').innerHTML='';
    


             //    document.getElementById('changename').value=childSnapshot.val().name;
                 document.getElementById('changeaddress').value=childSnapshot.val().teacherAddress;
                 document.getElementById('changeno').value=childSnapshot.val().teacherPhoneNo;

               
                  // crating dom element with onclick function because we  want to open chat messenger 
                  //if any person want open it except uploading person   
                  var ndiv = document.createElement('div');
                  ndiv.setAttribute('style','padding:5px;  display:inline-block;');
                 //ndiv.setAttribute("onClick", chating());
                 
  
                 var np=document.createElement('P');
                 np.innerHTML+='<h6>Name : '+childSnapshot.val().name +'</h6><b>Email : '+childSnapshot.val().Email +'</b><br>'
                 +'<b>Address : '+childSnapshot.val().teacherAddress +'</b><br>'+'<b>Phone No : '+childSnapshot.val().teacherPhoneNo+'</b><br>'
                 +'<b>Department : '+childSnapshot.val().teacherDepartment;
                   np.setAttribute('style','display:block;  padding-Top:20px;' );
         
          
                  var ip = document.createElement('p');
                  ip.setAttribute('style','display:block; text-align:center' );
    
                 var nimg=document.createElement('IMG');
                 nimg.setAttribute('class','myimg');
                 nimg.setAttribute('height','200px');
                 nimg.setAttribute('width','200px');
                 nimg.setAttribute('style','margin-right:auto; border:solid thinrgb(15 , 215 , 155); padding:7px;  border-radius:10px;');
                 nimg.setAttribute('src',''+ childSnapshot.val().imgURL);
               
    
                var bdiv=document.createElement('div');
                bdiv.setAttribute('style','margin-right:auto; padding:3px;');
               
    
                ip.appendChild(nimg);
                ndiv.appendChild(ip);
                var x = document.createElement("HR");
                ndiv.appendChild(x);
                ndiv.appendChild(np);
                
                var fdiv=document.createElement('div');
                fdiv.setAttribute('style','padding:20px; border:solid 2px rgb(15 , 215 , 155);  display:inline-block; margin:20px; border-radius:15px');
                fdiv.appendChild(ndiv);
                fdiv.appendChild(bdiv);
    
                document.getElementById("showfetch").appendChild(fdiv);

              //  document.getElementById('one').removeAttribute('hidden');
                document.getElementById('two').removeAttribute('hidden');
                document.getElementById('three').removeAttribute('hidden');
                document.getElementById('four').removeAttribute('hidden');


              
             });
             });
    
             var myasynktask = new Promise(function(sucess , failure){
                setTimeout(function()  {
                    if(checker==0){
                        document.getElementById('loaddiv').hidden="true";
                        document.getElementById('offline').innerHTML='<b> No Data Found OR You May Be Offline </b>';
                    }
                 }, 10000)});
             }


function updateName(){

var name = document.getElementById('changename').value;

if(name.length==0){
    showToast('Enter name');
}
else{

    firebase.database().ref("Users/"+localStorage.getItem('myid')).update({name:name});
    showToast('Name Updated Succesfully');
    location.reload();
}


}

function updateAddress(){

var address = document.getElementById('changeaddress').value;
if(address.length==0){
    showToast('Enter Address');
}
else{

    firebase.database().ref("Users/"+localStorage.getItem('myid')).update({teacherAddress:address});
    showToast('Address Updated Succesfully');
    location.reload();
}

}

function updatePhone(){
var no = document.getElementById('changeno').value;
if(no.length!=11){
    showToast('Phone must contain 11 digits');
}
else{

    firebase.database().ref("Users/"+localStorage.getItem('myid')).update({teacherPhoneNo:no});
    showToast('Phone Number Updated Succesfully');
    location.reload();
}
}

function updatePassword(){

var p1 = document.getElementById('changep1').value;
var p2 = document.getElementById('changep2').value; 
var p3 = document.getElementById('changep3').value;

if(p1.length<6 || p2.length<6 || p3.length<6){
    showToast('Password must contain atleast 6 character');
}
else if(p1==p2 || p1==p3){
    showToast('Old and New Password are Same ');
}
else if(p2!=p3){
    showToast('Password Doesnot Match');
}
else{

    firebase.auth().signInWithEmailAndPassword(localStorage.getItem('myemail'), p1)
        .then(function(user) {

            firebase.auth().currentUser.updatePassword(p2).then(function(){
                firebase.database().ref("Users/"+localStorage.getItem('myid')).update({teacherPassword:p2});
                showToast('Password Updated Successfully');
            }).catch(function(err){
                showToast(err);
             });
    
        }).catch(function(err){
            showToast(err);
        });

 }

}
             