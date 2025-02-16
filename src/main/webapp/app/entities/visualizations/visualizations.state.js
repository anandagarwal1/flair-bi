(function() {
    "use strict";

    angular.module("flairbiApp").config(stateConfig);

    stateConfig.$inject = ["$stateProvider", "PERMISSIONS"];

    function stateConfig($stateProvider, PERMISSIONS) {
        $stateProvider
            .state("visualizations", {
                parent: "entity",
                url: "/visualizations",
                data: {
                    authorities: [PERMISSIONS.READ_VISUALIZATIONS],
                    pageTitle: "flairbiApp.visualizations.home.title"
                },
                views: {
                    "content@": {
                        templateUrl:
                            "app/entities/visualizations/visualizations.html",
                        controller: "VisualizationsController",
                        controllerAs: "vm"
                    }
                },
                resolve: {
                    translatePartialLoader: [
                        "$translate",
                        "$translatePartialLoader",
                        function($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart("visualizations");
                            $translatePartialLoader.addPart("global");
                            return $translate.refresh();
                        }
                    ]
                }
            })
            .state("visualizations-detail", {
                parent: "entity",
                url: "/visualizations/{id}",
                data: {
                    authorities: [PERMISSIONS.READ_VISUALIZATIONS],
                    pageTitle: "flairbiApp.visualizations.detail.title"
                },
                views: {
                    "content@": {
                        templateUrl:
                            "app/entities/visualizations/visualizations-detail.html",
                        controller: "VisualizationsDetailController",
                        controllerAs: "vm"
                    }
                },
                resolve: {
                    translatePartialLoader: [
                        "$translate",
                        "$translatePartialLoader",
                        function($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart("visualizations");
                            $translatePartialLoader.addPart("fieldType");
                            $translatePartialLoader.addPart("propertyType");
                            return $translate.refresh();
                        }
                    ],
                    entity: [
                        "$stateParams",
                        "Visualizations",
                        function($stateParams, Visualizations) {
                            return Visualizations.get({
                                id: $stateParams.id
                            }).$promise;
                        }
                    ],
                    previousState: [
                        "$state",
                        function($state) {
                            var currentStateData = {
                                name: $state.current.name || "visualizations",
                                params: $state.params,
                                url: $state.href(
                                    $state.current.name,
                                    $state.params
                                )
                            };
                            return currentStateData;
                        }
                    ]
                }
            })
            .state("visualizations-detail.edit", {
                parent: "visualizations-detail",
                url: "/detail/edit",
                data: {
                    authorities: [PERMISSIONS.UPDATE_VISUALIZATIONS]
                },
                onEnter: [
                    "$stateParams",
                    "$state",
                    "$uibModal",
                    function($stateParams, $state, $uibModal) {
                        $uibModal
                            .open({
                                templateUrl:
                                    "app/entities/visualizations/visualizations-dialog.html",
                                controller: "VisualizationsDialogController",
                                controllerAs: "vm",
                                backdrop: "static",
                                size: "lg",
                                resolve: {
                                    entity: [
                                        "Visualizations",
                                        function(Visualizations) {
                                            return Visualizations.get({
                                                id: $stateParams.id
                                            }).$promise;
                                        }
                                    ]
                                }
                            })
                            .result.then(
                                function() {
                                    $state.go(
                                        "^",
                                        {},
                                        {
                                            reload: false
                                        }
                                    );
                                },
                                function() {
                                    $state.go("^");
                                }
                            );
                    }
                ]
            })
            .state("visualizations.new", {
                parent: "visualizations",
                url: "/new",
                data: {
                    authorities: [PERMISSIONS.WRITE_VISUALIZATIONS]
                },
                onEnter: [
                    "$stateParams",
                    "$state",
                    "$uibModal",
                    function($stateParams, $state, $uibModal) {
                        $uibModal
                            .open({
                                templateUrl:
                                    "app/entities/visualizations/visualizations-dialog.html",
                                controller: "VisualizationsDialogController",
                                controllerAs: "vm",
                                backdrop: "static",
                                size: "lg",
                                resolve: {
                                    entity: function() {
                                        return {
                                            name: null,
                                            icon: null,
                                            customId: null,
                                            functionname: null,
                                            id: null
                                        };
                                    }
                                }
                            })
                            .result.then(
                                function() {
                                    $state.go("visualizations", null, {
                                        reload: "visualizations"
                                    });
                                },
                                function() {
                                    $state.go("visualizations");
                                }
                            );
                    }
                ]
            })
            .state("visualizations.edit", {
                parent: "visualizations",
                url: "/{id}/edit",
                data: {
                    authorities: [PERMISSIONS.UPDATE_VISUALIZATIONS]
                },
                onEnter: [
                    "$stateParams",
                    "$state",
                    "$uibModal",
                    function($stateParams, $state, $uibModal) {
                        $uibModal
                            .open({
                                templateUrl:
                                    "app/entities/visualizations/visualizations-dialog.html",
                                controller: "VisualizationsDialogController",
                                controllerAs: "vm",
                                backdrop: "static",
                                size: "lg",
                                resolve: {
                                    entity: [
                                        "Visualizations",
                                        function(Visualizations) {
                                            return Visualizations.get({
                                                id: $stateParams.id
                                            }).$promise;
                                        }
                                    ]
                                }
                            })
                            .result.then(
                                function() {
                                    $state.go("visualizations", null, {
                                        reload: "visualizations"
                                    });
                                },
                                function() {
                                    $state.go("^");
                                }
                            );
                    }
                ]
            })
            .state("visualizations.delete", {
                parent: "visualizations",
                url: "/{id}/delete",
                data: {
                    authorities: [PERMISSIONS.DELETE_VISUALIZATIONS]
                },
                onEnter: [
                    "$stateParams",
                    "$state",
                    "$uibModal",
                    function($stateParams, $state, $uibModal) {
                        $uibModal
                            .open({
                                templateUrl:
                                    "app/entities/visualizations/visualizations-delete-dialog.html",
                                controller: "VisualizationsDeleteController",
                                controllerAs: "vm",
                                size: "md",
                                resolve: {
                                    entity: [
                                        "Visualizations",
                                        function(Visualizations) {
                                            return Visualizations.get({
                                                id: $stateParams.id
                                            }).$promise;
                                        }
                                    ]
                                }
                            })
                            .result.then(
                                function() {
                                    $state.go("visualizations", null, {
                                        reload: "visualizations"
                                    });
                                },
                                function() {
                                    $state.go("^");
                                }
                            );
                    }
                ]
            });
    }
})();
