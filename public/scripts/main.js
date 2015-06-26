var csvParser = angular.module('csvParser', []);

csvParser.service('fileUpload', function () {
    this.readJson = function(datum) {
        return $scope.datums.push('&lt;datum code="'+datum.CODE+'">' + datum.DESCRIPTION + '&lt;/datum>' + '<br/>');
    }
    this.parseFile = function(file) {
        Papa.parse(file, {
                    header: true,
                    complete: function(results, file) {
                        console.log(results);
                        var json = results.data;
                        $('.content').fadeIn();
                        readJson(json);

                        $('pre code').each(function(i, block) {
                            hljs.highlightBlock(block);
                        });
                     $('#myModal').modal('hide');

                     return _.map(results.data, function(datum){return fileUpload.readJson(datum)});

                     // return $scope.datums = datums;
                 },
                 error: function(err, file, inputElem, reason) { 
                     console.log(err);
                 }
         });
    }
});

csvParser.controller('csvCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.datums = [];
    $scope.uploadFile = function(files) {
        var file = files.files[0];
        console.log(file);
        fileUpload.parseFile(file);
    };
    
}]);

// function readJson(inputJson) {
// 	$.each(inputJson, function(index, value) {
// 		$('pre code').append('&lt;datum code="'+value.CODE+'">' + value.DESCRIPTION + '&lt;/datum>' + '<br/>');
// 	});
// }




