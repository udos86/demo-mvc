(function (ns){
    "use strict";

    describe("a simple end-to-end test suite for notes app", function () {

        beforeEach(function() {
            browser.get("http://localhost:63342/v6ng/index.html#/");
        });

        it("should have a title", function() {
            expect(browser.getTitle()).toEqual("Notiz App");
        });

        it("should have a title", function() {
            var list = element.all(by.css('#listArchive li'));
            expect(list.count()).toBe(1);
        });
    });

}());