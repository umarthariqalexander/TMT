angular.module("tmt")
    .controller("mainCtrl", ["$scope", "$http", "$window", function ($scope, $http, $window) {
        $scope.movie = {};
        $scope.default_keys = {
            youtube_data_api_key: 'AIzaSyCx1clO_m-n5RrM4kWHmlhhEFdYNeDv6Js',
            omdb_api_key: '1d4b640d'
        }
        $scope.movieList = {};
        $scope.movieForm = {};
        $scope.urlToDelete = {};
        $scope.showMobileLeftMenu = false;
        $scope.movieFilters = [
            {desc: 'rating - high to low', filterId: 'RATING_HIGH_TO_LOW'}, 
            {desc: 'rating - low to high', filterId: 'RATING_LOW_TO_HIGH'},
            // {desc: 'year - latest to old', filterId: 'LATEST_TO_OLD'},
            // {desc: 'year - old to latest', filterId: 'OLD_TO_LATEST'}
        ];
        $scope.movieListQueries = {
            sort: {},
            filter: {}
        };
        $scope.filter = {
            selectedYearFilter: '',
            selectedFilter: ''
        };
        $scope.yearList = [2011,2012,2013,2014,2015,2016,2017,2018];
        $scope.getMovieList = function () {
            $scope.movieList = [];
            $scope.showLoader = true;
            $http.get('/getMovieList').then(function (response) {
                $scope.movieList = response.data;
                $scope.showLoader = false;
            });
        };
        $scope.openModal = function(){
            $scope.showModal = true;
        };
        $scope.closeModal = function(){
            $scope.showModal = false;
        };
        $scope.reloadPage = function(){
            $scope.filter = {
                selectedYearFilter: '',
                selectedFilter: ''
            };
            $scope.movieListQueries = {
                filter: '',
                sort: ''
            }
            $scope.getMovieList();
        };
        $scope.getMovieList();
        $scope.getVideo = function () {
            if ($scope.movie.videoUrl) {
                $scope.movie.fullVideoUrl = "https://www.youtube.com/embed/" + $scope.movie.videoUrl;
            }
        };
        $scope.openMobileLeftMenu = function(){
            $scope.showMobileLeftMenu = true;
        };
        $scope.closeMobileLeftMenu = function(){
            $scope.showMobileLeftMenu = false;
        };
        $scope.applyFilter = function(item, filterType){
            if(item){
                if(filterType === 'RIGHT_FILTER'){
                    switch(item){
                        case 'RATING_HIGH_TO_LOW':
                        $scope.movieListQueries.sort = {rating : -1};
                            break;
                        case 'RATING_LOW_TO_HIGH':
                        $scope.movieListQueries.sort = {rating : 1};
                            break;
                        case 'LATEST_TO_OLD':
                        $scope.movieListQueries.sort = {year: -1};
                            break;
                        case 'OLD_TO_LATEST':
                        $scope.movieListQueries.sort = {year: 1};
                            break;
                        default:
                        $scope.movieListQueries.sort = {};
                    }
                    $scope.filter.selectedFilter = item;
                }
                else if(filterType === 'LEFT_FILTER' && item) {
                    $scope.movieListQueries.filter = {year: item};
                    $scope.filter.selectedYearFilter = item;
                }
                $scope.movieList = [];
                $scope.showLoader = true;
                $http.get('/getMovieList', {params: $scope.movieListQueries} ).then(function (response) {
                    $scope.movieList = response.data;
                    $scope.showLoader = false;
                });
            }
        };
        $scope.hitImdbAPI = function () {
            if ($scope.movie.imdbUrl) {
                var imdb_api_key = $scope.default_keys.omdb_api_key;
                var imdb_api_url = `http://www.omdbapi.com/?i=${$scope.movie.imdbUrl}&apikey=${imdb_api_key}`;
                $http.get(imdb_api_url).then(function (response) {
                    console.log(response);
                    $scope.movie.name = response.data.Title;
                    $scope.movie.year = response.data.Year;
                    $scope.movie.genre = response.data.Genre;
                    $scope.movie.director = response.data.Director;
                    $scope.movie.actors = response.data.Actors;
                    $scope.movie.posterUrl = response.data.Poster;
                    $scope.movie.rating = response.data.imdbRating;
                    $scope.movie.imdbID = response.data.imdbID;
                    $scope.movie.boxOffice = response.data.BoxOffice;
                    $scope.movie.production = response.data.Production;
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
                    posterUrl: $scope.movie.posterUrl,
                    genre: $scope.movie.genre,
                    imdbID: $scope.movie.imdbID,
                    production: $scope.movie.production,
                    boxOffice: $scope.movie.boxOffice
                }
                let data = movieObject;
                console.log(data);
                $http.post('/insertMovie', data).then(function (response) {
                    console.log(response);
                    $scope.getMovieList();
                });
                $scope.movie = {};
            };
        };
        $scope.deleteMovie = function(url){
            var result = prompt("Enter the password to delete this movie.", "");
            if(result && result === 'tmt123'){
                $http({
                    method: 'DELETE',
                    url: '/deleteMovie',
                    data: {
                        url: url
                    },
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    }
                })
                .then(function(response) {
                    if(response.data.n > 0){
                        document.getElementById('resultOfDeleteOperation').innerHTML = '<span style="color: green;">'+response.data.n+' record has been deleted successfully</span>';
                        $scope.getMovieList();
                    }
                    else{
                        document.getElementById('resultOfDeleteOperation').innerHTML = '<span style="color: orange;">'+response.data.n+' record has been deleted</span>';
                    }
                });
            }
            else{
                document.getElementById('resultOfDeleteOperation').innerHTML = '<span style="color: orange;">Invalid Password. You cant perform this operation</span>';
            }
        };
    }]);