(function (module) {
    "use strict";

    module.constant("DEBUG", true);
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

    module.run(["$log", "DEBUG", function ($log, DEBUG) {

        if (window.localStorage === undefined || window.localStorage === null) {
            throw "No local storage available.";
        }

        if (DEBUG) {
            $log.log("Module Main is running...");
        }
    }]);

}(angular.module("app.module.main", ["ngRoute"])));
