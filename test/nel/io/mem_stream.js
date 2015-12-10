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

            describe("#serialize_UINT8()", function () {
                context("when not called with a number", function () {
                    it("should throw", function () {
                        var stream = new CMemStream();
                        expect(() => {
                            stream.serialize_UINT8("asdf");
                        }).to.throw(Error);
                    });
                });

                it("should add 1 byte to the stream", function () {
                    var stream = new CMemStream();

                    stream.serialize_UINT8({ value: -1 }, "value");
                    stream.serialize_UINT8({ value: 128 }, "value");

                    expect(stream.toString()).to.equal(" ff 80>");
                });
            });

            describe("#serialize()", function () {
                it("should write given object", function () {
                    var stream = new CMemStream();
                    var serializable = {
                        version: 1,

                        value: -1,

                        serialize: function ( stream ) {
                            stream.serialize_UINT8(this, "version");

                            // if reading and version does not match throw error

                            stream.serialize_UINT8(this, "value");
                        },

                        writeTo: function ( stream ) {
                            stream.write_UINT8(this.version);
                            stream.write_UINT8(this.value);
                        },

                        readFrom: function ( stream ) {
                            this.version = stream.read_UINT8();
                            // if version is not supported throw
                            this.value = stream.read_UINT8();
                        }
                    };

                    stream.serialize(serializable);

                    expect(stream.toString()).to.equal(" 01 ff>");
                });
            });
        });
    });
});
