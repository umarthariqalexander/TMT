var app = angular.module("tmt", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "pages/main.htm"
    })
    .when("/admin", {
        templateUrl: "pages/admin.htm"
    })
});

