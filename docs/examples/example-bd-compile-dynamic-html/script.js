(function(angular) {
  'use strict';
angular.module('compileDynamicHtmlExample', [])
    .controller('ExampleController', ['$scope', function($scope) {
        $scope.title = 'Hello world';
        $scope.dynamicHtml = '<b>{{title}}</b>'
    }]);
})(window.angular);