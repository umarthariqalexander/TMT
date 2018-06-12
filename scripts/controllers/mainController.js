angular.module("tmt")
.controller("mainCtrl", function($scope, $http){
    $scope.movieObject = [{
        id:'iBnGsPqI5x8',
        movieName: 'Anwar',
        rating: 3,
        actor: 'Siddharth Koirala',
        actress: 'Nauheed Cyrusi.',
        certificate: 'U/A'
    },{
        movieName: 'Anwar',
        rating: 2,
        actor: 'Siddharth Koirala',
        actress: 'Nauheed Cyrusi.',
        certificate: 'U/A'
    },{
        movieName: 'Anwar',
        rating: 5,
        actor: 'Siddharth Koirala',
        actress: 'Nauheed Cyrusi.',
        certificate: 'U/A'
    },{
        movieName: 'Anwar',
        rating: 1,
        actor: 'Siddharth Koirala',
        actress: 'Nauheed Cyrusi.',
        certificate: 'U/A'
    },{
        movieName: 'Anwar',
        rating: 4,
        actor: 'Siddharth Koirala',
        actress: 'Nauheed Cyrusi.',
        certificate: 'U/A'
    },{
        movieName: 'Anwar',
        rating: 4,
        actor: 'Siddharth Koirala',
        actress: 'Nauheed Cyrusi.',
        certificate: 'U/A'
    },{
        movieName: 'Anwar',
        rating: 2,
        actor: 'Siddharth Koirala',
        actress: 'Nauheed Cyrusi.',
        certificate: 'U/A'
    },{
        movieName: 'Anwar',
        rating: 5,
        actor: 'Siddharth Koirala',
        actress: 'Nauheed Cyrusi.',
        certificate: 'U/A'
    }];
    $scope.movie = "something for movie";
    $scope.movie = {};
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
            movieName: $scope.movie.name,
            actor: $scope.movie.actor,
            actress: $scope.movie.actress,
            rating: rating,
            certificate: certificate
        }
        let data = movieObject;
        // $http.post('/insert', data).then(function(response){
        //     console.log(response);
        // });
        $scope.movie = {};
        }
        
        
    };
});