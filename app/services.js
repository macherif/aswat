'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('Aswat.services', []).
  value('version', '0.1').
  value('name', 'ASWAT ASSESSMENT').
  factory('User', function($resource) {
  return $resource('index.php?ajax=1&controller=User&action=fetch&id=:id', { id: '@id' }, {
    update: {
      method: 'PUT'
    },
    get: {
    	method: 'JSON',
    	 isArray: true,
    	 interceptor: {
      response: function(response) {
        // expose response
        return response;
      }
    }
 	 }, query: { method: "GET", isArray: false }
  }
  );
}).factory('Categories', function($resource) {
  return $resource('index.php?ajax=1&controller=Category&action=fetch&id=:id', { id: '@id' }, {
    update: {
      method: 'PUT'
    },
    get: {
    	method: 'JSON',
    	 isArray: true,
    	 interceptor: {
      response: function(response) {
        // expose response
        return response;
      }
    }
 	 }, query: { method: "GET", isArray: false }
  }
  );
}).factory('Products', function($resource) {
  return $resource('index.php?ajax=1&controller=Product&action=fetch&id=:id', { id: '@id' }, {
    update: {
      method: 'PUT'
    },
    get: {
    	method: 'JSON',
    	 isArray: true,
    	 interceptor: {
      response: function(response) {
        // expose response
        return response;
      }
    }
 	 }, query: { method: "GET", isArray: false }
  }
  );
})
.service('modalService', ['$modal',
    function ($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'app/shared/partials/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                };
            }

            return $modal.open(tempModalDefaults).result;
        };

    }]);