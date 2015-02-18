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
		  //console.log($scope.isAuthorized());
  }])
  .controller('Products', [function() {

  }])
  .controller('AdminProducts', [function() {

  }])
  .controller('AdminCategories', [function() {

  }])
  .controller('AdminRoles', [function() {

  }])
  .controller('AdminImages', [function() {

  }])
  .controller('AdminUsersListController', ['$scope', 'User', function($scope, User) {
  	$scope.users = User.get(); //fetch all Users.
 //console.debug($scope.users);
  $scope.deleteUser = function(user) { // Delete user
    if (popupService.showPopup('Really delete this?')) {
      user.$delete(function() {
        $window.location.href = ''; //redirect to home
      });
    }
  };

  }])
  .controller('AdminUserViewController', ['$scope' , '$stateParams', 'User','$http', function($scope, $stateParams, User, $http) {
  	$http.get('index.php?ajax=1&controller=User&action=fetch&id='+$stateParams.id ).success(function(data) {
  		//console.debug(user);
      $scope.users = data;
    }); //Get 
  	 
	
  }])
  .controller('UserEditController', ['$scope' , '$state', '$stateParams', 'User', function($scope, $state, $stateParams, User) {
	  $scope.updateUser = function() { //Update the edited movie. Issues a PUT to /api/movies/:id
	    $scope.user.$update(function() {
	      $state.go('Users'); // on success go back to users i.e. Users state.
	    });
	  };
	 
	  $scope.loadUser = function() { //Issues a GET request 
	    $scope.user = User.get({ id: $stateParams.id });
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
  
