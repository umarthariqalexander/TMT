angular.module("tmt")
.directive("movieCard", function(){
    return{
        restrict: 'E',
        scope:{
            movieInfo:'='
        },
        link: function(scope, elem ,attr){
            // var movieRating = [{mark: 0}, {mark:0}, {mark: 0}, {mark: 0}, {mark: 0}];
            // var rating = scope.movieInfo.rating;
            // scope.movieRating = movieRating.map(function(ele){
            //     if(rating > 0){
            //         ele.mark = 1;
            //     }
            //     rating = rating-1;
            //     return ele;
            // });
        },
        templateUrl: "./directives/movieCard/index.htm"
    }
});