'use strict';


// Declare app level module which depends on filters, and services
angular.module('Aswat', [
  'ngRoute',
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
}]);
