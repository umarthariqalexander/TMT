angular.module("tmt")
.controller("mainCtrl", function($scope, $http){
    $scope.movie = {};
    $scope.default_keys = {
        youtube_data_api_key : 'AIzaSyCx1clO_m-n5RrM4kWHmlhhEFdYNeDv6Js',
        omdb_api_key: 'PlzBanMe'
    }
    $scope.movieForm = {};
    $scope.insertMovieRecord = function(){
        let movieForm = $scope.movieForm.movieRecordInputForm;
        if(movieForm.$valid){
            let certificate = $scope.movie.certificate;
            if(!$scope.movie.certificate){
                certificate = '-';
            }
            let rating = $scope.movie.rating;
            if(!$scope.movie.rating){
                rating = 0;
            }
            var movieObject = {
            urlId: $scope.movie.urlId,
            movieName: $scope.movie.name,
            actor: $scope.movie.actor,
            actress: $scope.movie.actress,
            rating: rating,
            certificate: certificate
        }
        let data = movieObject;
        $http.post('/insert', data).then(function(response){
            console.log(response);
        });
        $scope.movie = {};
        };
    };
    $scope.checkVideoExistance = function(){
        if($scope.movie.videoUrl){
            $scope.movie.fullVideoUrl = "https://www.youtube.com/embed/"+$scope.movie.videoUrl;
        }
    };
    $scope.hitImdbAPI = function(){
        if($scope.movie.imdbUrl){
            var imdb_api_key = $scope.default_keys.omdb_api_key;
            var imdb_api_url = `http://www.omdbapi.com/?i=${$scope.movie.imdbUrl}&apikey=${imdb_api_key}`;
            $http.get(imdb_api_url).then(function(response){
                console.log(response);
                $scope.movie.posterUrl = response.data.Poster;
                $scope.movie.name = response.data.Title;
                $scope.movie.rating = response.data.imdbRating;
                $scope.movie.year = response.data.Year;
                $scope.movie.director = response.data.Director;
            });
        }
    }
});