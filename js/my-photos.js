function LoadMyPhotos(){
  $("#photos-div-conitainer").block({ message: null }); 
  $.ajax({
    url : './services/photos/user/me?access_token=' + ACCESS_TOKEN,
    type : 'GET',
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    dataType: "json",
    success : function(json) {
      GeneratePhotoBox(json,$("#photos-div-conitainer"),$("#my-photos-grid"));
      /*
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
        //wrap this up in a common function
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
      */
    }
  });
}