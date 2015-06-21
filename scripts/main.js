$(document).ready(function() {
	$('.submitButton').click(function() {
		$('#chosenFile').parse({
			config: {
				header: true,
				complete: function(results, file) {
					var json = results.data;
					console.log(json);
					readJson(json);

					$('pre code').each(function(i, block) {
					    hljs.highlightBlock(block);
					});
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
		$('.content').append('<pre><code class="xml">&lt;datum code="'+value.CODE+'">' + value.DESCRIPTION + '&lt;/datum></code></pre>');
	});
}




