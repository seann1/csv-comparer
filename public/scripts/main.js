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
      var processDragOverOrEnter,
          changeBox;
      processDragOverOrEnter = function(event) {
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';
        return false;
      };
      changeBox = function() {
        var imageArray = ['assets/iris.gif', 'assets/pink.gif'];
        $(event.target).css('background-image', 'url(' + _.shuffle(imageArray)[0] + ')');
      }
      element.bind('dragenter dragleave', changeBox)
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);
      return element.bind('drop', function(event) {
        var name, reader, size, type;
          if (event != null) {
            event.preventDefault();
          }
        scope.uploadCtrlFn({arg1: event.dataTransfer});

      });
    }
  }
});

csvParser.controller('csvCtrl', ['$scope', function($scope, Upload) {
    $scope.datums
    $scope.image = null
    $scope.imageFileName = ''
    $scope.fileName = ''
    $scope.length = ''
    $scope.datumContainer = false
    $scope.uploadFile = function(files) {

        var file = files.files[0];
        $scope.fileName = file.name
        Papa.parse(file, {header: true,
                            complete: function(results, file) {
                                function printJson(file) {
                                    $scope.datumContainer = true
                                    var code = file.meta.fields[0],
                                        description = file.meta.fields[1];
                                    var list = [];
                                    _.map(file.data, function(datum) {
                                        return list.push('<datum code="'+ $.trim(datum[code]) +'">' + $.trim(datum[description]) + '</datum>');
                                    });
                                    $scope.length = list.length
                                    return list;
                                }

                                $scope.$apply(function() {
                                    $scope.datums = printJson(results);
                                });
                                $('pre code').each(function(i, block) {
                                    hljs.highlightBlock(block);
                                });
                            }
                        });
    };

}]);
