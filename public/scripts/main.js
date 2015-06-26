var csvParser = angular.module('csvParser', []);

csvParser.service('readJson', function() {
    this.printJson = function(datum) {
        return $scope.datums.push('&lt;datum code="'+datum.CODE+'">' + datum.DESCRIPTION + '&lt;/datum>' + '<br/>');
    }
});

csvParser.service('fileUpload', ['readJson', function () {
    this.parseFile = function(file) {
        Papa.parse(file, {
                    header: true,
                    complete: function(results, file) {
                        console.log(results);
                        var json = results.data;
                        $('.content').fadeIn();

                        $('pre code').each(function(i, block) {
                            hljs.highlightBlock(block);
                        });
                     $('#myModal').modal('hide');
                     var datums = [];
                     datums.push(_.map(results.data, function(datum){return datums.push('&lt;datum code="'+datum.CODE+'">' + datum.DESCRIPTION + '&lt;/datum>' + '<br/>')}));
                     return datums;

                     // return $scope.datums = datums;
                 },
                 error: function(err, file, inputElem, reason) { 
                     console.log(err);
                 }
         });
    }
}]);

csvParser.controller('csvCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.datums = [];
    $scope.uploadFile = function(files) {
        var file = files.files[0];
        console.log(file);
        $scope.datums.push(fileUpload.parseFile(file));
        
    };
    
}]);

// function readJson(inputJson) {
// 	$.each(inputJson, function(index, value) {
// 		$('pre code').append('&lt;datum code="'+value.CODE+'">' + value.DESCRIPTION + '&lt;/datum>' + '<br/>');
// 	});
// }




