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
	$scope.getCredential = function () { alert($scope.username);
	 $scope.dataLoading = true;
		var responsePromise = $http.post(
			'index.php?ajax=1&controller=user&action=authentication' ,
			 {'username' : $scope.username,
			 		'password' : $scope.password}
			  );
		responsePromise.success(function(data, status, headers, config) {
                    $scope.myData.fromServer = data.title;
                });
       	 responsePromise.error(function(data, status, headers, config) {
                    alert("AJAX failed!");
                });
 	};
  }])
  .controller('Order', [function() {

  }]);