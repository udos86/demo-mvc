(function () {
    "use strict";

    var module = angular.module("app.module.main");

    module.controller("noteViewController", ["$scope", "$routeParams", "noteModel", function ($scope, $routeParams, model) {

        $scope.note = model.getItem("date", $routeParams.noteId);

        $scope.$emit("onNoteSelected", $scope.note);
    }]);
}());
