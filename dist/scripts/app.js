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

(function (module) {
    "use strict";

    function Note(title, text) {

        this.title = title || "";
        this.text = text || "";
        this.date = new Date().toJSON();
    }

    module.controller("mainPageController", ["$scope", "$route", "$routeParams", "noteModel", function ($scope, $route, $routeParams, model) {

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

}(angular.module("app.module.main")));

(function (module) {
    "use strict";

    module.controller("noteViewController", ["$scope", "$routeParams", "noteModel", function ($scope, $routeParams, model) {

        $scope.note = model.getItem("date", $routeParams.noteId);

        $scope.$emit("onNoteSelected", $scope.note);
    }]);

}(angular.module("app.module.main")));

(function (module) {
    "use strict";

    module.factory("noteModel", ["localStorage", "storageKey", function (localStorage, storageKey) {

        var self = this;

        self.data = localStorage.read(storageKey);

        return {

            getData: function () {
                return self.data.slice();
            },

            getItem: function (field, value) {

                var l = self.data.length,
                    item = null,
                    curr,
                    i;

                for (i = 0; i < l; i += 1) {
                    curr = self.data[i];

                    if (curr[field] === value) {
                        item = curr;
                    }
                }

                return item;
            },

            add: function (item) {

                self.data.push(item);
                localStorage.write(storageKey, self.data);

                return self.data.slice();
            },

            remove: function (item) {

                self.data.splice(self.data.indexOf(item), 1);
                localStorage.write(storageKey, self.data);

                return self.data.slice();
            }
        };
    }]);

}(angular.module("app.module.main")));

(function (module) {
    "use strict";

    module.factory("localStorage", [function () {

        var localStorage = window.localStorage;

        function set (key, obj) {
            localStorage.setItem(key, angular.toJson(obj));
        }

        function get (key) {
            var json = localStorage.getItem(key);
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

}(angular.module("app.module.main")));
