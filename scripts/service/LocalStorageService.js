(function (module) {
    "use strict";

    module.factory("localStorage", [function () {

        var localStorage = window.localStorage;

        function setObject (key, obj) {
            localStorage.setItem(key, angular.toJson(obj));
        }

        function getObject (key) {
            var json = localStorage.getItem(key);
            return json && angular.fromJson(json);
        }

        return {

            read: function (key) {
                return getObject(key) || [];
            },

            write: function (key, data) {
                setObject(key, data);
            }
        }
    }]);

}(angular.module("app.module.main")));
