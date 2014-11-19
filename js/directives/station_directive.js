angular.module('stationsDirective', [])

.directive('availableBikes', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if(!scope.station.AvailableBikes) {
        scope.AvailableBikes = scope.station.BikeStands - scope.station.AvailableBikeStands;
      }
      else {
        scope.AvailableBikes = scope.station.AvailableBikes;
      }
    }
  };

})

.directive('scrollTop', function() {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('click', function() {

        $("html, body").animate({
          scrollTop: 0
        }, 600);

        var winHeight = $(window).height(),
            menuHeight = $('.menu-wrap').height(),
            mapHeight = winHeight - menuHeight;

        $('.nearby-map').css('height', mapHeight);
        $('.nearby-map').css('padding-bottom', '15px');

      });
    }
  };

})

.directive('mapWrap', function() {

    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        var winHeight = $(window).height(),
            menuHeight = $('.menu-wrap').height(),
            mapHeight = winHeight - menuHeight;

        $(element).css('height', mapHeight);
        $(element).css('padding-bottom', '15px');

      }
    };

});
