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
    $scope.onKeydown = function(e) {
      if (e.which === 88) {
        if ($scope.xClicked === true) {
          $scope.xClicked = false;
        } else {
          $scope.xClicked = true;
        }
      }
    }
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
                                  var finalArray = [];

                                    $scope.datumContainer = true
                                    var code = file.meta.fields[0],
                                        description = file.meta.fields[1];
                                    for (var i = 0; i < file.meta.fields.length; i++) {
                                      var listCode = file.meta.fields[i];
                                      var check = 0;

                                      $.each(file.data, function(index, value) {
                                        //console.log(value[listCode]);
                                        var blank = false;

                                        if (value[listCode] === '') {
                                          console.log("hi");
                                          blank = true;
                                          check += 1;
                                        } 
                                      });
                                      console.log(check);
                                      var currentArray = [];
                                      if (check < 6) {
                                        _.map(file.data, function(datum) {
                                          currentArray.push(datum[listCode]);
                                        });
                                        finalArray.push(currentArray);
                                      } 
                                    }
                                    console.log(finalArray);
                                    var list = [];

                                    $.each(finalArray[0], function(index, value) {
                                      if ((finalArray[0][index] === '' && finalArray[1][index] === '') || (finalArray[0][index] === 'CODE' && finalArray[1][index] === 'DESCRIPTION')) {
                                      } else {
                                        list.push('<datum code="'+ $.trim(finalArray[0][index]) +'">' + $.trim(finalArray[1][index]) + '</datum>');
                                      }
                                    });
                                    list = list.slice(0, -1);
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
