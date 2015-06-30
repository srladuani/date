// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery.ui.all
//= require jquery_ujs
//= require jquery-fileupload/basic
//= require jquery-fileupload/vendor/tmpl
//= require jquery.magnific-popup.js
//= require jquery.purr
//= require best_in_place
//= require cufon-yui
//= require Helvetica_Neue_LT_Std_400.font
//= require Helvetica_Neue_LT_Std_italic_300.font
//= require Helvetica_Neue_LT_Std_500.font
//= require Helvetica_Neue_LT_Std_750.font
//= require Dosis_400.font
//= require cufon
//= require jquery.jqtransform
//= require_tree .

$(function(){
  if($("#jqTransformDisable").length > 0) {
    return;
  }else{
  $('select').jqTransSelect();
  $(document).on('change','select',function(){
    var id = $(this).attr('id')
    fix_select('#'+id);
  })
  $('input[type=checkbox]').jqTransCheckBox();
  
  $('.img_box').imagesLoaded(function(){
    $('.box_detail').masonry({
  	  columnWidth: 80,
  	  itemSelector: '.common_box'
	  });
  });
	
  $('a#inbox_link, a#sentbox_link').click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		console.log('href'+href);
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');
		$('.tab_contr').css('display','none');;
		$(href).css('display','block');
	})
  $('#signin_link').click(function () {
      $('#signin-dropdown').toggle();
      return false;
  });
  $('#signin-dropdown').click(function(e) {
      e.stopPropagation();
  });
  $(document).click(function() {
      $('#signin-dropdown').hide();
  });
  $('.select_conversations').on('click',function(){
    console.log('checking')
    if($(this).is(':checked')){
      $('.tab_contr:visible .conversation_checkbox').each(function(){
        $(this).prop('checked', true)
        console.log('length', $(this).closest('a.jqTransformCheckbox').length)
        $(this).parent().find('a.jqTransformCheckbox').addClass('jqTransformChecked')
      })
      console.log('unchecked')
    }
    else {
      $('.tab_contr:visible .conversation_checkbox').each(function(){
        $(this).prop('checked', false)
        $(this).parent().find('a.jqTransformCheckbox').removeClass('jqTransformChecked')
      })
      console.log('checked')
    }
  })
  // $(".jqtransform").jqTransform();
}
});

function fix_select(selector) {
    var i=$(selector).parent().find('div,ul').remove().css('zIndex');
    $(selector).unwrap().removeClass('jqTransformHidden').jqTransSelect();
    $(selector).parent().css('zIndex', i);
}

function deleteMsg(id){
	var ids = [];
	ids.push(id);        
	$.ajax({ type: "POST",  url:"/conversations/trash_all",  data:{ids: ids},
	  success:function(data){
		jQuery.each(ids, function (i, val) {
		  $("div.outer#msg_"+val).remove();
		});
	  }
	});
}



$( document ).ready(function() {
	$("abbr.timeago").timeago();
	window.asd = $('.SlectBox#relegion').SumoSelect({ 
			placeholder: 'Relegion',
			csvDispCount: 3 
		});
		
	window.asd = $('.SlectBox#children').SumoSelect({ 
			placeholder: 'Kids',
			csvDispCount: 3 
		});
	window.asd = $('.SlectBox#ethnicity').SumoSelect({ 
			placeholder: 'Ethnicity',
			csvDispCount: 3 
		});
	window.asd = $('.SlectBox#gender').SumoSelect({ 
		placeholder: 'Gender',
		csvDispCount: 3 
	});
	
	$('#header .main_dropdown').hover( function() { $('#header .main_dropdown .dropdown-menu').toggle(); } );
    if($(".notice, .flash").text().length){
          $(".notice_flash .flash_msg").text($(".notice, .flash").text());
	      $(".notice_flash").show();
	      setTimeout(function(){
		    $(".notice_flash").hide();
	      }, 5000);
	}                 
    $(".notice, .flash").hide();
	$(".notice_flash .close").on('click', function(){
	  $(".notice_flash").hide();
	});
	
	
	$('.message_btn').click(function () {
	  var user_id = $(this).data('user');
	  $('#user').val(user_id);
	  var avatar_url = $("#image_" + user_id).attr('src');
	  var username = $("#name_" + user_id).val();
	  var age = $("#age_" + user_id).val();
	  var gender = $("#gender_" + user_id).val();
	  var sexuality = $("#sexuality_" + user_id).val();
	  var city = $("#city_" + user_id).val();
	  var state = $("#state_" + user_id).val();
	  var html_content = "<div class=\"commoon_sec\">" +
				  "<div class=\"left_sec\"><img alt=\"Popup baby\" src=\"" + avatar_url + "\"></div>" +
				  "<div class=\"right_sec\" style=\"position:relative;\">" +
				  "<div class=\"top_box\" style=\"position:absolute; border: 1px solid #cccccc; width: 456px; border-radius: 6px; height: 140px; background-color: #F7F7F7;\">" +
				  "<div class=\"left_box\" style=\"float:right; text-align:left; width: 68%;\">" +
				  "<h2>" + username + "</h2><h3>" + age + ", " + gender + ", " + sexuality + "</br>" +
				  city + ", " + state + "</h3></div></div></div></div>";
	  $("div.common_sec").html(html_content);
	  Cufon.refresh();
	})

      
	
});
 $( document ).ajaxComplete(function(event, xhr, settings) {
	     var ct = xhr.getResponseHeader("content-type") || "";
	     if (ct.indexOf('json') > -1) {
             var myArr = JSON.parse(xhr.responseText);
             if(myArr && myArr.notice.length) {
                 $(".notice_flash .flash_msg").text(myArr.notice);
                 $(".notice_flash").show();
                 setTimeout(function () {
                     $(".notice_flash").hide();
                 }, 5000);
             }
         }
	});

