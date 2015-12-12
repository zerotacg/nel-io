import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.io.CMemStream", function () {
    var CBuffer;
    var CMemStream;
    var buffer;
    var stream;

    beforeEach("setup", function ( done ) {
        var imports = [
            "nel/io/buffer",
            "nel/io/mem_stream"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CBuffer = modules[ 0 ].default;
                CMemStream = modules[ 1 ].default;

                buffer = new CBuffer(2);
                stream = new CMemStream(buffer);
            })
            .then(done, done);
    });

    describe("#serialize_UINT8()", function () {
        context("when not called with a number", function () {
            it("should throw", function () {
                expect(() => {
                    stream.serialize_UINT8("asdf");
                }).to.throw(Error);
            });
        });

        it("should add 1 byte to the stream", function () {
            stream.write_UINT8(-1);
            stream.write_UINT8(128);

            expect(buffer.toString()).to.equal("ff 80");
            expect(stream.pos).to.equal(2);
        });
    });

    describe("#write()", function () {
        it("should write given object", function () {
            var serializable = {
                version: 1,

                value: -1,

                writeTo: function ( stream ) {
                    stream.write_UINT8(this.version);
                    stream.write_UINT8(this.value);
                }
            };

            stream.write(serializable);

            expect(buffer.toString()).to.equal("01 ff");
        });
    });

    describe("#read()", function () {
        it("should write given object", function () {
            var serializable = {
                version: 1,

                value: -1,

                readFrom: function ( stream ) {
                    this.version = stream.read_UINT8();
                    // if version is not supported throw
                    this.value = stream.read_UINT8();
                }
            };
            buffer.setUint8(0, 2);
            buffer.setUint8(1, 5);

            stream.read(serializable);

            expect(serializable.version).to.equal(2);
            expect(serializable.value).to.equal(5);
        });
    });
});
