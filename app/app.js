'use strict';

angular.module('Authentication', []);
// Declare app level module which depends on filters, and services
angular.module('Aswat', [
  'Authentication',
  'ngRoute',
  'ngCookies',
  'angularFileUpload',
  'Aswat.filters',
  'Aswat.services',
  'Aswat.directives',
  'Aswat.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'app/shared/partials/home.html', controller: 'Home'});
  $routeProvider.when('/products', {templateUrl: 'app/shared/partials/products.html', controller: 'Products'});
  $routeProvider.when('/categories', {templateUrl: 'app/shared/partials/categories.html', controller: 'Categories'});
  $routeProvider.when('/roles', {templateUrl: 'app/shared/partials/roles.html', controller: 'Roles'});
  $routeProvider.when('/images', {templateUrl: 'app/shared/partials/images.html', controller: 'Images'});
  $routeProvider.when('/users', {templateUrl: 'app/shared/partials/users.html', controller: 'Users'});
  $routeProvider.when('/credential', {templateUrl: 'app/shared/partials/credential.html', controller: 'Credential'});
  $routeProvider.when('/signup', {templateUrl: 'app/shared/partials/signup.html', controller: 'SignUp'});
  $routeProvider.when('/order', {templateUrl: 'app/shared/partials/order.html', controller: 'Order'});
  $routeProvider.when('/logout', {templateUrl: 'app/shared/partials/order.html', controller: 'LogOut'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  customer: 'customer',
  guest: 'guest',
  current : null
}).
constant('USER_ACCESS', {
  all: '*',
  admin: ['/dashboard','/logout','/home','/products','/order', '/images'],
  customer: ['/logout','/home','/products','/order', '/profile', '/purchase'],
  guest: ['/home','/products','/login','/signup','/order', '/credential']
}).
run(['$rootScope', '$location', '$cookieStore', '$http','USER_ROLES','USER_ACCESS',
    function ($rootScope, $location, $cookieStore, $http, USER_ROLES, USER_ACCESS) {
    	//console.debug($location);
    	if(!$rootScope.globals){$rootScope.globals = $cookieStore.get('globals') || {}; $rootScope.globals.currentUser = {};}
        // keep user logged in after page refresh
        
        if ($cookieStore.get('username')) {
        	USER_ROLES.current = $cookieStore.get('role') || 'guest';
        	$rootScope.globals.currentUser.role = $cookieStore.get('role') || 'guest';
        }
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
      	if(!$cookieStore.get('username')){
      		$rootScope.globals.currentUser = {role : USER_ROLES.guest};
      	}
      	if($cookieStore.get('username') && !$rootScope.globals.currentUser.username){
      		$rootScope.globals.currentUser = {
      			'role' : $cookieStore.get('role'),
      			'username' : $cookieStore.get('username'),
      			'image' : $cookieStore.get('image'),
      			'image_alt' : $cookieStore.get('image_alt'),
      			'image_title' : $cookieStore.get('image_title')
      		};
      	}
            // redirect to login page if not logged in
            if ($location.path() && ($location.path() !== '/login') &&  ($location.path() !== '/signin')) {
            	if(!$rootScope.globals.currentUser.role){
            		$rootScope.globals.currentUser.role = $cookieStore.get('role') || 'guest';
            	}
            	//PERMISSIONS
            	switch($rootScope.globals.currentUser.role){
            		case 'guest':
            		//console.log(USER_ACCESS.guest.indexOf($location.path()));
	            		if(-1 == USER_ACCESS.guest.indexOf($location.path())){
	            			$location.path('/login');
	            		}
            		break;
            		case 'customer':
	            		if(-1 == USER_ACCESS.customer.indexOf($location.path())){
	            			$location.path('/login');
	            		}
            		break;
            		case 'admin':
	            		if(-1 == USER_ACCESS.admin.indexOf($location.path())){
	            			$location.path('/login');
	            		}
            		break;
            	}
               
            }
       });
    }]);
