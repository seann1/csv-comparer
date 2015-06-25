var csvParser = angular.module('csvParser', []);

csvParser.service('fileUpload', function () {
    this.parseFile = function(file) {
        $(file).parse({
             config: {
                 header: true,
                 complete: function(results, file) {
                     var json = results.data;
                     $('.content').fadeIn();
                     readJson(json);

                     $('pre code').each(function(i, block) {
                         hljs.highlightBlock(block);
                     });
                     $('#myModal').modal('hide');
                 },
                 error: function(err, file, inputElem, reason) { 
                     console.log(err);
                 }
             }
         });
    }
});

csvParser.controller('csvCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    
    $scope.uploadFile = function(files) {
        var file = files.item(0);
        console.log('file is ' + JSON.stringify(file));
        fileUpload.parseFile(file);
    };
    
}]);


// $(document).ready(function() {
// 	$('.content').hide();
// 	$('#chosenFile').change(function() {
// 		$('#chosenFile').parse({
// 			config: {
// 				header: true,
// 				complete: function(results, file) {
// 					var json = results.data;
// 					$('.content').fadeIn();
// 					readJson(json);

// 					$('pre code').each(function(i, block) {
// 					    hljs.highlightBlock(block);
// 					});
// 					$('#myModal').modal('hide');
// 				},
// 				error: function(err, file, inputElem, reason) { 
// 					console.log(err);
// 				}
// 			}
// 	    });
// 	});
// });

function readJson(inputJson) {
	$.each(inputJson, function(index, value) {
		$('pre code').append('&lt;datum code="'+value.CODE+'">' + value.DESCRIPTION + '&lt;/datum>' + '<br/>');
	});
}




