   $(document).ready( function(){

      $('#menu .menuitem').click(   function(){
            $(this).find('ul').toggle( );
      });
      $('#menu .menuitem ul').hide();

   });

   $(document).ExpanzLoad( function(){

      $('tbody > tr').click( function(){
         $(this).siblings().each( function(){ $(this).removeClass('selected'); } );
         $(this).addClass('selected');
      });

   });

   var customerListSelector = function closure(){
      var selector = $('#customerList > table > tbody > .selected').attr('id').replace(/.*_/g, '');
      customerListSelector = function result( reset ){
         if( reset !== false )
            selector = $('#customerList > table > tbody > .selected').attr('id').replace(/.*_/g, '');
         return selector;
      };
      return selector;
   }

   function createActivityForCustomer( fields ){
      var jQobj = $('div[initialKey=' + customerListSelector(false) + ']' );
      if( jQobj.length > 0 ){
         jQobj.show();
         DynamicLoadActivity( jQobj );
         openPropertiesBox();
      } else {
         $.get( "./activity.sales.customer.properties.html", function(html){
            $('div#properties-overlay').append( '<div class="Activity properties-container" ' +
                                                   'name="Sales.Customer" ' +
                                                   'initialKey="' + customerListSelector(false) +'" >' +
                                                   html +
                                                '</div>'
                                                );

            jQobj = $('div#properties-overlay > div.properties-container[initialKey=' + customerListSelector(false) + ']' );

            DynamicLoadActivity( jQobj );
            openPropertiesBox();
         });
      }
   }

   function openPropertiesBox(){
      $('div#properties-overlay').show('slow');
   }

   function closePropertiesBox(){
      $.each( $('div.properties-container' ), function( i, obj ){ $(obj).hide(); } );
      $('div#properties-overlay').hide('slow');
      DynamicLoadActivity( $('#container') );
   }

