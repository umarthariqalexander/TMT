angular.module("tmt")
.directive("tmtHeader", function(){
    return {
        scope: {
            showMenu: '=',
            showFilter: '=',
            openMenu: '&'
        },
        templateUrl: "./directives/header/index.htm"
    }
});