
var  tsec , tdept , tbatch , tsem , checker=0;

function testInfo(){

 tsec = document.getElementById('testsec').value;
 tdept = document.getElementById('testdept').value;
 tbatch = document.getElementById('testbatch').value;
 tsem = document.getElementById('testsem').value;
 

 if( tsec == ''  || tdept == '' || tbatch=='' || tsem==''){
   showToast("Please Must Fill Out All Fields")
  }

  else{
   showdata();
      }
}

function showdata(){

    var mid = localStorage.getItem('myid');

    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('offline').innerHTML='';
   
    var checker=0;
    
        firebase.database().ref("Users").orderByChild("student")
       .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
    
                 var sec = childSnapshot.val().studentSection;
                 var dept = childSnapshot.val().studentDepart;
                 var batch = childSnapshot.val().studentBatch;
                 var sem = childSnapshot.val().studentSemester;

                if(sec==tsec.toUpperCase() && dept==tdept && batch==tbatch && sem==tsem){


                    checker=1;

                    document.getElementById('loaddiv').hidden="true";
                    document.getElementById('offline').innerHTML='';
                    document.getElementById('testform').hidden="true";

                    var ndiv = document.createElement('div');
                    ndiv.setAttribute('style','padding:5px;  display:inline-block;');
                   //ndiv.setAttribute("onClick", chating());
                   
    
                   var np=document.createElement('P');
                   np.innerHTML+='<h6>Student Name : '+childSnapshot.val().name +'</h6><b>Email : '+childSnapshot.val().Email +'</b><br>'
                   +'<b>Addres : '+childSnapshot.val().studentAddress +'</b><br>'+'<b>Phone No : '+childSnapshot.val().studentNumber+'</b><br>'
                   +'<b>Department : '+childSnapshot.val().studentDepart +'<br><b>Roll No : '+childSnapshot.val().studentRoll+'</b>';
                   np.setAttribute('style','display:block;  padding-Top:20px;' );
           
            
                    var ip = document.createElement('p');
                    ip.setAttribute('style','display:block; text-align:center' );
      
                   var nimg=document.createElement('IMG');
                   nimg.setAttribute('class','myimg');
                   nimg.setAttribute('height','200px');
                   nimg.setAttribute('width','200px');
                   nimg.setAttribute('style','margin-right:auto; border:solid thinrgb(15 , 215 , 155); padding:7px;  border-radius:10px;');
                   nimg.setAttribute('src',''+ childSnapshot.val().imgURL);
                  
                   var btn = document.createElement('button');
                   btn.setAttribute('class' , 'form-control btn btn-success');
                   btn.setAttribute('style','margin:auto; border:solid thin; padding:7px; background-color:rgb(15 , 215 , 155)');
                   btn.innerHTML="Chat";
                   btn.onclick = function(){
  
                   

                      if(mid!=childSnapshot.val().id){
  
                          localStorage.setItem('friendmail',childSnapshot.val().Email);
                          localStorage.setItem('friendid',childSnapshot.val().id);
                          localStorage.setItem('friendno',childSnapshot.val().userno);
                          localStorage.setItem('friendtoken',childSnapshot.val().token);
                          window.location.href="chat.html";
                   
                 
                    }
                  }
      
                  var bdiv=document.createElement('div');
                  bdiv.setAttribute('style','margin-right:auto; padding:3px;');
                  bdiv.appendChild(btn);
      
                  ip.appendChild(nimg);
                  ndiv.appendChild(ip);
                  var x = document.createElement("HR");
                  ndiv.appendChild(x);
                  ndiv.appendChild(np);
                  
                  var fdiv=document.createElement('div');
                  fdiv.setAttribute('style','padding:20px; border:solid 2px rgb(15 , 215 , 155); display:inline-block; margin:20px; border-radius:15px');
                  fdiv.appendChild(ndiv);
                  fdiv.appendChild(bdiv);
      
                  document.getElementById("showfetch").appendChild(fdiv);
                
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
            

             