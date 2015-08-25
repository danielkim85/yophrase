// This is called with the results from from FB.getLoginStatus().
var ACCESS_TOKEN = null;
function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    ACCESS_TOKEN =   FB.getAuthResponse()['accessToken'];
    init(true);
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
      init(false)
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '466475260194174',
  cookie     : true,  // enable cookies to allow the server to access 
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.3' // use version 2.1
});

// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function init(start) {

  //initiate
  if(start){
    console.log('Welcome!  Fetching your information.... ');
    console.log(ACCESS_TOKEN);
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
    'Welcome, ' + response.name + '!';
  });
    $("#access_token").val(ACCESS_TOKEN);
    $("#upload").show();
  }
  else{
      $("#upload").hide();
  }
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function(){
  if($("#file").val() == "")
    $("#upload_button").hide();
  else
    $("#upload_button").show();

  $("#file").change(function(){
    if($(this).val() == ""){
      $("#upload_button").hide();
    }
    else
      $("#upload_button").show();
  });

  $("#upload_button").click(function(){
    $('#upload').block({ message: null }); 
    var formData = new FormData();
    formData.append('file', $('#file')[0].files[0]);
    formData.append("access_token",$("#access_token").val());
      $.ajax({
       url : './python/save_file.py',
       type : 'POST',
       data : formData,
       processData: false,  // tell jQuery not to process the data
       contentType: false,  // tell jQuery not to set contentType
       dataType: "json",
       success : function(json) {
         alert(json.msg);
         if(json.code == 1){
            $("#file").val("");
         }
          $('#upload').unblock();
       }
    });
  });
});
