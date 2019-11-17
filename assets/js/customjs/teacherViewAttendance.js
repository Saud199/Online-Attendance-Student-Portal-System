
var  checker=0 , tno , cname , tsec , tbatch , tdept;

function testInfo(){

 document.getElementById("showfetch").innerHTML="";

 tdate = document.getElementById('date').value;
 cname = document.getElementById('coursename').value;
 tsec = document.getElementById('testsec').value;
 tdept = document.getElementById('testdept').value;
 tbatch = document.getElementById('testbatch').value;
 

 if( tno=='' || cname=='' || tsec=='' || tdept=='' || tbatch==''){
   showToast("Please Must Fill Out All Fields")
  }
  else if(tdate.length!=10){
   showToast("Write Correct Date")
  }

  else{
   showdata();
      }
}

function showdata(){
   
    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('offline').innerHTML='';
   
    var checker=0;
    
        firebase.database().ref("Attendance")
         .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
    
                 var name = childSnapshot.val().course;
                 var date = childSnapshot.val().date;
                 var sec = childSnapshot.val().studentSec;
                 var dept = childSnapshot.val().studentDepart;
                 var batch = childSnapshot.val().studentBatch;
                 var temail = childSnapshot.val().teacherEmail;
        
                     cname = cname.toUpperCase();
                     name = name.toUpperCase();  
                     
                     tsec = tsec.toUpperCase();

                     
                   if(
                      cname.trim()==name.trim() && date.trim()==tdate.trim() && sec.trim()==tsec.trim() 
                      && dept.trim()==tdept.trim() &&  batch.trim()==tbatch.trim()  && localStorage.getItem('myemail').trim()==temail.trim()
                     ){
                   
                    checker=1;

                    document.getElementById('loaddiv').hidden="true";
                    document.getElementById('offline').innerHTML='';
                    document.getElementById('testform1').hidden="true";

                    var ndiv = document.createElement('div');
                    ndiv.setAttribute('style',' margin:auto; width:250px; height:150px; padding:10px; overflow:hidden;  border:solid 2px rgb(15 , 215 , 155); display:inline-block; margin:20px; border-radius:15px');
     
   
                   var np=document.createElement('P');
                   np.innerHTML+='<h6>Student Name : '+childSnapshot.val().studentName +'</h6><b>Student Roll : '+childSnapshot.val().studentRoll +
                   '</b><br> Status : Present';
                   np.setAttribute('style','display:block;  padding-Top:20px');
           
            
                 ndiv.appendChild(np);

                document.getElementById("showfetch").appendChild(ndiv);
                   }

              });
          });
    
        
               var myasynktask = new Promise(function(sucess , failure){
                setTimeout(function()  {
                    if(checker==0){
                        document.getElementById('loaddiv').hidden="true";
                        document.getElementById('offline').innerHTML='<b> No Attendance found with this Description OR Check Your Connection </b>';
                    }
                 }, 10000)});

            }            


function rollchecker(){
    document.getElementById("showfetch").innerHTML="";
    var a = document.getElementById('roll').value;

    if(a.length<9){
        showToast('Please Enter Valid Roll number')
    }else{
        send(a);
    }

}



// another function
function send(rollno){
    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('offline').innerHTML='';
   
    var checker=0;
    
        firebase.database().ref("Attendance").orderByChild("completeRoll").equalTo(rollno.toUpperCase())
         .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
    
                 var name = childSnapshot.val().course;
                 var date = childSnapshot.val().date;
                 var sec = childSnapshot.val().studentSec;
                 var dept = childSnapshot.val().studentDepart;
                 var batch = childSnapshot.val().studentBatch;
                 var temail = childSnapshot.val().teacherEmail;
                  
                   
                    checker=1;

                    document.getElementById('loaddiv').hidden="true";
                    document.getElementById('offline').innerHTML='';
                    document.getElementById('testform').hidden="true";

                    var ndiv = document.createElement('div');
                    ndiv.setAttribute('style',' margin:auto; width:250px; height:150px; padding:10px; overflow:hidden;  border:solid 2px rgb(15 , 215 , 155); display:inline-block; margin:20px; border-radius:15px');
     
   
                   var np=document.createElement('P');
                   np.innerHTML+='<h6>Student Name : '+childSnapshot.val().studentName +'</h6><b>Student Roll : '+childSnapshot.val().studentRoll +
                   '</b><br> Status : Present';
                   np.setAttribute('style','display:block;  padding-Top:20px');
           
            
                 ndiv.appendChild(np);

                document.getElementById("showfetch").appendChild(ndiv);
                   

              });
          });
    
        
               var myasynktask = new Promise(function(sucess , failure){
                setTimeout(function()  {
                    if(checker==0){
                        document.getElementById('loaddiv').hidden="true";
                        document.getElementById('offline').innerHTML='<b> No Attendance found with this Description OR Check Your Connection </b>';
                    }
                 }, 10000)});
}