$(function () {

   // load activities presented in the Expanz SDK
   expanz.CreateActivity($('[bind=activity]'), {
      success: clickHandlerForGrid
   });

   // setup a click handler to toggle dropdown menus
   $('#ExpanzMenu > .menuitem').click(
      function () {
         $(this).find('ul').toggle();
   });
   $('#ExpanzMenu > .menuitem > ul').hide();

});

// clickHandlerForGrid
//    : event handler for clicks on grid rows. "selected" class is used to determine key for properties activity (see createActivityForCustomer)
function clickHandlerForGrid() {

   $('[bind=activity] > [bind=grid] > table > tbody > tr').click(function () {
      $(this).siblings().each(function () {
         $(this).removeClass('selected');
      });
      $(this).addClass('selected');
   });

}

// createActivity
//    :name - string representation of activity name
//    :url - address for new activity DOM objects to load 
//    : when the properties button is clicked, load a new activity into the DOM

function createActivity( name, url ) {
   var key = $('[bind=grid] > table > tbody > .selected').attr('id').replace(/.*_/g, '')
   var jQobj = $('div#properties-overlay > section[bind=activity][key=' + key + ']');
   if (jQobj.length > 0) {
      expanz.CreateActivity($('div#properties-overlay > div[bind=activity][key=' + key + ']'));
      openPropertiesBox();
   } else {
      $.get( url, function (html) {
         $('div#properties-overlay').append('<section bind="activity" ' + 'name="' + name + '" ' + 'key="' + key + '" ' + 'class="properties-container" >' + html + '</section>');

         expanz.CreateActivity($('div#properties-overlay > section[bind=activity][key=' + key + ']'), {success: openPropertiesBox});
         //openPropertiesBox();
      });
   }
}


// openPropertiesBox
//    : show the overlay containing properties activity
function openPropertiesBox() {
   $('div#properties-overlay').css('height', $(document).height() + 500);
   $('div#properties-overlay').show('slow');
}

// closePropertiesBox
//    : hide the overlay containing properties activity
function closePropertiesBox() {
   $('div#properties-overlay').hide('slow');
   expanz.DestroyActivity($('div#properties-overlay > section[bind=activity]'));
}

