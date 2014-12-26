(function (){
    "use strict";

    describe("a simple test suite for notes app", function () {

        beforeEach(module("app.module.main"));

        it("tests if local storage service works correctly", inject(["localStorage", function (localStorage) {
            expect(localStorage.read("").length).toBe(0);
        }]));
    });

}());