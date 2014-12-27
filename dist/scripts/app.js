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

(function (module) {
    "use strict";

    module.controller("NoteViewController", ["$scope", "$routeParams", "noteModel", function ($scope, $routeParams, model) {

        $scope.note = model.getItem("date", $routeParams.noteId);

        $scope.$emit("onNoteSelected", $scope.note);
    }]);

}(angular.module("main")));

(function (module) {
    "use strict";

    module.factory("noteModel", ["localStorage", "storageKey", function (localStorage, storageKey) {

        var data = localStorage.read(storageKey);

        return {

            getData: function () {
                return data.slice();
            },

            getItem: function (field, value) {

                var l = data.length,
                    item = null,
                    curr,
                    i;

                for (i = 0; i < l; i += 1) {
                    curr = data[i];

                    if (curr[field] === value) {
                        item = curr;
                    }
                }

                return item;
            },

            add: function (item) {

                data.push(item);
                localStorage.write(storageKey, data);

                return data.slice();
            },

            remove: function (item) {

                data.splice(data.indexOf(item), 1);
                localStorage.write(storageKey, data);

                return data.slice();
            }
        };
    }]);

}(angular.module("main")));

(function (module) {
    "use strict";

    module.factory("localStorage", [function () {

        var storage;

        if (window.localStorage) {
            storage = window.localStorage;

        } else {
            throw "No local storage available.";
        }

        function set (key, obj) {
            storage.setItem(key, angular.toJson(obj));
        }

        function get (key) {
            var json = storage.getItem(key);
            return json && angular.fromJson(json);
        }

        return {

            read: function (key) {
                return get(key) || [];
            },

            write: function (key, data) {
                set(key, data);
            }
        };
    }]);

}(angular.module("main")));
