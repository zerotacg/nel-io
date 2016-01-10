import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.io.CWriteStream", function () {
    var CBuffer;
    var CWriteStream;

    before("imports", function ( done ) {
        var imports = [
            "nel/io/buffer",
            "nel/io/write_stream"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CBuffer = modules[ 0 ].default;
                CWriteStream = modules[ 1 ].default;
            })
            .then(done, done);
    });

    var buffer;
    var stream;

    beforeEach("setup", function () {
        buffer = CBuffer.create(8);
        stream = new CWriteStream(buffer);
    });

    describe("#write()", function () {
        it("should write given object", function () {
            var serializable = {
                writeTo: function ( stream ) {
                    stream.writeUint8(1);
                    stream.writeUint8(-1);
                }
            };

            stream.write(serializable);

            expect(buffer.toString()).to.equal("01ff0000 00000000");
        });
    });

    describe("#writeUint8()", function () {
        context("when not called with a number", function () {
            it("should throw", function () {
                expect(() => {
                    stream.writeUint8("string value");
                }).to.throw("AssertionError: typeof(value) === 'number'");
            });
        });

        it("should add 1 byte to the stream", function () {
            stream.writeUint8(-1);
            stream.writeUint8(128);

            expect(buffer.toString()).to.equal("ff800000 00000000");
            expect(stream.pos).to.equal(2);
        });
    });

    describe("#writeUint32()", function () {
        context("when not called with a number", function () {
            it("should throw", function () {
                expect(() => {
                    stream.writeUint32("string value");
                }).to.throw("AssertionError: typeof(value) === 'number'");
            });
        });

        it("should add 4 bytes to the stream", function () {
            stream.writeUint32(-1);
            stream.writeUint32(1);

            expect(buffer.toString()).to.equal("ffffffff 01000000");
            expect(stream.pos).to.equal(8);
        });
    });

    describe("#writeString()", function () {
        it("should write the length and the bytes", function () {
            var value = "test";
            stream.writeString(value);

            expect(buffer.toString()).to.equal("04000000 " + value);
            expect(stream.pos).to.equal(4 + value.length);
        });
    });

    describe("#writeVersion()", function () {
        context("when the version is below 255", function () {
            it("should write 1 byte ", function () {
                stream.writeVersion(0x01);
                stream.writeVersion(0xFE);

                expect(buffer.toString()).to.equal("01fe0000 00000000");
            });
        });

        context("when the version is 255", function () {
            it("should write 1 byte 0xFF and 4 bytes version", function () {
                stream.writeVersion(0xFF);

                expect(buffer.toString()).to.equal("ffff0000 00000000");
            });
        });

        context("when the version is above 255", function () {
            it("should write 1 byte 0xFF and 4 bytes version", function () {
                stream.writeVersion(0xDEADC0DE);

                expect(buffer.toString()).to.equal("ffdec0ad de000000");
            });
        });
    });
});
