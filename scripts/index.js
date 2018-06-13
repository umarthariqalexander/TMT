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

angular.module("tmt").filter('trustThisUrl', ["$sce", function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);