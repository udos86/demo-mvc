(function (module) {
    "use strict";

    module.constant("storageKey", "de.udos.notes");

    module.config(["$logProvider", "$routeProvider", function ($logProvider, $routeProvider) {

        $logProvider.debugEnabled(DEBUG); // DEBUG globally defined in uglify grunt task

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
