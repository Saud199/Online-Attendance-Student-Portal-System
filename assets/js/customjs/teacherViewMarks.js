
var  checker=0 , tno , cname , tsec , tbatch , tdept;

function testInfo(){


 tno = document.getElementById('testno').value;
 cname = document.getElementById('coursename').value;
 tsec = document.getElementById('testsec').value;
 tdept = document.getElementById('testdept').value;
 tbatch = document.getElementById('testbatch').value;
 

 if( tno=='' || cname=='' || tsec=='' || tdept=='' || tbatch==''){
   showToast("Please Must Fill Out All Fields")
  }

  else{
   showdata();
      }
}

function showdata(){


    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('offline').innerHTML='';
   
    var checker=0;
    
        firebase.database().ref("Marks").orderByChild("student")
       .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
    
                 var name = childSnapshot.val().courseName;
                 var no = childSnapshot.val().testNo;
                 var sec = childSnapshot.val().studentSection;
                 var dept = childSnapshot.val().studentDepart;
                 var batch = childSnapshot.val().studentBatch;


                if( cname==name && tno==no && sec==tsec.toUpperCase() && dept==tdept &&  batch==tbatch ){


                    checker=1;

                    document.getElementById('loaddiv').hidden="true";
                    document.getElementById('offline').innerHTML='';
                    document.getElementById('testform').hidden="true";

                    var ndiv = document.createElement('div');
                    ndiv.setAttribute('style',' margin:auto; width:250px; height:320px; padding:20px; overflow:hidden;  border:solid 2px rgb(15 , 215 , 155); display:inline-block; margin:20px; border-radius:15px');
     
   
                   var np=document.createElement('P');
                   np.innerHTML+='<h6>Course Name : '+childSnapshot.val().courseName +'</h6><b>Student Name : '+childSnapshot.val().studentName +'</b><br>'
                   +'<b>Roll No : '+childSnapshot.val().studentRoll +'</b><br>'+'<b>Total Marks : '+childSnapshot.val().totalMarks+'</b><br>'
                   +'<b>Marks Obtained : '+childSnapshot.val().marks +'<br><b>Test No : '+childSnapshot.val().testNo+'</b>';
                   np.setAttribute('style','display:block;  padding-Top:20px');
           
            
                   
      
                
                  
                 var ni=document.createElement('input');   
                 ni.setAttribute('id' , 'getmarks');
                 ni.setAttribute('style','color:black; display:block;  margin:5px;   padding:10px; ' );
                 ni.setAttribute('placeholder' , 'Enter updated Marks');
                 ni.setAttribute('type' , 'number');

                
                 var btn = document.createElement('button');
                 btn.setAttribute('class' , 'form-control btn btn-success');
                 btn.setAttribute('style','margin:auto; border:solid thin; margin:5px;  padding:7px; background-color:rgb(15 , 215 , 155)');
                 btn.innerHTML="Update";

                 btn.onclick = function(){

                    //var gmarks = document.getElementById('getmarks').value;
                    var gmarks = ni.value;
                   
                    if(gmarks.length==0)
                      {
                        showToast("Enter Taking Marks")
                      }
                    else if(parseFloat(childSnapshot.val().totalMarks) < parseFloat(gmarks)){
                        showToast("Marks must be less than or equal to "+childSnapshot.val().totalMarks);
                    }else{
                        document.getElementById("showfetch").innerHTML='';
                        firebase.database().ref(`Marks/${childSnapshot.val().key}`).update({marks:gmarks});
                        showToast('Updated Marks Added Sucessfully')

                        }                            
                
                   }
    
                 ndiv.appendChild(np);
                 ndiv.appendChild(ni);
                 ndiv.appendChild(btn);
                
                document.getElementById("showfetch").appendChild(ndiv);
                }

              });
          });
    
        
               var myasynktask = new Promise(function(sucess , failure){
                setTimeout(function()  {
                    if(checker==0){
                        document.getElementById('loaddiv').hidden="true";
                        document.getElementById('offline').innerHTML='<b> No Marks found with this Description OR Check Your Connection </b>';
                    }
                 }, 10000)});
    

    
            }
            

             