(function () {
    "use strict";

    var module = angular.module("app.module.main");

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
}());
