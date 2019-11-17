
var tname , tno , teachname , tdate , tsec , tmarks , tdept , tbatch , tsem , checker=0;

function testInfo(){

 tname = document.getElementById('testname').value;
 tno = document.getElementById('testno').value;
 teachname = document.getElementById('tteachername').value;
 tdate = document.getElementById('testdate').value;
 tsec = document.getElementById('testsec').value;
 tmarks = document.getElementById('totalno').value;
 tdept = document.getElementById('testdept').value;
 tbatch = document.getElementById('testbatch').value;
 tsem = document.getElementById('testsem').value;
 console.log(tname , tsem);

 if(tname=='' || tno == '' || teachname == '' || tdate == '' || tsec == '' || tmarks == '' || tdept == '' || tbatch==''){
   showToast("Please Must Fill Out All Fields")
  }

  else if((tsem==1 && tname=='Intro To C')           || (tsem==1 && tname=='Calculus'))         {showdata();}
  else if((tsem==2 && tname=='Islamiat')             || (tsem==2 && tname=='Java'))             {showdata();}
  else if((tsem==3 && tname=='Basic Electronic')     || (tsem==3 && tname=='Applied Physics'))   {showdata();}
  else if((tsem==4 && tname=='Formal Method' )       || (tsem==4 && tname=='SDA'))               {showdata();}
  else if(tsem==5 && (tname=='Enterprise System'     || tname=='Intro to Database'))            {showdata();}
  else if(tsem==6 && (tname=='Data Structure'        || tname=='Intro to SE'))                  {showdata();}
  else if(tsem==7 && (tname=='Discreete Math'        || tname=='Operating system'))             {showdata();}
  else if(tsem==8 && (tname=='Software Quality Engg' || tname=='Advance Java'))                 {showdata();}
  else{
    showToast('This Course does not Exist in this Semester');
      }
}
function showdata(){

    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('offline').innerHTML='';
   
    var checker=0;
    
        firebase.database().ref("Users").orderByChild("student")
       .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
    
                 checker=1;
    
                 var sec = childSnapshot.val().studentSection;
                 var dept = childSnapshot.val().studentDepart;
                 var batch = childSnapshot.val().studentBatch;
                 var sem = childSnapshot.val().studentSemester;

                if(sec==tsec.toUpperCase() && dept==tdept && batch==tbatch && sem==tsem){

                    document.getElementById('loaddiv').hidden="true";
                    document.getElementById('offline').innerHTML='';
                    document.getElementById('testform').hidden="true";

                 var ndiv = document.createElement('div');
                 ndiv.setAttribute('style',' margin:auto; width:250px; height:250px; padding:20px; overflow:hidden;  border:solid 2px rgb(15 , 215 , 155); display:inline-block; margin:20px; border-radius:15px');
  

                 var np=document.createElement('P');
                 np.innerHTML+='<h6>Name : '+childSnapshot.val().name +'</h6>  <b>Roll No : '+childSnapshot.val().studentRoll +'</b>';
                 np.setAttribute('style','color:black; display:block;  padding:10px; ' );

                 var ni=document.createElement('input');  
                 ni.setAttribute('type' , 'number');  
                 ni.setAttribute('style','color:black; display:block;  margin:5px;   padding:10px; ' );
                 ni.setAttribute('placeholder' , 'Enter Marks');
                 ni.setAttribute('id' , 'getmarks')

                 var p=document.createElement('P');
                 p.setAttribute('id','a');
                 p.setAttribute('style','color:black; display:block;  padding:10px;' );

                 var btn = document.createElement('button');
                 btn.setAttribute('id','b');
                 btn.setAttribute('class' , 'form-control btn btn-success');
                 btn.setAttribute('style','margin:auto; border:solid thin; margin:5px;  padding:7px; background-color:rgb(15 , 215 , 155)');
                 btn.innerHTML="Submit";
                 btn.onclick = function(){

                    var gmarks = document.getElementById('getmarks').value;
                    if(gmarks=='')
                    {showToast("Enter Obtained Marks")}
                    else if(parseFloat(tmarks)<parseFloat(gmarks)){
                        showToast("Marks must be less than or equal to "+tmarks);
                    }else{
                                var database = firebase.database().ref();
                                var skey =firebase.database().ref('Marks/').push();

                                var MarksObj = {
                                key : skey.key,
                                courseName : tname,
                                testNo : tno ,
                                teacherName : teachname,
                                totalMarks : tmarks,
                                marks: gmarks,
                                testDate : tdate ,
                              //  teacherid:localStorage.getItem('myid'),
                                studentId : childSnapshot.val().id ,
                                studentName : childSnapshot.val().name ,
                                studentRoll : childSnapshot.val().studentRoll ,
                                studentDepart : childSnapshot.val().studentDepart ,
                                studentBatch : childSnapshot.val().studentBatch ,
                                studentSection : childSnapshot.val().studentSection
                            }
                              skey.set(MarksObj);
                              showToast('Marks Added Sucessfully')

                        }                            
                
                   }
    
                 ndiv.appendChild(np);
                 ndiv.appendChild(ni);
                 ndiv.appendChild(p);
                 ndiv.appendChild(btn);
                
                document.getElementById("showfetch").appendChild(ndiv);
                }

              });
          });
    
        

             var myasynktask = new Promise(function(sucess , failure){
                setTimeout(function()  {
                    if(checker==0){
                        document.getElementById('loaddiv').hidden="true";
                        document.getElementById('offline').innerHTML='<b> No Student found with this Description OR Check Your Connection </b>';
                    }
                 }, 10000)});
    
                }

            

             