angular.module('tmt')
.directive('modal',function(){
    return {
        restrict: 'E',
        scope:{
            extraClass: '=',
            yearList: '=',
            applyFilter: '=',
            movieFilters: '=',
            closeModal: '='
        },
        templateUrl: "./directives/modal/index.htm",
        link: function(scope, elem, attr, parentCtrl){
            // scope.applyMobileFilter = function(item, filterType){
            //     scope.applyFilter(item, filterType);
            // }
            debugger;
        }
    }
});