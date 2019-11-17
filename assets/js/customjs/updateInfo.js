

function showdata(){
     document.getElementById('changesem').value=localStorage.getItem('usemester'); 
     document.getElementById('changeno').value=localStorage.getItem('uphone'); 
     document.getElementById('changeaddress').value=localStorage.getItem('uaddress');
     document.getElementById('changename').value=localStorage.getItem('uname');
     document.getElementById('changesec').value=localStorage.getItem('usec');

    document.getElementById("showfetch").innerHTML="";
    
    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('offline').innerHTML='';
    
    firebase.database().ref("Users/"+localStorage.getItem('uid'))
       .on("value", function(childSnapshot) {
        
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
                
                
    
                var bdiv=document.createElement('div');
                bdiv.setAttribute('style','margin-right:auto; padding:3px;');
    
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
            
    
             var myasynktask = new Promise(function(sucess , failure){
                setTimeout(function()  {
                    if(checker==0){
                        document.getElementById('loaddiv').hidden="true";
                        document.getElementById('offline').innerHTML='<b> No Data Found OR You May Be Offline </b>';
                    }
                 }, 10000)});
             }

            

             // updated Name  
             function updateName(){

                var name = document.getElementById('changename').value;
                
                if(name.length==0){
                    showToast('Enter name');
                }
                else{
                
                    firebase.database().ref("Users/"+localStorage.getItem('uid')).update({name:name});
                    showToast('Name Updated Succesfully');
                    localStorage.setItem('uname',name);
                    location.reload();
                }    
            }
                
            // updated Address
                function updateAddress(){
                
                var address = document.getElementById('changeaddress').value;
                if(address.length==0){
                    showToast('Enter Address');
                }
                else{
                
                    firebase.database().ref("Users/"+localStorage.getItem('uid')).update({studentAddress:address});
                    showToast('Address Updated Succesfully');
                    localStorage.setItem('uaddress',address);
                    location.reload();
                } 
            }

            // update Section
            function updateSec(){

                var s = document.getElementById('changesec').value;
                
                if(s.length==0){
                    showToast('Enter Section');
                }
                else{
                
                    firebase.database().ref("Users/"+localStorage.getItem('uid')).update({studentSection:s});
                    showToast('Section Updated Succesfully');
                    localStorage.setItem('usec',s);
                    location.reload();
                }
                
            }
            
                // updated Phone
                function updatePhone(){
                var no = document.getElementById('changeno').value;
                if(no.length!=11){
                    showToast('Phone must contain 11 digits');
                }
                else{
                
                    firebase.database().ref("Users/"+localStorage.getItem('uid')).update({studentNumber:no});
                    showToast('Phone Number Updated Succesfully');
                    localStorage.setItem('uphone',no);
                    location.reload();
                }
                }

                // update semester
                function updateSemester(){
                    var no = document.getElementById('changesem').value;
                    var n = localStorage.getItem('usemester');
                    var a =  parseInt(n);
                        a = a+1;
                    var b = parseInt(no);  

                    if(no.length==0){
                        showToast('Please Fill out the Fields');
                    }
                    else if(a!=b)
                    {
                        showToast("New Semester Must Be "+a);
                        //console.log("New Semester Must Be "+a)
                    
                    }
                    else{
                    
                        firebase.database().ref("Users/"+localStorage.getItem('uid')).update({studentSemester:no});
                        showToast('Phone Number Updated Succesfully');
                        localStorage.setItem('usemester',no);
                        location.reload();
                    }
                    }
                
