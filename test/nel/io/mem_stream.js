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

            describe("#write_UINT8()", function () {
                context("when not called with a number", function () {
                    it("should throw", function () {
                        var stream = new CMemStream();
                        expect(() => {
                            stream.write_UINT8("asdf");
                        }).to.throw(Error);
                    });
                });

                it("should add 1 byte to the stream", function () {
                    var stream = new CMemStream();

                    stream.write_UINT8(-1);
                    stream.write_UINT8(128);

                    expect(stream.toString()).to.equal(" ff 80>");
                });
            });
        });
    });
});
