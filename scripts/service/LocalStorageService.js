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
        }
    }]);

}(angular.module("app.module.main")));
