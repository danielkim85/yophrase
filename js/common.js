//helper functions
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function LoadPreview(input){
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#preview').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function LoadMenu(go){
  $(".container:visible").hide();
  $(".uk-navbar-nav li").attr("class","");
  $(".uk-navbar-nav a[go=" + go + "]").parent().attr("class","uk-active");
  //neccessary to reload?
  //if($("#" + go + "-container").html().length == 0){
  $.ajax({
    url : './template/' + go + '.html',
    type : 'GET',
    dataType: "html",
    success : function(html) {
      $("#" + go + "-container").html(html);
      $("#" + go + "-container").show();
      switch(go){
          case "upload":
            LoadUpload();
            break;
          case "my-photos":
            LoadMyPhotos();
            break;
          default:
          break;
      }
    }
  });
  //}
}

function InsertComment(photoId,comment,uploadDetail){
  $.ajax({
    url : './services/comments/' + photoId + '?access_token=' + ACCESS_TOKEN,
    type : 'POST',
    data : JSON.stringify({comment:comment}),
    contentType: "application/json",  // tell jQuery not to set contentType
    dataType: "json",
    success : function(json) {
      console.info(json)
      uploadDetail.hide();
    }
  });
}

function LoadComments(imageId,callback){
  $.ajax({
    url : './services/comments/' + imageId,
    type : 'GET',
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    dataType: "json",
    success : callback
  });
}