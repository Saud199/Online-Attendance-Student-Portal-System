
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register('firebase-messaging-sw.js')
      .then(function() { console.log('Service Worker Registered'); });
}



var  myid , myno , loginemail , loginpassword , ftoken ,acctype ;

// function to take email and password as input in index.html and done verification of data in firebase database. 
function renderLogin() {
   
  document.getElementById('error').innerHTML = '';

      loginemail = document.getElementById('email').value.toLowerCase();
      loginpassword = document.getElementById('pass').value;
    
      // veification  of user input locally
      if (loginemail.length < 4) {
        document.getElementById('error').innerHTML = 'Please enter an email address';
     }
     else if (loginpassword.length < 4) {
      document.getElementById('error').innerHTML = 'Please enter a correct password.';
     }
     else{
     
     // method to display progress bar
     document.getElementById('loaddiv').removeAttribute('hidden');
     document.getElementById('loginbtn').disabled=true;

     // verification of user input on firebase database
     firebase.auth().signInWithEmailAndPassword(loginemail, loginpassword) 
     .then(function(userResponse) {
     
        // user define function
         getmyid();
     }) 
     // catch error if any error occur in firebase verification
     .catch(function(error) {
       document.getElementById('loginbtn').disabled=false;
       document.getElementById('loaddiv').hidden="true";
       var errorCode = error.code;
       var errorMessage = error.message;
       if (errorCode === 'auth/wrong-password') {
        document.getElementById('error').innerHTML= 'Wrong Password.';
       } else {
        document.getElementById('error').innerHTML=errorMessage;
       }
     });
     
   }
  }
  
  function getmyid(){
    
    // getting data from user node from firebase database and save it into local storage because if we reloading or change
    //html pg the data  present in vaiables will be lost
     firebase.database().ref("/Users").orderByChild("Email").equalTo(""+loginemail).on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                myid = childSnapshot.val().id;
                myno=childSnapshot.val().userno;
                loginemail=childSnapshot.val().Email;
                ftoken=childSnapshot.val().token;
                acctype=childSnapshot.val().accountType;

              
                if(acctype=='student'){
                  localStorage.setItem('sdept' , childSnapshot.val().studentDepart);
                  localStorage.setItem('ssec' , childSnapshot.val().studentSection);
                  localStorage.setItem('ssem' , childSnapshot.val().studentSemester);
                  localStorage.setItem('sname' , childSnapshot.val().name);
                  localStorage.setItem('saddress' , childSnapshot.val().studentAddress);
                  localStorage.setItem('sbatch', childSnapshot.val().studentBatch);
                  localStorage.setItem('sroll', childSnapshot.val().studentRoll);
                  localStorage.setItem('sdepart', childSnapshot.val().studentDepart);
                  }
                  
                  else if(acctype=='teacher'){
                    localStorage.setItem('tname' , childSnapshot.val().name);
                    localStorage.setItem('tdepart' , childSnapshot.val().teacherDepartment);
                    localStorage.setItem('taddress' , childSnapshot.val().teacherAddress);
                    localStorage.setItem('tphone' , childSnapshot.val().teacherPhoneNo); 
                  }
                  
                  else if(acctype=='principal'){
                    localStorage.setItem('pname' , childSnapshot.val().name);
                    localStorage.setItem('paddress' , childSnapshot.val().principalAddress);
                    localStorage.setItem('pphone' , childSnapshot.val().principalPhoneNo);
                  }
  
                  localStorage.setItem('myemail',loginemail);
                  localStorage.setItem('myid',myid);
                  localStorage.setItem('myno',myno);
                  localStorage.setItem('type',acctype);



              })
                // localStorage.setItem('token',dtoken);   
               
              if(localStorage.getItem('token')==undefined || localStorage.getItem('token')==null || localStorage.getItem('token')==""
                 || localStorage.getItem('token')=='null' || localStorage.getItem('token')=='undefined'){
                // run if current token (local storage token is null due to permission denied)
                localStorage.setItem('token',ftoken);  
                firebase.database().ref("/Users/"+myid).child("token").set(""+ftoken);
    
                 // set timeout of 6 sec delay for replace the pg with 'afterlogin.html' 
                 var myasynktask = new Promise(function(sucess , failure){
                 setTimeout(function()  {
                  document.getElementById('loaddiv').hidden="true";
                  document.getElementById('loginbtn').disabled=false;

                 if(acctype == 'principal'){
                    window.location.replace('adminAfterLogin.html');
                 } else if(acctype == 'student'){
                    window.location.replace('studentafterlogin.html');
                 }else if(acctype == 'teacher'){
                    window.location.replace('teacherAfterLogin.html');
                 }else{
                  document.getElementById('error').innerHTML = 'problem in Login! Reload page';
                 }

                 }, 6000)});
    
              }else{
                // run if current token (local storage token is not null) after given permisssion by user 
                firebase.database().ref("/Users/"+myid).child("token").set(""+localStorage.getItem('token'));
    
                 // set timeout of 6 sec delay for replace the pg with 'afterlogin.html' 
                var myasynktask = new Promise(function(sucess , failure){
                setTimeout(function()  {
                 document.getElementById('loaddiv').hidden="true";
                 document.getElementById('loginbtn').disabled=false;


               if(acctype == 'principal'){
                  window.location.replace('adminAfterLogin.html');
               } else if(acctype == 'student'){
                  window.location.replace('studentafterlogin.html');
               }else if(acctype == 'teacher'){
                  window.location.replace('teacherAfterLogin.html');
               }else{
                document.getElementById('error').innerHTML = 'problem in Login! Reload page';
               }
             
                 }, 6000)});
    
    
              }       
       

        });
      }



      function indexfeedback(){
        
        var guestcont;

        guestcont = document.getElementById('indexmsg').value;
        
        if(guestcont.length==0)
        {
          showToast("Please !  must Write Your Feedback Before Submittting");
        }

        else{
        var skey =firebase.database().ref('Feedbacks/').push();
        var guestfeed = {
          name : "Guest",
          feedback : guestcont
  }
    
      skey.set(guestfeed);


      document.getElementById('indexmsg').value="";
      showToast("Thanks for your feedback");

      }}


    function  check(){
      var acctype = localStorage.getItem('type');
      if(acctype == 'principal'){
        window.location.replace('adminAfterLogin.html');
     } else if(acctype == 'student'){
        window.location.replace('studentafterlogin.html');
     } else if(acctype == 'teacher'){
        window.location.replace('teacherAfterLogin.html');
     } else{
      window.location.replace('index.html');
     }
    }

    function  check1(){
      var acctype = localStorage.getItem('type');
      if(acctype == 'principal'){
        window.location.replace('adminAfterLogin.html');
     } else if(acctype == 'student'){
        window.location.replace('studentafterlogin.html');
     } else if(acctype == 'teacher'){
        window.location.replace('teacherAfterLogin.html');
     } else{
      window.location.replace('index.html');
     }
    }