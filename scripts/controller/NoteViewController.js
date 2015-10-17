(function (module) {
    "use strict";

    module.controller("NoteViewController", ["$scope", "$routeParams", "noteModel",
        function ($scope, $routeParams, model) {

            $scope.note = model.getItem("date", $routeParams.noteId);

            $scope.$emit("onNoteSelected", $scope.note);
        }]);

}(angular.module("main")));
