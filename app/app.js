'use strict';

angular.module('Authentication', []);
// Declare app level module which depends on filters, and services
angular.module('Aswat', [
  'Authentication',
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ui.bootstrap',
  'ui.router',
  'angularFileUpload',
  'Aswat.filters',
  'Aswat.services',
  'Aswat.directives',
  'Aswat.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'app/shared/partials/home.html', controller: 'Home'});
  $routeProvider.when('/products', {templateUrl: 'app/shared/partials/products.html', controller: 'Products'});
  $routeProvider.when('/dashboard/products', {templateUrl: 'app/shared/partials/products-admin.html', controller: 'AdminProducts'});
  //$routeProvider.when('/dashboard/categories', {templateUrl: 'app/shared/partials/categories.html', controller: 'AdminCategories'});
  $routeProvider.when('/dashboard/roles', {templateUrl: 'app/shared/partials/roles.html', controller: 'AdminRoles'});
  $routeProvider.when('/images', {templateUrl: 'app/shared/partials/images.html', controller: 'AdminImages'});
  $routeProvider.when('/credential', {templateUrl: 'app/shared/partials/credential.html', controller: 'Credential'});
  $routeProvider.when('/signup', {templateUrl: 'app/shared/partials/signup.html', controller: 'SignUp'});
  $routeProvider.when('/order', {templateUrl: 'app/shared/partials/order.html', controller: 'Order'});
  $routeProvider.when('/logout', {templateUrl: 'app/shared/partials/order.html', controller: 'LogOut'});
  
  $routeProvider.when('/dashboard/users', {templateUrl: 'app/shared/partials/users.html', controller: 'AdminUsersListController'});
  $routeProvider.when('/dashboard/users/:id/view', {templateUrl: 'app/shared/partials/user-view.html', controller: 'AdminUserViewController'});
  $routeProvider.when('/dashboard/users/:id/edit', {templateUrl: 'app/shared/partials/user-edit.html', controller: 'AdminUserEditController'});
  
  $routeProvider.when('/dashboard/categories', {templateUrl: 'app/shared/partials/categories.html', controller: 'AdminCategoriesListController'});
  $routeProvider.when('/dashboard/categories/:id/view', {templateUrl: 'app/shared/partials/category-view.html', controller: 'AdminCategoryViewController'});
  $routeProvider.when('/dashboard/categories/:id/edit', {templateUrl: 'app/shared/partials/category-edit.html', controller: 'AdminCategoryEditController'});
  $routeProvider.when('/dashboard/categories/new', {templateUrl: 'app/shared/partials/category-add.html', controller: 'CategoryCreateController'});
  
  $routeProvider.when('/dashboard/products', {templateUrl: 'app/shared/partials/products-admin.html', controller: 'AdminProductsListController'});
  $routeProvider.when('/dashboard/products/:id/view', {templateUrl: 'app/shared/partials/product-admin-view.html', controller: 'AdminProductViewController'});
  $routeProvider.when('/dashboard/products/:id/edit', {templateUrl: 'app/shared/partials/product-admin-edit.html', controller: 'AdminProductEditController'});
  $routeProvider.when('/dashboard/products/new', {templateUrl: 'app/shared/partials/product-admin-add.html', controller: 'ProductCreateController'});
  
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
  admin: ['/dashboard','/logout','/home','/dashboard/images',
   '/dashboard/products', '/dashboard/categories', , '/dashboard/users'],
  customer: ['/logout','/home','/products','/order', '/profile', '/purchase'],
  guest: ['/home','/products','/login','/signup','/order', '/credential']
}).
run(['$rootScope', '$location', '$cookieStore', '$http','USER_ROLES','USER_ACCESS',"$templateCache",
    function ($rootScope, $location, $cookieStore, $http, USER_ROLES, USER_ACCESS, $templateCache) {
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
	            		if((-1 == USER_ACCESS.admin.indexOf($location.path()) ) && (-1 != USER_ACCESS.admin.indexOf('dashboard') ) ){
	            			alert('access');
	            			$location.path('/login');
	            		}
            		break;
            	}
               
            }
       });
       //BEGIN MODAL TPL
       $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\">\n" +
    "    <div class=\"modal-dialog\" ng-class=\"{'modal-sm': size == 'sm', 'modal-lg': size == 'lg'}\"><div class=\"modal-content\" modal-transclude></div></div>\n" +
    "</div>");
    $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade {{ backdropClass }}\"\n" +
    "     ng-class=\"{in: animate}\"\n" +
    "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" +
    "></div>\n" +
    "");
    //END MODAL TPL
    
    }]).config(['$stateProvider', function($stateProvider) {
    	//BEGIN USER DASHBOARD
  $stateProvider.state('Users', { // state for showing all Users
    url: '/dashboard/users',
    templateUrl: 'app/shared/partials/users.html',
    controller: 'AdminUsersListController'
  }).state('viewUser', { //state for showing single User
    url: '/dashboard/users/:id/view',
    templateUrl: 'app/shared/partials/user-view.html',
    controller: 'AdminUserViewController'
  }).state('newUser', { //state for adding a new User
    url: '/dashboard/users/new',
    templateUrl: 'app/shared/partials/user-add.html',
    controller: 'UserCreateController'
  }).state('editUser', { //state for updating a User
    url: '/dashboard/users/:id/edit',
    templateUrl: 'app/shared/partials/user-edit.html',
    controller: 'AdminUserEditController'
  })
  	//END USER DASHBOARD
  	
  	//BEGIN CATEGORIES DASHBOARD
  	.state('Categories', { // state for showing all Users
    url: '/dashboard/categories',
    templateUrl: 'app/shared/partials/categories.html',
    controller: 'AdminCategoriesListController'
  }).state('viewCategory', { //state for showing single User
    url: '/dashboard/categories/:id/view',
    templateUrl: 'app/shared/partials/category-view.html',
    controller: 'AdminCategoryViewController'
  }).state('newCategory', { //state for adding a new User
    url: '/dashboard/categories/new',
    templateUrl: 'app/shared/partials/category-add.html',
    controller: 'CategoryCreateController'
  }).state('editCategory', { //state for updating a User
    url: '/dashboard/categories/:id/edit',
    templateUrl: 'app/shared/partials/category-edit.html',
    controller: 'AdminCategoryEditController'
  })
  	//END CATEGORIES DASHBOARD
  	
  	//BEGIN Products DASHBOARD
  	.state('Products', { // state for showing all Users
    url: '/dashboard/products',
    templateUrl: 'app/shared/partials/products-admin.html',
    controller: 'AdminProductsListController'
  }).state('viewProduct', { //state for showing single User
    url: '/dashboard/products/:id/view',
    templateUrl: 'app/shared/partials/product-admin-view.html',
    controller: 'AdminProductViewController'
  }).state('newProduct', { //state for adding a new User
    url: '/dashboard/products/new',
    templateUrl: 'app/shared/partials/product-admin-add.html',
    controller: 'ProductCreateController'
  }).state('editProduct', { //state for updating a User
    url: '/dashboard/products/:id/edit',
    templateUrl: 'app/shared/partials/products-admin-edit.html',
    controller: 'AdminProductEditController'
  })
  	//END Products DASHBOARD
  ;
}]);
