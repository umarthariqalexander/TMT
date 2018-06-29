angular.module("tmt")
.directive("tmtHeader", function(){
    return {
        scope: {
            showMenu: '=',
            showFilter: '=',
            reloadPage: '=',
            openMenu: '&',
            showModel:'='
        },
        link: function(scope, attr, elem){
            console.log(scope);
        },
        templateUrl: "./directives/header/index.htm"
    }
});