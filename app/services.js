'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('Aswat.services', []).
  value('version', '0.1').
  value('name', 'ASWAT ASSESSMENT').
  factory('User', function($resource) {
  return $resource('index.php?ajax=1&controller=User&action=fetch&id=:id', { id: '@_id' }, {
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
      },
    query: {isArray:false}
  }
  }
  );
});