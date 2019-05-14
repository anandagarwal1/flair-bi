(function () {
    'use strict';

    angular
        .module('flairbiApp')
        .component('notificationSetComponent', {
            templateUrl: 'app/home/notification-set.component.html',
            controller: notificationSetController,
            controllerAs: 'vm'
        });

    notificationSetController.$inject = ['$scope', '$state','alertsService','stompClientService','AuthServerProvider'];

    function notificationSetController($scope, $state,alertsService,stompClientService,AuthServerProvider) {
        var vm = this;
        //vm.toggleNotifications=toggleNotifications;
        // vm.pageSize = 5;
        // vm.setPage = setPage;
        // vm.nextPage = nextPage;
        // vm.prevPage = prevPage;
        // vm.range = range;
        // vm.noOfPages = 1;
        // vm.currentPage = 0;
        //vm.isMsgVisible=vm.releaseAlert.id==1?true:false;

        active();

        function active(){
            // vm.alerts=vm.releaseAlert.alerts;
            // vm.count=vm.releaseAlert.count;
            // vm.noOfPages=Math.ceil(vm.count/vm.pageSize);
            connectWebSocket();
        }
        
        // function toggleNotifications(){
        //     vm.isMsgVisible=!vm.isMsgVisible;
        // }

        // function getReleasedAlerts(id,offset){
        //     alertsService.getReleaseAlerts(id,offset).then(function(result){
        //         vm.alerts=result.data;
        //     }, onGetReleaseAlertsError);
        // }

        // function onGetReleaseAlertsError(error){

        // }

        // function getReleasedAlertsCount(id){
        //     alertsService.getReleaseAlertsCount(id).then(onGetReleaseAlertsCountSuccess, onGetReleaseAlertsCountError);
        // }

        // function onGetReleaseAlertsCountSuccess(result){
        //     vm.count=result.data;
        //     vm.noOfPages=Math.ceil(vm.count/vm.pageSize);
        // }

        // function onGetReleaseAlertsCountError(error){
        //     console.log("error"+error);
        // }

 
        // function range(start, end) {
        //     var ret = [];
        //     if (!end) {
        //         end = start;
        //         start = 0;
        //     }
        //     for (var i = start; i < end; i++) {
        //         ret.push(i);
        //     }
        //     return ret;
        // };

        // function prevPage() {
        //     if (vm.currentPage > 0) {
        //         vm.currentPage--;
        //         getReleasedAlerts(vm.releaseAlert.id,vm.pageSize*(vm.currentPage+1)-vm.pageSize);
        //     }
        // };

        // function nextPage() {
        //     if (vm.currentPage < vm.noOfPages-1) {
        //         vm.currentPage++;
        //         getReleasedAlerts(vm.releaseAlert.id,vm.pageSize*(vm.currentPage+1)-vm.pageSize);
        //     }
        // };

        // function setPage(n) {
        //     vm.currentPage = n;
        //     getReleasedAlerts(vm.releaseAlert.id,vm.pageSize*(vm.currentPage+1)-vm.pageSize);
        // };
        function connectWebSocket() {
            console.log('notificationSetController connect web socket');
            stompClientService.connect(
                { token: AuthServerProvider.getToken() },
                function(frame) {
                    console.log('notificationSetController connected web socket');
                    stompClientService.subscribe("/user/exchange/scheduledReports", onExchangeMetadata);
                    stompClientService.subscribe("/user/exchange/metaDataError", onExchangeMetadataError);
                }
            );

            $scope.$on("$destroy", function (event) {
                console.log('flair-bi controller destorying web socket');
                stompClientService.disconnect();
            });
        }

        function onExchangeMetadataError(data) {
            console.log('notificationSetController on metadata error', data);
        }

        function onExchangeMetadata(data) {
            console.log('notificationSetController on metadata', data);
            var metaData = JSON.parse(data.body);
        }


    }
})();
