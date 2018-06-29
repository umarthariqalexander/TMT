angular.module('tmt')
.directive('mobileMenu', function($location){
    return {
        scope: {
            showMenu: '=',
            hideMenu: '='
        },
        link: function(scope, attr, elem){
            scope.currentPath = $location.path();
        },
        templateUrl: "./directives/mobileMenu/index.htm"
    }
});