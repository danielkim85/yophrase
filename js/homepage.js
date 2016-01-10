//main functions
function init_() {
  var home = window.location.href.split('#')[1];
  LoadMenu(home == undefined ? "homepage" : home);
  $(".uk-navbar-nav li a, .uk-navbar-brand").click(function(){
    var go = $(this).attr("go");
    LoadMenu(go);
  });
}

function LoadFriendsPhotos(){
  $.ajax({
    url : './services/photos/friends/me?access_token=' + ACCESS_TOKEN,
    type : 'GET',
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    dataType: "json",
    success : function(json) {
      GeneratePhotoBox(json,$(".friends-moments"),$(".friends-moments"));
      /*
		  for(var i = 0; i < json.length; i++){
        console.info(json[i]);
        var obj = $(".photo-thumb:hidden").clone();
        obj.find(".fb-user").html(json[i].owner);
        var t =  "./upload/" + json[i].id + "." + json[i].ext;
        console.info(t);
        obj.css("background","url(\"./upload/" + json[i].id + "." + json[i].ext + "\")");
        //obj.attr("src", "./upload/" + json[i].id + "." + json[i].ext);
        obj.show();
        $(".friends-moments").append(obj);
      }
      LoadFBProfile($(".friends-moments"));
      */
    }
  });
}

function LoadHomepage(){
	LoadFriendsPhotos();
}
