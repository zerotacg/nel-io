import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel", function () {
    describe("io", function () {
        describe("CMemStream", function () {
            var CMemStream;

            beforeEach("setup", function ( done ) {
                var imports = [
                    "nel/io/mem_stream"
                ];
                Promise.all(imports.map(path => System.import(path)))
                    .then(modules => {
                        CMemStream = modules[ 0 ].default;
                    })
                    .then(done, done);
            });

            it("should exist", function () {
                expect(CMemStream).to.be.ok;
            });
        });
    });
});
