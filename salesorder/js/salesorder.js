$(document).ready(function () {

   expanz.CreateActivity($('[bind=activity]'), {
      success: clickHandlerForGrid
   });

   $('#ExpanzMenu > .menuitem').click(

   function () {
      $(this).find('ul').toggle();
   });
   $('#ExpanzMenu > .menuitem > ul').hide();

   $('[bind=method] > [attribute=submit]').click(

   function () {
      createActivityForCustomer();
      return false;
   });

});

function clickHandlerForGrid() {

   $('[bind=activity] > [bind=grid] > table#customerList > tbody > tr').click(function () {
      $(this).siblings().each(function () {
         $(this).removeClass('selected');
      });
      $(this).addClass('selected');
   });

}

function createActivityForCustomer() {
   var key = $('table#customerList > tbody > .selected').attr('id').replace(/.*_/g, '')
   var jQobj = $('div#properties-overlay > section[bind=activity][key=' + key + ']');
   if (jQobj.length > 0) {
      //jQobj.show(); // is this really necessary?
      expanz.CreateActivity($('div#properties-overlay > div[bind=activity][key=' + key + ']'));
      openPropertiesBox();
   } else {
      $.get("./activity.sales.customer.properties.html", function (html) {
         $('div#properties-overlay').append('<section bind="activity" ' + 'name="Sales.Customer" ' + 'key="' + key + '" ' + 'class="properties-container" >' + html + '</section>');

         expanz.CreateActivity($('div#properties-overlay > section[bind=activity][key=' + key + ']'));
         openPropertiesBox();
      });
   }
}

function openPropertiesBox() {
   $('div#properties-overlay').show('slow');
}

function closePropertiesBox() {
   $('div#properties-overlay').hide('slow');
   expanz.DestroyActivity($('div#properties-overlay > section[bind=activity]'));
}

