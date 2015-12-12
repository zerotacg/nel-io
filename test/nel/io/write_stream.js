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

                buffer = new CBuffer(2);
                stream = new CWriteStream(buffer);
            })
            .then(done, done);
    });

    describe("#write()", function () {
        it("should write given object", function () {
            var serializable = {
                writeTo: function ( stream ) {
                    stream.write_UINT8(1);
                    stream.write_UINT8(-1);
                }
            };

            stream.write(serializable);

            expect(buffer.toString()).to.equal("01 ff");
        });
    });

    describe("#write_UINT8()", function () {
        context("when not called with a number", function () {
            it("should throw", function () {
                expect(() => {
                    stream.write_UINT8("string value");
                }).to.throw("AssertionError: typeof(value) === 'number'");
            });
        });

        it("should add 1 byte to the stream", function () {
            stream.write_UINT8(-1);
            stream.write_UINT8(128);

            expect(buffer.toString()).to.equal("ff 80");
            expect(stream.pos).to.equal(2);
        });
    });
});
