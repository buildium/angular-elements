(function(angular) {
  'use strict';
angular.module('compileTemplateExample', [])
.controller('ExampleController', ['$scope', function($scope) {
                $scope.title = 'Hello world';
                $scope.dynamicHtml = '<b>{{title}}</b>'
            }]);
})(window.angular);