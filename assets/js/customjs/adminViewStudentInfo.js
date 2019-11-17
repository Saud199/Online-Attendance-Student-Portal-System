var  checker=0 , tno , cname , tsec , tbatch , tdept;

function testInfo(){



 tsec = document.getElementById('testsec').value;
 tdept = document.getElementById('testdept').value;
 tbatch = document.getElementById('testbatch').value;
 

 if( tsec=='' || tdept=='' || tbatch==''){
   showToast("Please Must Fill Out All Fields")
  }
  else{

    if(tdept.includes('Software')){
        tdept="Software-Engineering"
    }else if(tdept.includes('Computer Eng')){
        tdept="Computer-Engineering"
    }else if(tdept.includes('Science')){
        tdept="Computer-Science"
    }
    document.getElementById('cform').hidden=true;
   showdata();
   }
}


function showdata(){

    document.getElementById("showfetch").innerHTML="";
    
    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('offline').innerHTML='';
    
        firebase.database().ref("Users").orderByChild("accountType").equalTo("student")
       .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
                 var mid= localStorage.getItem('myid');
    
                 checker=1;
    
                 var a = childSnapshot.val().studentDepart;
                 var b = childSnapshot.val().studentSection;
                 var c = childSnapshot.val().studentBatch;

                 if(c.trim()==tbatch.trim() && b.trim()==tsec.trim() && a.trim()==tdept.trim() ){

                    document.getElementById('loaddiv').hidden="true";
                    document.getElementById('offline').innerHTML='';

                  // crating dom element with onclick function because we  want to open chat messenger 
                  //if any person want open it except uploading person   
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
                 btn.innerHTML="Update Details";
                 btn.onclick = function(){

                    if(mid!=childSnapshot.val().id){

                        localStorage.setItem('uname',childSnapshot.val().name);
                        localStorage.setItem('uaddress',childSnapshot.val().studentAddress);
                        localStorage.setItem('uphone',childSnapshot.val().studentNumber);
                        localStorage.setItem('usemester',childSnapshot.val().studentSemester);
                        localStorage.setItem('usec',childSnapshot.val().studentSection);
                        localStorage.setItem('uid',childSnapshot.val().id);

                        window.location.href="updateInfo.html";
                 
               
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
                        document.getElementById('offline').innerHTML='<b> No Data Found OR You May Be Offline </b>';
                    }
                 }, 10000)});
             }

            

             

function crollinfo(){

 var roll = document.getElementById('croll').value;

 if(roll.length<9){
     showToast('Use Proper Format (2016-SE-1)')
 }
else{
     document.getElementById('testform').hidden=true;
    showInfo(roll);
}

}


function showInfo(r){

    document.getElementById("showfetch").innerHTML="";
    
    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('offline').innerHTML='';
    
        firebase.database().ref("Users").orderByChild("scompRoll").equalTo(r.toUpperCase())
       .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
                 var mid= localStorage.getItem('myid');
    
                 checker=1;

                    document.getElementById('loaddiv').hidden="true";
                    document.getElementById('offline').innerHTML='';

                  // crating dom element with onclick function because we  want to open chat messenger 
                  //if any person want open it except uploading person   
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
                 btn.innerHTML="Update Details";
                 btn.onclick = function(){

                    if(mid!=childSnapshot.val().id){

                        localStorage.setItem('uname',childSnapshot.val().name);
                        localStorage.setItem('uaddress',childSnapshot.val().studentAddress);
                        localStorage.setItem('uphone',childSnapshot.val().studentNumber);
                        localStorage.setItem('usemester',childSnapshot.val().studentSemester);
                        localStorage.setItem('usec',childSnapshot.val().studentSection);
                        localStorage.setItem('uid',childSnapshot.val().id);

                        window.location.href="updateInfo.html";
                 
               
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

            

             