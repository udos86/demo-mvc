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
