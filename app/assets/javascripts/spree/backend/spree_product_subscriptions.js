// Placeholder manifest file.
// the installer will append this file to the app vendored assets here: vendor/assets/javascripts/spree/backend/all.js'
//= require spree/backend/subscribable
//= require spree/frontend/ajax_handler
$(document).ready(function () {
	$('#add_variant_id_sub').change(function(){
	    var variant_id = $(this).val();

	    var variant = _.find(window.variants, function(variant){
	      return variant.id == variant_id
	    })
	    $('#stock_details').html(variantStockTemplate({variant: variant}));
	    $('#stock_details').show();

	    $('button.add_variant_sub').click(function(event) {
	    	event.preventDefault();

		  	$('#stock_details').hide();

			var variant_id = $('input.variant_autocomplete').val();
			var stock_location_id = $(this).data('stock-location-id');
			var quantity = $("input.quantity[data-stock-location-id='" + stock_location_id + "']").val();

		    $.ajax({
		      type: "POST",
		      url: Spree.url("add_product"),
		      data: {
		        variant_id: variant_id,
		        quantity: quantity,
		        token: Spree.api_key
		      }
		    }).done(function( msg ) {
		      window.location.reload();
		    }).error(function( msg ) {
		      console.log(msg);
		    });

		})
	});
});