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
  directive('bsActiveLink', ['$location', 'USER_ACCESS', 'USER_ROLES', '$rootScope', function($location,USER_ACCESS,USER_ROLES,$rootScope) {
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
            //Hide links by role
            if(!$rootScope.globals.currentUser){
      		$rootScope.globals.currentUser = {role : USER_ROLES.guest};
      		}
            USER_ACCESS.current = $rootScope.globals.currentUser.role;
            	//PERMISSIONS
            	switch(USER_ACCESS.current){
            		case 'guest':
	            		angular.forEach(elem.find('a'), function (a) {
			                a = angular.element(a);
			                //console.log(a.attr('href'));
			                if (-1 == USER_ACCESS.guest.indexOf(a.attr('href').replace(/#/g, ''))) {
			                    a.parent().addClass('hidden');
			                    //alert('guest');
			                } else {
			                    a.parent().removeClass('hidden');   
			                };
            			}); 
            		break;
            		case 'customer':
	            		angular.forEach(elem.find('a'), function (a) {
			                a = angular.element(a);
			                if (-1 == USER_ACCESS.customer.indexOf(a.attr('href').replace(/#/g, ''))) {
			                    a.parent().addClass('hidden');
			                } else {
			                    a.parent().removeClass('hidden');   
			                };
            			}); 
            		break;
            		case 'admin':
	            		angular.forEach(elem.find('a'), function (a) {
			                a = angular.element(a);
			                if (-1 == USER_ACCESS.admin.indexOf(a.attr('href').replace(/#/g, ''))) {
			                    a.parent().addClass('hidden');
			                } else {
			                    a.parent().removeClass('hidden');   
			                };
            			}); 
            		break;
            	}
            
            
                
        });    
     }
  };
}]).directive('progressBar', [
        function () {
            return {
                link: function ($scope, el, attrs) {
                    $scope.$watch(attrs.progressBar, function (newValue) {
                        el.css('width', newValue.toString() + '%');
                    });
                }
            };
        }
    ]);