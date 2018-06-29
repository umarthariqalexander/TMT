angular.module("tmt")
.directive("movieCard", ['$interval', function($interval){
    var getViewPortWidthRadius = function(){
        if(window.outerWidth > 319 && window.outerWidth < 481){
            return 25;
        }
        else 
            return 17;
    }
    var getAnimationTime = function(){
        if(window.outerWidth > 319 && window.outerWidth < 481){
            return 0;
        }
        else 
            return 1/10;
    }
    var createCircle = function(scope){
        if(document.getElementById('circle-'+scope.index)){
            circle = Circles.create({
                id:                  'circle-'+scope.index,
                radius:              getViewPortWidthRadius(),
                value:               scope.movieInfo.rating * 10,
                maxValue:            100,
                width:               2,
                text:                function(value){return value/10;},
                colors:              ['#DEDEDE', '#50C878'],
                duration:            getAnimationTime(),
                wrpClass:            'circles-wrp',
                textClass:           'circles-text',
                valueStrokeClass:    'circles-valueStroke',
                maxValueStrokeClass: 'circles-maxValueStroke',
                styleWrapper:        true,
                styleText:           true
              });
            $interval.cancel(scope.promise);
        }
    }
    return{
        restrict: 'E',
        scope:{
            movieInfo:'=',
            index: '='
        },
        link: function(scope, elem ,attr){
           scope.promise = $interval(function(){
               createCircle(scope);
            }, 0);
        },
        templateUrl: "./directives/movieCard/index.htm"
    }
}]);