import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.io.CReadStream", function () {
    var CBuffer;
    var CReadStream;
    var buffer;
    var stream;

    beforeEach("setup", function ( done ) {
        var imports = [
            "nel/io/buffer",
            "nel/io/read_stream"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CBuffer = modules[ 0 ].default;
                CReadStream = modules[ 1 ].default;

                buffer = new CBuffer(8);
                stream = new CReadStream(buffer);
            })
            .then(done, done);
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

    describe("#read_UINT8()", function () {
        it("should advance the position by 1 bytes", function () {
            stream.read_UINT8();

            expect(stream.pos).to.equal(1);
        });

        it("should return an unsigned value", function () {
            buffer.setInt8(0, -1);
            expect(stream.read_UINT8()).to.equal(0xFF);
        });
    });

    describe("#read_UINT16()", function () {
        it("should advance the position by 2 bytes", function () {
            stream.read_UINT16();

            expect(stream.pos).to.equal(2);
        });

        it("should return an unsigned value", function () {
            buffer.setInt16(0, -1);
            expect(stream.read_UINT16()).to.equal(0xFFFF);
        });
    });
});
