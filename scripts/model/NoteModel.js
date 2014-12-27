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
                        break;
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
