'use strict';

angular.module('Authentication', []);
// Declare app level module which depends on filters, and services
angular.module('Aswat', [
  'Authentication',
  'ngRoute',
  'ngCookies',
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
  $routeProvider.when('/order', {templateUrl: 'app/shared/partials/order.html', controller: 'Order'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
config(['$routeProvider', function ($routeProvider) {
 
    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'app/components/authentication/views/login.html',
            hideMenus: true
        })
        .when('/signin', {
            controller: 'SignInController',
            templateUrl: 'components/authentication/views/home.html'
        })
  
        .otherwise({ redirectTo: '/home' });
}]).
constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  customer: 'customer',
  guest: 'guest'
}).
constant('USER_ACCESS', {
  all: '*',
  admin: [''],
  customer: ['/logout','/home','/products','/order'],
  guest: ['/home','/products','/login','/signin','/order']
}).
run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
    	console.debug($location);
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
       /* $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });*/
    }]);
