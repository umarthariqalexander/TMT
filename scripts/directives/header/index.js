angular.module("tmt")
.directive("tmtHeader", function(){
    return {
        scope: {
            showMenu: '=',
            showFilter: '=',
            reloadPage: '=',
            openMenu: '&'
        },
        templateUrl: "./directives/header/index.htm"
    }
});