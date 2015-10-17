(function (module) {
    "use strict";

    module.constant("storageKey", "de.udos.notes");

    module.config(["$logProvider", "$routeProvider", function ($logProvider, $routeProvider) {

        $logProvider.debugEnabled(true); // im produktiven Einsatz deaktivieren

        $routeProvider.when("/notes/:noteId", {
                templateUrl: "partials/noteView.html",
                controller: "NoteViewController"
            }).
            otherwise({
                redirectTo: "/"
            });
    }]);

    module.run(["$log", function ($log) {

        $log.debug("Module Main is running...");
    }]);

}(angular.module("main", ["ngRoute"])));
