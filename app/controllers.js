'use strict';

/* Controllers */

angular.module('Aswat.controllers', []).
  controller('Home', [function() {
	
  }])
  .controller('Products', [function() {

  }])
  .controller('Categories', [function() {

  }])
  .controller('Roles', [function() {

  }])
  .controller('Images', [function() {

  }])
  .controller('Users', [function() {

  }])
  .controller('Credential', ['$scope', '$http', '$location',function($scope, $http, $location) {
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
					}
                });
            };

            $scope.onFileSelect = function ($files) {
                $scope.uploadProgress = 0;
                $scope.selectedFile = $files;
            };

  }])
  .controller('Order', [function() {

  }]);