function indexfeedback(){
        
    var fname = document.getElementById('firstName').value;
    var lname = document.getElementById('lastName').value;
    var fback = document.getElementById('feed').value;

    
    if(fname.length==0 || lname==0 || fback.length==0)
    {
      showToast("Please !  fill out all fields");
    }
    else{
    var skey =firebase.database().ref('Feedbacks/').push();
    var guestfeed = {
      name : fname+lname,
      feedback : fback 
     }

  skey.set(guestfeed);

  document.getElementById('firstName').value='';
  document.getElementById('lastName').value='';
  document.getElementById('feed').value='';
  showToast("Thanks for your feedback");



  }}