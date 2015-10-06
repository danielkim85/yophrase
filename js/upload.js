function LoadUpload(){
	var uploadDetail = UIkit.modal("#upload-detail");
  $("#start").click(function(){
    $("#file").click();
  });

  $("#file").change(function(){
    if($(this).val() != ""){
      LoadPreview(this);
      uploadDetail.show();
    }
  });

  $("textarea").click(function(){
    $(this).html("");
  });
  $("#upload-cancel").click(function(){
    uploadDetail.hide();
  });

  $("#upload-button").click(function(){
    $('#upload-detail .uk-modal-dialog').block({ message: null }); 
    var formData = new FormData();
    formData.append('file', $('#file')[0].files[0]);
    formData.append("access_token",ACCESS_TOKEN);
      $.ajax({
      url : './python/save_file.py',
      type : 'POST',
      data : formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      dataType: "json",
      success : function(json) {
        var imageId = json.id;
        if(json.code == 1){
            $("#file").val("");
         }
        InsertComment(imageId,$("#upload-detail #comment").val(),function(){
          uploadDetail.hide();    
        });
       }
    });
  });
}