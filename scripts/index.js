var app = angular.module("tmt", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "pages/main.htm"
    })
    .when("/admin", {
        templateUrl: "pages/admin.htm"
    })
    .when("/about", {
        templateUrl: "pages/about.htm"
    })
});

angular.module("tmt").filter('trustThisUrl', ["$sce", function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);