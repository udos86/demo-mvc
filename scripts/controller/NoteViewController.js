(function (module) {
    "use strict";

    module.controller("noteViewController", ["$scope", "$routeParams", "noteModel", function ($scope, $routeParams, model) {

        $scope.note = model.getItem("date", $routeParams.noteId);

        $scope.$emit("onNoteSelected", $scope.note);
    }]);

}(angular.module("app.module.main")));
