angular.module('bikeService', [])

.provider('Storage', function() {

  this.$get = ['$http', 'localStorageService', 'uuid2', function($http, localStorageService, uuid2){

      return({
        setUser: setUser,
        getUserId: getUserId
      });

      function setUserId() {
        var userId = uuid2.newuuid();
        return userId;
      }

      function setUser() {

        if(localStorageService.get('user'))
          console.log('exists');
        else
          localStorageService.set( 'user',  setUserId() );
      }

      function getUserId() {
        return localStorageService.get('user');
      }

  }];

})

.provider('Bike', function() {

  this.$get = ['$q', '$http', function($q, $http) {

    	//Public functions
      return({
        getBikes: getBikes,
        getCoords: getCoordinates,
        postFav: postFavourite,
        getFav: getFavourites
      });

      function getCoordinates() {

        var deferred = $q.defer();

        navigator.geolocation.getCurrentPosition(function(data) {
          deferred.resolve(data);
        });

        return deferred.promise;

      }

      function getBikes(lat, long, rad) {

        var deferred = $q.defer();

  			$http({
  				method: 'POST',
  				url: 'server/post_db.php',
          data: { lat: lat, long: long, rad: rad }
  			}).success(function(data) {
  				deferred.resolve(data);
  			}).error(function(msg, code) {
  				deferred.reject(msg);
  				console.log(code);
  			});

  			return deferred.promise;

      }

      //Favourite stations
      function postFavourite(statId, userId) {

        var deferred = $q.defer();

        $http({
          method: 'POST',
          url: 'server/post_favourite.php',
          data: { stationsId: statId, userId: userId }
        }).success(function(data) {
          deferred.resolve(data);
        }).error(function(msg, code) {
          deferred.reject(msg + ' ' + code);
        });

        return deferred.promise;

      }

      function getFavourites(userId) {

        var deferred = $q.defer();

        $http({
          method: 'POST',
          url: 'server/get_favourites.php',
          data: { userId: userId }
        }).success(function(data) {
          deferred.resolve(data);
        }).error(function(msg, code) {
          deferred.reject(msg + ' ' + code);
        });

        return deferred.promise;

      }


  }];

});
