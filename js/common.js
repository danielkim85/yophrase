//helper functions
function GeneratePhotoBox(json, blockObj, appendObj){
  for(var i =0; i < json.length; i++){
    var id = json[i].id;
    var imgSrc = "./upload/" + id + "." + json[i].ext;
    var obj = $(".photo-box.template:first").clone();
    obj.find(".uk-thumbnail img").attr("src",imgSrc);
    obj.find(".uk-thumbnail").attr("data-uk-modal","{target:'#modal-" +json[i].id +"'}");
    obj.find(".uk-modal").attr("id","modal-" + id);
    obj.find(".uk-modal img").attr("src",imgSrc);
    obj.find(".uk-icon-remove").attr("img-id",id);
    obj.find(".uk-position-cover").attr("imgId",json[i].id);
    obj.find(".uk-position-cover").removeAttr("href");
    if(json[i].owner != USERID)
      obj.find(".uk-icon-remove").hide();
    //wrap this up in a common function
    obj.find(".uk-position-cover").click(function(){
      var imgId = $(this).attr("imgId");
      LoadCommentsCaller(imgId);
    });
    
    obj.show();
    appendObj.append(obj);
  }
  //optional
  $("#my-photos-grid .uk-icon-remove").click(function(){
    DeletePhoto($(this));
  });
  blockObj.unblock(); 
}

function LoadCommentsCaller(imgId){
  $("#modal-" + imgId + " .comments").remove();
  LoadComments(imgId,function(data){
    for(var i = 0; i < data.length; i++){
      var obj = $(".comments:first").clone();
      obj.find(".text").html(data[i].comment);
      obj.find(".fb-user").html(data[i].owner);
      obj.attr("commentId",data[i].id);
      if(data[i].owner == USERID)
        obj.find(".uk-icon-close").show();
      else
        obj.find(".uk-icon-close").hide();
      obj.show();
      $(".uk-modal-dialog").append(obj);
    }

    LoadFBProfile($(".uk-modal-dialog"));
    $(".comment-submit").unbind("click");
    $(".comment-submit").click(function(){
      var that = $(this);
      var comment = $(this).parent().find(".comment-text").val();
      if($.trim(comment) == ""){
        alert("Invalid comment");
      }
      else{
        that.parent().find(".comment-text").val("");
        InsertComment(imgId,comment,function(){
          LoadCommentsCaller(imgId);   
        });
      }
    });
    $(".comments i").click(function(){
        var commentId = $(this).parent().attr("commentId");
        DeleteComment(commentId,function(){
          LoadCommentsCaller(imgId);   
        });
    });
    $(".comments .like").click(function(){
      var commentId = $(this).parent().attr("commentId");
      LikeComment(commentId,$(this).html() == "Like" ? 1 : 0,
        function(){
      });
      if($(this).html() == "Like")
        $(this).html("Unlike");
      else
        $(this).html("Like");
    })
  });
}

function DeletePhoto(obj){
  obj.parent().parent().block({ message: null }); 
  $.ajax({
    url : './services/photos/' + obj.attr("img-id")+ '?access_token=' + ACCESS_TOKEN,
    type : 'DELETE',
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    dataType: "text",
    success : function(text) {
      obj.parent().parent().remove();
    }
  });
}

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
    cache : false,
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
          case "homepage":
            LoadHomepage();
          default:
          break;
      }
    }
  });
  //}
}

function InsertComment(photoId,comment,callback){
  $.ajax({
    url : './services/comments/' + photoId + '?access_token=' + ACCESS_TOKEN,
    type : 'POST',
    data : JSON.stringify({comment:comment}),
    contentType: "application/json",  // tell jQuery not to set contentType
    dataType: "json",
    success : callback
  });
}

function LikeComment(commentId,value,callback){
  $.ajax({
    url : './services/comments/' + commentId + '/like/1?access_token=' + ACCESS_TOKEN,
    type : 'POST',
    data : JSON.stringify({commentId:commentId,value:value}),
    contentType: "application/json",  // tell jQuery not to set contentType
    dataType: "text",
    success : callback
  });
}

function DeleteComment(commentId,callback){
  $.ajax({
    url : './services/comments/' + commentId + '?access_token=' + ACCESS_TOKEN,
    type : 'DELETE',
    contentType: "application/json",  // tell jQuery not to set contentType
    dataType: "json",
    success : callback
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

function LoadFBProfile(target){
  target.find(".fb-user").each(function(){
    var that = $(this);
    var id = $(this).html();
    FB.api('/' + id , function(response) {
      var obj = $(".fb-user-plate:first").clone();
      obj.attr("href",response.link);
      obj.html(response.name);
      obj.show();
      that.html(obj);
    });
  }); 
}