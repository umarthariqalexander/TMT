angular.module("tmt")
    .controller("mainCtrl", function ($scope, $http) {
        $scope.movie = {};
        $scope.default_keys = {
            youtube_data_api_key: 'AIzaSyCx1clO_m-n5RrM4kWHmlhhEFdYNeDv6Js',
            omdb_api_key: 'PlzBanMe'
        }
        $scope.movieList = {};
        $scope.movieForm = {};
        $scope.getMovieList = function () {
            $http.get('/getMovieList').then(function (response) {
                $scope.movieList = response.data;
            });
        };
        $scope.getMovieList();
        $scope.getVideo = function () {
            if ($scope.movie.videoUrl) {
                $scope.movie.fullVideoUrl = "https://www.youtube.com/embed/" + $scope.movie.videoUrl;
            }
        };
        $scope.hitImdbAPI = function () {
            if ($scope.movie.imdbUrl) {
                var imdb_api_key = $scope.default_keys.omdb_api_key;
                var imdb_api_url = `http://www.omdbapi.com/?i=${$scope.movie.imdbUrl}&apikey=${imdb_api_key}`;
                $http.get(imdb_api_url).then(function (response) {
                    console.log(response);
                    $scope.movie.posterUrl = response.data.Poster;
                    $scope.movie.name = response.data.Title;
                    $scope.movie.rating = response.data.imdbRating;
                    $scope.movie.year = response.data.Year;
                    $scope.movie.actors = response.data.Actors;
                    $scope.movie.director = response.data.Director;
                });
            }
        };
        $scope.addNewMovie = function () {
            let movieForm = $scope.movieForm.movieRecordInputForm;
            if (movieForm.$valid) {
                let rating = $scope.movie.rating;
                if (!$scope.movie.rating) {
                    rating = 0;
                }
                var movieObject = {
                    urlId: $scope.movie.videoUrl,
                    movieName: $scope.movie.name,
                    actors: $scope.movie.actors,
                    rating: rating,
                    director: $scope.movie.director,
                    year: $scope.movie.year,
                    posterUrl: $scope.movie.posterUrl
                }
                let data = movieObject;
                console.log(data);
                $http.post('/insert', data).then(function (response) {
                    console.log(response);
                });
                $scope.movie = {};
            };
        };
    });