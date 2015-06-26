var csvParser = angular.module('csvParser', []);

csvParser.service('readJson', function() {
    this.printJson = function(datum) {
        return $scope.datums.push('&lt;datum code="'+datum.CODE+'">' + datum.DESCRIPTION + '&lt;/datum>' + '<br/>');
    }
});

csvParser.service('fileUpload', ['readJson', '$q', function (file, $q) {
    var deferred = $q.defer();
    this.parseFile = function(file) {

                     return $q(function(resolve, reject) {}
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


                                    return deffered.resolve(datums);

                                     // return $scope.datums = datums;
                                },
                                error: function(err, file, inputElem, reason) { 
                                    console.log(err);
                                    return deferred.promise;
                                }
                        });
                    }
}]);

csvParser.controller('csvCtrl', ['$scope', 'fileUpload', '$q', function($scope, fileUpload, $q){
    $scope.uploadFile = function(files) {
        var file = files.files[0];
        fileUpload.parseFile(file).then(function(datum) {
            return $scope.parent.datums = datum;
        })
    };
    
}]);

// function readJson(inputJson) {
// 	$.each(inputJson, function(index, value) {
// 		$('pre code').append('&lt;datum code="'+value.CODE+'">' + value.DESCRIPTION + '&lt;/datum>' + '<br/>');
// 	});
// }




