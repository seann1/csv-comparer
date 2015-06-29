var csvParser = angular.module('csvParser',[]);

csvParser.directive("fileDropzone", function() {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '=',
      uploadCtrlFn: '&callbackFn'
    },
    link: function(scope, element, attrs) {
      var processDragOverOrEnter;
      processDragOverOrEnter = function(event) {
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';
        return false;
      };
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);
      return element.bind('drop', function(event) {
        var name, reader, size, type;
          if (event != null) {
            event.preventDefault();
          }
        scope.uploadCtrlFn({arg1: event.dataTransfer});
        //scope.$apply('csvCtrl.uploadFile(event.dataTransfer.files[0])');
        // reader.onload = function(evt) {
        //   return scope.$apply(function() {
        //     scope.file = evt.target.result;
        //     if (angular.isString(scope.fileName)) {
        //       return scope.fileName = name;
        //     }
        //   });
        // }
      });
    }
  }
});

csvParser.controller('csvCtrl', ['$scope', function($scope, Upload) {


    $scope.datums;
    $scope.image = null
    $scope.imageFileName = ''

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
