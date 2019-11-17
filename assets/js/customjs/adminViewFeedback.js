function showdata(){
   
    var checker=0;
    
        firebase.database().ref("Feedbacks")
        .on("value", function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
                  // getting value in variable from local storage
                 var mid= localStorage.getItem('myid');
    
                 checker=1;
    
                 document.getElementById('loaddiv').hidden="true";
                 document.getElementById('offline').innerHTML='';
     
                  var ndiv = document.createElement('div');
                  ndiv.setAttribute('style',' margin:auto;  width:250px; overflow:scroll; height:200px; padding:20px;   border:solid 5px rgb(15 , 215 , 155); display:inline-block; margin:20px; border-radius:15px');
  
                 var np=document.createElement('P');
                 np.innerHTML+='<h6>Name : '+childSnapshot.val().name +'</h6> <hr> <p>Feedback : <textarea> '+childSnapshot.val().feedback +'</textarea> </p>';
                 np.setAttribute('style','color:black; display:block;  padding:10px; ' );
        
                 ndiv.appendChild(np);
                
                 document.getElementById("showfetch").appendChild(ndiv);  
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



             