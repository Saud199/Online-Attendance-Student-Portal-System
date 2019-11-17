function showdata(){
   
    var checker=0;
    
        firebase.database().ref("Notification")
       .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
                
                var a = localStorage.getItem('tdepart');
                var b = childSnapshot.val().department;
                var c = childSnapshot.val().to; 
                alert(b+c); 
                  if(a.trim()==b.trim() && c=='Teacher'){

                 checker=1;
    
                 document.getElementById('loaddiv').hidden="true";
                 document.getElementById('offline').innerHTML='';
     
                  var ndiv = document.createElement('div');
                  ndiv.setAttribute('style',' margin:auto; width:250px; height:230px; padding:20px; overflow:hidden;  border:solid 2px rgb(15 , 215 , 155); display:inline-block; margin:20px; border-radius:15px');
  
                 var np=document.createElement('P');
                 np.innerHTML+='<h6>Email : '+childSnapshot.val().email +'</h6> <hr> <p>Notification : <textarea> '+childSnapshot.val().note +'</textarea> </p>';
                 np.setAttribute('style','color:black; display:block;  padding:10px; ' );
        
                ndiv.appendChild(np);
                
                document.getElementById("showfetch").appendChild(ndiv);
                }
             });
          });
    
             var myasynktask = new Promise(function(sucess , failure){
                setTimeout(function()  {
                    if(checker==0){
                        document.getElementById('loaddiv').hidden="true";
                        document.getElementById('offline').innerHTML='<b> No Notification Found OR You May Be Offline </b>';
                    }
                 }, 10000)});
    
    
    
             }



             