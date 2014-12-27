(function (module) {
    "use strict";

    module.constant("storageKey", "de.udos.notes");

    module.config(["$routeProvider", function ($routeProvider) {

        $routeProvider.when("/notes/:noteId", {
                templateUrl: "partials/noteView.html",
                controller: "noteViewController"
            }).
            otherwise({
                redirectTo: "/"
            });
    }]);

    module.run(["$log", function ($log) {

        if (window.localStorage === undefined || window.localStorage === null) {
            throw "No local storage available.";
        }

        if (DEBUG) {
            $log.debug("Module Main is running...");
        }
    }]);

}(angular.module("app.module.main", ["ngRoute"])));
