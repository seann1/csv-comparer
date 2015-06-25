var csvParser = angular.module('csvParser', []);

csvParser.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

csvParser.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

csvParser.controller('csvCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    
    $scope.uploadFile = function() {
        var file = $scope.myFile;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "/fileUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
    
}]);

csvParser.controller('csvCtrl', function($scope) {

});


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




