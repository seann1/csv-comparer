$(document).ready(function() {
	$('.content').hide();
	$('.submitButton').click(function() {
		$('#chosenFile').parse({
			config: {
				header: true,
				complete: function(results, file) {
					var json = results.data;
					$('.content').fadeIn();
					readJson(json);

					$('pre code').each(function(i, block) {
					    hljs.highlightBlock(block);
					});
					$('#myModal').modal('hide')
				},
				error: function(err, file, inputElem, reason) { 
					console.log(err);
				}
			}
	    });
	});
});

function readJson(inputJson) {
	$.each(inputJson, function(index, value) {
		$('pre code').append('&lt;datum code="'+value.CODE+'">' + value.DESCRIPTION + '&lt;/datum>' + '<br/>');
	});
}




