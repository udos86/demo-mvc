(function (module) {
    "use strict";

    module.factory("noteFactory", [function () {

        function Note(title, text) {

            this.title = title || "";
            this.text = text || "";
            this.date = new Date().toJSON();
        }

        return {

            create: function (title, text) {
                return new Note(title, text);
            }
        };
    }]);

}(angular.module("main")));
