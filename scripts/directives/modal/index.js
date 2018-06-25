angular.module('tmt')
.directive('modal',function(){
    return {
        restrict: 'E',
        scope:{
            showModal: '=',
            extraClass: '=',
            yearList: '=',
            applyFilter: '=',
            movieFilters: '=',
            closeModal: '&'
        },
        templateUrl: "./directives/modal/index.htm",
        link: function(scope, elem, attr, parentCtrl){
            // scope.$watch('showModal', function(value){
            //     console.log(value);
            // });
        }
    }
});