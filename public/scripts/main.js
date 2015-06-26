var csvParser = angular.module('csvParser', []);

csvParser.service('readJson', function() {}
);

csvParser.factory('fileUpload', ['readJson', '$q', function (file, $q) {
    return {
        parseFile: function(file) {}
    }

    }]);

csvParser.controller('csvCtrl', ['$scope', 'fileUpload', 'readJson', function($scope, $q, fileUpload){
    $scope.datums = [1, 2, 3];
    $scope.uploadFile = function(files) {
        var file = files.files[0];
        Papa.parse(file, {header: true, 
                            complete: function(results, file) {
                                function printJson(file) {
                                    var list = [];
                                    _.map(file, function(datum) {
                                        return list.push('<datum code="'+datum.CODE+'">' + datum.DESCRIPTION + '</datum>' + '<br/>');
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




