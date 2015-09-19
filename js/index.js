//main functions
function init_() {
  var home = window.location.href.split('#')[1];
  LoadMenu(home == undefined ? "homepage" : home);
  $(".uk-navbar-nav li a, .uk-navbar-brand").click(function(){
    var go = $(this).attr("go");
    LoadMenu(go);
  });
}
