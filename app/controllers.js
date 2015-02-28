'use strict';

/* Controllers */

angular.module('Aswat.controllers', [
 'Authentication',
  'ngRoute',
  'ngCookies',
  'angularFileUpload',
  'Aswat.filters',
  'Aswat.services',
  'Aswat.directives'
]).
  controller('Home', ['$scope', '$rootScope', 'USER_ROLES', '$cookieStore', function($scope, $rootScope, USER_ROLES, $cookieStore) {
		 /* $scope.currentUser = null;*/
		  $scope.userRoles = USER_ROLES;
		  $scope.isAuthorized = function () {
		  	 if($cookieStore.get('username')){
		  	 	$scope.currentUser ={
		  			'role' : $cookieStore.get('role') || 'guest',
	      			'username' : $cookieStore.get('username') || '',
	      			'image' : $cookieStore.get('image') || '',
	      			'image_alt' : $cookieStore.get('image_alt') || '',
	      			'image_title' : $cookieStore.get('image_title') || ''
		 		 };
		  	 }
		  	return $cookieStore.get('username') ? true : false;
		  	};
		  	if($scope.isAuthorized()){
		  $scope.currentUser ={
		  			'role' : $cookieStore.get('role') || 'guest',
	      			'username' : $cookieStore.get('username') || '',
	      			'image' : $cookieStore.get('image') || '',
	      			'image_alt' : $cookieStore.get('image_alt') || '',
	      			'image_title' : $cookieStore.get('image_title') || ''
		 		 };
		 		// alert('hrezr');
		 }
		  $scope.setCurrentUser = function (user) {
		    $scope.currentUser = user;
		  };
  }])
  .controller('Products', [function() {

  }])
  .controller('AdminProducts', [function() {

  }])
  
  //BEGIN CATEGORIES ADMIN
  .controller('AdminCategoriesListController', ['$scope', 'Categories', '$http','modalService', '$stateParams',function($scope, Categories, $http, modalService, $stateParams) {
  	$scope.categories = Categories.get(); //fetch all Categories.
  $scope.deleteCategory = function(id, category_name) { // Delete user
  	
    var categoryName = category_name;
			    var modalOptions = {
			            closeButtonText: 'Cancel',
			            actionButtonText: 'Delete Category',
			            headerText: 'Delete ' + categoryName + '?',
			            bodyText: 'Are you sure you want to delete this category ?'
			        };
			        modalService.showModal({}, modalOptions).then(function (result) {
			            $http.get('index.php?ajax=1&controller=Category&action=delete&id='+ id ).success(function(response) { }
			            ).then(function () {
			               location.reload();
			            });
			        });

  	};
  }])
  .controller('AdminCategoryViewController', ['$scope' , '$stateParams', '$http', function($scope, $stateParams, $http) {
		$http.get('index.php?ajax=1&controller=Category&action=fetch&id='+$stateParams.id ).success(function(data) {
      $scope.categories = data;
    }); //Get 
  }])
  .controller('AdminCategoryEditController', ['$scope' , '$state', '$stateParams', '$location', '$http', function($scope, $state, $stateParams, $location, $http) {
  		$scope.updateCategory = function (){
		var responsePromise = $http.post(
			'index.php?ajax=1&controller=Category&action=update' ,
			 {'id' : $stateParams.id,
			 	'category_name' : $scope.category.category_name});
			 	
		responsePromise.success(function(data, status, headers, config) {
			  	$location.path('/dashboard/categories');
			  });
			   
		
	}; 
	  $scope.loadCategory = function() { //Issues a GET request 
		$http.get('index.php?ajax=1&controller=Category&action=fetch&id='+$stateParams.id ).success(function(data) {
	      $scope.categories = data;
	    }); //Get
	  };
	  $scope.loadCategory(); // Load category which can be edited on UI

  }])
  .controller('CategoryCreateController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.category = {};
	$scope.addCategory = function (categoryName){
		var responsePromise = $http.post(
			'index.php?ajax=1&controller=Category&action=add' ,
			 {'category_name' : categoryName}
			  );
		responsePromise.success(function(data, status, headers, config) {
				$location.path('/dashboard/categories');
				});
	};
  }])
  
  //END CATEGORIES ADMIN
  
  //BEGIN PRODUCTS ADMIN
  .controller('AdminProductsListController', ['$scope', 'Products', '$http','modalService', '$stateParams',function($scope, Products, $http, modalService, $stateParams) {
  	$scope.products = Products.get(); //fetch all Users.
  $scope.deleteProduct = function(id, product_name) { // Delete user
  	
    var productName = product_name;
			    var modalOptions = {
			            closeButtonText: 'Cancel',
			            actionButtonText: 'Delete Product',
			            headerText: 'Delete ' + productName + '?',
			            bodyText: 'Are you sure you want to delete this prodect ?'
			        };
			        modalService.showModal({}, modalOptions).then(function (result) {
			            $http.get('index.php?ajax=1&controller=Product&action=delete&id='+ id ).success(function(response) { }
			            ).then(function () {
			               location.reload();
			            });
			        });

  	};
  }])
  .controller('AdminProductViewController', ['$scope' , '$stateParams', '$http', 'Categories', function($scope, $stateParams, $http, Categories) {
	$scope.categories = Categories.get(); //fetch all Categories.
	$http.get('index.php?ajax=1&controller=Product&action=fetch&id='+$stateParams.id )
	.success(function(data) {
      		$scope.products = data;
      		
      });
    
  }])
  .controller('AdminProductEditController', ['$scope' , '$state', '$stateParams', '$location', '$http', '$upload', 'Categories', function($scope, $state, $stateParams, $location, $http,$upload,Categories) {
  		$scope.categories = Categories.get(); //fetch all Categories.
		$scope.model = {};
            $scope.selectedFile = [];
            $scope.uploadProgress = 0;
  		$scope.updateProduct = function (){
		var responsePromise = $http.post(
			'index.php?ajax=1&controller=Product&action=update' ,
			 {'id' : $stateParams.id,
			 	'product_name' : $scope.product.product_name,
			 	'teaser' : $scope.product.teaser,
			 	'description' : $scope.product.description,
			 	'category_id' : $scope.product.category_id,
			 	'price' : $scope.product.price});
			 	
				responsePromise.success(function(data, status, headers, config) {
			  });
			  //console.log($scope.file);
			  if(null != $scope.file){
						 var file = $scope.file;
		                $scope.upload = $upload.upload({
		                    url: 'index.php?ajax=1&controller=Product&action=updateImage',
		                    method: 'POST',
		                    data: {
		                    	'id':$stateParams.id,
		                    	'image_id' : $scope.product.image_id
		                    	  },
		                    file: file
		                }).progress(function (evt) {
		                    $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
		                }).success(function (data) {
		                    if(data.error){
								$scope.error = data.msg;
								$scope.dataLoading = false;
								return;
							}else{
								$location.path('/dashboard/products');
							}
		                });
					}else{
						$location.path('/dashboard/products');
					}
		
	}; 
	
	  $scope.loadProduct = function() { //Issues a GET request 
		$http.get('index.php?ajax=1&controller=Product&action=fetch&id='+$stateParams.id ).success(function(data) {
	      $scope.products = data;
	    }); //Get
	  };
	  $scope.loadProduct(); // Load category which can be edited on UI

  }])
  .controller('ProductCreateController', ['$scope', '$http', '$location', '$upload', 'Categories', function($scope, $http, $location, $upload, Categories) {
		$scope.categories = Categories.get(); //fetch all Categories.
		$scope.model = {};
            $scope.selectedFile = [];
            $scope.uploadProgress = 0;
			//$scope.error = {};
            $scope.uploadProduct = function () {
                var file = $scope.selectedFile[0];
                $scope.upload = $upload.upload({
                    url: 'index.php?ajax=1&controller=Product&action=add',
                    method: 'POST',
                    data: {
                    	'product_name':$scope.product_name,
                    	 'teaser': $scope.teaser,
                    	  'description':$scope.description,
                    	  'category_id':$scope.category_id,
                    	  'price':$scope.price
                    	  },
                    file: file
                }).progress(function (evt) {
                    $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
                }).success(function (data) {
                    if(data.error){
						$scope.error = data.msg;
						$scope.dataLoading = false;
						return;
					}else{
						$location.path('/dashboard/products');
					}
                });
            };

            $scope.onFileSelect = function ($files) {
                $scope.uploadProgress = 0;
                $scope.selectedFile = $files;
            };
	
  }])
  
  //END PRODUCTS ADMIN
  
  .controller('AdminRoles', [function() {

  }])
  .controller('AdminImages', [function() {

  }])
  .controller('AdminUsersListController', ['$scope', 'User','modalService', '$http', '$location', function($scope, User, modalService, $http, $location) {
  	$scope.users = User.get(); //fetch all Users.
  $scope.deleteUser = function(id, login) { // Delete user
  	
    var custName = login;
			    var modalOptions = {
			            closeButtonText: 'Cancel',
			            actionButtonText: 'Delete User',
			            headerText: 'Delete ' + custName + '?',
			            bodyText: 'Are you sure you want to delete this user?'
			        };
			        modalService.showModal({}, modalOptions).then(function (result) {
			            $http.get('index.php?ajax=1&controller=User&action=delete&id='+ id ).success(function(response) { }
			            ).then(function () {
			               location.reload();
			            });
			        });
  };

  }])
  .controller('AdminUserViewController', ['$scope' , '$stateParams', 'User','$http', function($scope, $stateParams, User, $http) {
  	$http.get('index.php?ajax=1&controller=User&action=fetch&id='+$stateParams.id ).success(function(data) {
      $scope.users = data;
    }); //Get 
  	 
	
  }])
  .controller('AdminUserEditController', ['$scope' , '$state', '$stateParams', '$location', '$http', function($scope, $state, $stateParams, $location, $http) {
	$scope.updateUser = function (){
		var responsePromise = $http.post(
			'index.php?ajax=1&controller=user&action=update' ,
			 {
			 	'id' : $stateParams.id,
			 	'login' : $scope.user.login,
			 	'email' : $scope.user.email,
			 	'role_id' : $scope.user.role_id}
			  );
			  responsePromise.success(function(data, status, headers, config) {
			  	$location.path('/dashboard/users');
			  });
			   
		
	}; 
	  $scope.loadUser = function() { //Issues a GET request 
		$http.get('index.php?ajax=1&controller=User&action=fetch&id='+$stateParams.id ).success(function(data) {
	      $scope.users = data;
	    }); //Get
	  };
	  $scope.loadUser(); // Load user which can be edited on UI
 }])
  .controller('Credential', ['$scope', '$http', '$location', '$cookieStore', 'USER_ROLES', function($scope, $http, $location, $cookieStore,USER_ROLES) {
	this.cancel = $scope.$dismiss;
	$scope.getCredential = function () { 
	 $scope.dataLoading = true;
		var responsePromise = $http.post(
			'index.php?ajax=1&controller=user&action=authentication' ,
			 {'username' : $scope.username,
			 		'password' : $scope.password,
			 		'remember' : $scope.remember ? 1 : 0}
			  );
		responsePromise.success(function(data, status, headers, config) {
				if(data.error){
					$scope.error = data.msg;
					$scope.dataLoading = false;
					return;
				}else{
					$cookieStore.global = {};
					$cookieStore.global.username = data.data.login;
					$cookieStore.global.role = data.data.role_id == 2 ? 'customer' : 'admin';
						$cookieStore.put('image',data.data.image);
						$cookieStore.put('username',$cookieStore.global.username);
						$cookieStore.put('role',$cookieStore.global.role);
						$cookieStore.put('image_alt',data.data.image_alt);
						$cookieStore.put('image_title',data.data.image_title);
						USER_ROLES.current = $cookieStore.get('role');
						var user = {
							'username' : $cookieStore.global.username,
							'image' : data.data.image,
							'image_alt' : data.data.image_alt,
							'image_title' : data.data.image_title,
							'role' : USER_ROLES.current
						};
				//		$rootScope.globals.currentUser(user);
				$location.path('/home');
					
				}
				
                    //$scope.myData.fromServer = data.title;
                });
       	 responsePromise.error(function(data, status, headers, config) {
                    alert("AJAX failed!");
                });
     
 	};
  }])
  .controller('SignUp', ['$scope', '$http', '$location', '$upload', function($scope, $http, $location, $upload) {
  	 $scope.model = {};
            $scope.selectedFile = [];
            $scope.uploadProgress = 0;
			//$scope.error = {};
            $scope.uploadFile = function () {
                var file = $scope.selectedFile[0];
                $scope.upload = $upload.upload({
                    url: 'index.php?ajax=1&controller=user&action=register',
                    method: 'POST',
                    data: {'login':$scope.pseudo, 'email': $scope.email, 'password':$scope.password},
                    file: file
                }).progress(function (evt) {
                    $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
                }).success(function (data) {
                    if(data.error){
						$scope.error = data.msg;
						$scope.dataLoading = false;
						return;
					}else{
						$location.path('/credential');
					}
                });
            };

            $scope.onFileSelect = function ($files) {
                $scope.uploadProgress = 0;
                $scope.selectedFile = $files;
            };

  }])
  .controller('Order', [function() {

  }]).controller('LogOut', ['$scope', '$cookieStore', '$location', function($scope, $cookieStore, $location) {
						$cookieStore.remove('image');
						$cookieStore.remove('username');
						$cookieStore.remove('role');
						$cookieStore.remove('image_alt');
						$cookieStore.remove('image_title');
						$location.path('/home');
  }]);
  
