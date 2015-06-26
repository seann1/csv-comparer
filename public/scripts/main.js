var csvParser = angular.module('csvParser', ['ngFileUpload']);

csvParser.controller('csvCtrl', ['$scope', 'Upload', function($scope, Upload) {


    $scope.datums;

    $scope.$watch('files', function () {
        $scope.uploadFile($scope.files);
    });

    $scope.uploadFile = function(files) {

        var file = files.files[0];
        Papa.parse(file, {header: true, 
                            complete: function(results, file) {
                                function printJson(file) {
                                    var list = [];
                                    _.map(file, function(datum) {
                                        return list.push('<datum code="'+datum.CODE+'">' + datum.DESCRIPTION + '</datum>');
                                    });
                                    return list;
                                }
                                console.log(results.data);

                                $scope.$apply(function() {
                                    $scope.datums = printJson(results.data);
                                });
                                $('pre code').each(function(i, block) {
                                    hljs.highlightBlock(block);
                                });
                            }
                        });
    };
    
}]);




