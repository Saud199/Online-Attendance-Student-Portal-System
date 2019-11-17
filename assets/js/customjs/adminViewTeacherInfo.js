function showdata(){
   
    var checker=0;
    
        firebase.database().ref("Users").orderByChild("accountType").equalTo("teacher")
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
                 np.innerHTML+='<h6>Name : '+childSnapshot.val().name +'</h6><b>Email : '+childSnapshot.val().Email +'</b><br>'
                 +'<b>Addres : '+childSnapshot.val().teacherAddress +'</b><br>'+'<b>Phone No : '+childSnapshot.val().teacherPhoneNo+'</b><br>'
                 +'<b>Department : '+childSnapshot.val().teacherDepartment ;
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



             