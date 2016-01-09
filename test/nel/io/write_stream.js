import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.io.CWriteStream", function () {
    var CBuffer;
    var CWriteStream;
    var buffer;
    var stream;

    beforeEach("setup", function ( done ) {
        var imports = [
            "nel/io/buffer",
            "nel/io/write_stream"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CBuffer = modules[ 0 ].default;
                CWriteStream = modules[ 1 ].default;

                buffer = new CBuffer(8);
                stream = new CWriteStream(buffer);
            })
            .then(done, done);
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

            expect(buffer.toString()).to.equal("01 ff 00 00 00 00 00 00");
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

            expect(buffer.toString()).to.equal("ff 80 00 00 00 00 00 00");
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

            expect(buffer.toString()).to.equal("ff ff ff ff 01 00 00 00");
            expect(stream.pos).to.equal(8);
        });
    });
});
