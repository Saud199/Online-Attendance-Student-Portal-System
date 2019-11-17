function showdata(){

     var c = document.getElementById('coursename').value;

    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('offline').innerHTML='';
   
    var checker=0;
    
        firebase.database().ref("Attendance").orderByChild("studentId").equalTo(localStorage.getItem('myid'))
         .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
    
                 var name = childSnapshot.val().course;
                 var date = childSnapshot.val().date;
                 var sec = childSnapshot.val().studentSec;
                 var dept = childSnapshot.val().studentDepart;
                 var batch = childSnapshot.val().studentBatch;
                 var temail = childSnapshot.val().teacherEmail;
                 var tname = childSnapshot.val().teacherName;

                   
                    checker=1;

                    document.getElementById('loaddiv').hidden="true";
                    document.getElementById('offline').innerHTML='';

                    if(name.trim()==c.trim()){
                 

                    var ndiv = document.createElement('div');
                    ndiv.setAttribute('style',' margin:auto; width:250px; height:300px; padding:10px; overflow:hidden;  border:solid 2px rgb(15 , 215 , 155); display:inline-block; margin:20px; border-radius:15px');
     
   
                   var np=document.createElement('P');
                   np.innerHTML+='<h6>Student Name : '+childSnapshot.val().studentName +'</h6><b>Student Roll : '+childSnapshot.val().studentRoll +
                   '</b><br> Status : Present <hr/>  <br/> Course Name :'+name +'<br/> Date : '+ date +  '<br/> Teacher Name : '+tname  
                   +'<br/> Email : ' + temail ;
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
            

             