function LoadMyPhotos(){
  $("#photos-div-conitainer").block({ message: null }); 
  $.ajax({
    url : './services/photos/user/me?access_token=' + ACCESS_TOKEN,
    type : 'GET',
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    dataType: "json",
    success : function(json) {
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
        obj.find(".uk-position-cover").click(function(){
          var imgId = $(this).attr("imgId");
          MyPhotosLoadComments(imgId);
        });
        
        obj.show();
        $("#my-photos-grid").append(obj);
      }
      $("#my-photos-grid .uk-icon-remove").click(function(){
        DeletePhoto($(this));
      });
      $("#photos-div-conitainer").unblock(); 
    }
  });
}

function MyPhotosLoadComments(imgId){
  $("#modal-" + imgId + " .comments").remove();
  LoadComments(imgId,function(data){
    for(var i = 0; i < data.length; i++){
      var obj = $(".comments:first").clone();
      obj.find(".text").html(data[i].comment);
      obj.find(".fb-user").html(data[i].owner);
      obj.attr("commentId",data[i].id);
      if(data[i].owner == USERID)
        obj.find("i").show();
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
          MyPhotosLoadComments(imgId);   
        });
      }
    });
    $(".comments i").click(function(){
        var commentId = $(this).parent().attr("commentId");
        DeleteComment(commentId,function(){
          MyPhotosLoadComments(imgId);   
        });
    });
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