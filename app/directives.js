'use strict';

/* Directives */


angular.module('Aswat.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('appName', ['name', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('bsActiveLink', ['$location', function($location) {
  return {
    restrict: 'A', //use as attribute 
    replace: false,
    link: function(scope, elem) {
        //after the route has changed
        scope.$on("$routeChangeSuccess", function () {
            var selectors = ['li > [href="#' + $location.path() + '"]',
                             'li > [href="/#' + $location.path() + '"]', //html5: false
                             'li > [href="' + $location.path() + '"]']; //html5: true
            angular.forEach(elem.find('a'), function (a) {
                a = angular.element(a);
                if (-1 !== window.location.href.indexOf(a.attr('href'))) {
                    a.parent().addClass('active');
                } else {
                    a.parent().removeClass('active');   
                };
            });     
        });    
     }
  };
}]);