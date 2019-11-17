
function showdata(){

    var checker = 0;
    document.getElementById("showfetch").innerHTML="";
    document.getElementById('loaddiv').removeAttribute('hidden');


   
   /* var checker=0  , sec , dept , batch , course , roll;

    firebase.database().ref("Users").orderByChild("Email").equalTo(localStorage.getItem('myemail'))
    .on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot1) {

                batch = childSnapshot1.val().studentBatch;
                sec = childSnapshot1.val().studentSection;
                dept = childSnapshot1.val().studentDepart;
                course = document.getElementById('coursename').value;
                roll = childSnapshot1.val().studentRoll;
*/
    
           firebase.database().ref("Marks") .orderByChild("studentId").equalTo(localStorage.getItem('myid')).on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage

                  course = document.getElementById('coursename').value;
            

              if(course==childSnapshot.val().courseName){
                        
                    
                checker=1;

                document.getElementById('loaddiv').hidden="true";
                document.getElementById('offline').innerHTML='';
               // document.getElementById('testform').hidden="true";

                var ndiv = document.createElement('div');
                ndiv.setAttribute('style',' margin:auto; width:250px; height:230px; padding:20px; overflow:hidden;  border:solid 2px rgb(15 , 215 , 155); display:inline-block; margin:20px; border-radius:15px');
 

               var np=document.createElement('P');
               np.innerHTML+='<h6>Course Name : '+childSnapshot.val().courseName +'</h6><b>Student Name : '+childSnapshot.val().studentName +'</b><br>'
               +'<b>Roll No : '+childSnapshot.val().studentRoll +'</b><br>'+'<b>Total Marks : '+childSnapshot.val().totalMarks+'</b><br>'
               +'<b>Marks Obtained : '+childSnapshot.val().marks +'<br><b>Test No : '+childSnapshot.val().testNo+'</b>';
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
                document.getElementById('offline').innerHTML='<b> No  Marks Found OR You May Be Offline </b>';
            }
         }, 10000)});
    

  }
