(function (module) {
    "use strict";

    function Note(title, text) {

        this.title = title || "";
        this.text = text || "";
        this.date = new Date().toJSON();
    }

    module.controller("MainPageController", ["$scope", "$route", "$routeParams", "noteModel", function ($scope, $route, $routeParams, model) {

        $scope.data = model.getData();

        $scope.selectedNote = null;

        $scope.noteFormTitle = "";

        $scope.noteFormText = "";

        $scope.noteOrderField = "-date";

        $scope.createNote = function () {

            var self = this,
                note = new Note(self.noteFormTitle, self.noteFormText);

            self.data = model.add(note);

            //$route.updateParams({"noteId": note.date});
        };

        $scope.deleteNote = function () {

            var self = this;


            if ($scope.selectedNote) {

                self.data = model.remove($scope.selectedNote);
                $route.updateParams({"noteId": null});
            }
        };

        $scope.showNote = function (/*note*/) {

            $("#panelArchive").panel("close");

            /*
            var self = $scope; //this.$parent

            if (note) {
                self.selectedNote = note;
            }
            */
        };

        $scope.openPopup = function ($event) {

            var popId;

            switch ($event.currentTarget.id){

                case "btnNoteForm":
                    popId = "popupNoteForm";
                    break;

                case "btnDeleteNote":
                    popId = "popupNoteDelete";
                    break;
            }

            $("#" + popId).popup( "open", {

                positionTo: "window",
                transition: "pop"
            });
        };

        $scope.$on("onNoteSelected", function (evt, data) {

            $scope.selectedNote = data;
        });

    }]);

}(angular.module("main")));
