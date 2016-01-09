import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.io.CReadStream", function () {
    var CBuffer;
    var CReadStream;

    before("imports", function ( done ) {
        var imports = [
            "nel/io/buffer",
            "nel/io/read_stream"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CBuffer = modules[ 0 ].default;
                CReadStream = modules[ 1 ].default;
            })
            .then(done, done);
    });

    var buffer;
    var stream;
    beforeEach("setup", function () {
        buffer = new CBuffer(8);
        stream = new CReadStream(buffer);
    });

    describe("#read()", function () {
        it("should write given object", function () {
            var serializable = {
                version: 1,

                value: -1,

                readFrom: function ( stream ) {
                    this.version = stream.readUint8();
                    // if version is not supported throw
                    this.value = stream.readUint8();
                }
            };
            buffer.setUint8(0, 2);
            buffer.setUint8(1, 5);

            stream.read(serializable);

            expect(serializable.version).to.equal(2);
            expect(serializable.value).to.equal(5);
        });
    });

    describe("#readUint8()", function () {
        it("should advance the position by 1 bytes", function () {
            stream.readUint8();

            expect(stream.pos).to.equal(1);
        });

        it("should return an unsigned value", function () {
            buffer.setInt8(0, -1);
            expect(stream.readUint8()).to.equal(0xFF);
        });
    });

    describe("#readUint16()", function () {
        it("should advance the position by 2 bytes", function () {
            stream.readUint16();

            expect(stream.pos).to.equal(2);
        });

        it("should return an unsigned value", function () {
            buffer.setInt16(0, -1);
            expect(stream.readUint16()).to.equal(0xFFFF);
        });
    });

    describe("#readUint32()", function () {
        it("should advance the position by 4 bytes", function () {
            stream.readUint32();

            expect(stream.pos).to.equal(4);
        });

        it("should return an unsigned value", function () {
            buffer.setInt32(0, -1);
            expect(stream.readUint32()).to.equal(0xFFFFFFFF);
        });
    });

    describe("#readBuffer()", function () {
        it("should advance the position by length bytes", function () {
            stream.readBuffer(3);

            expect(stream.pos).to.equal(3);
        });

        it("should return an Uint8Array of given length", function () {
            var buffer = stream.readBuffer(3);
            expect(buffer).to.be.an.instanceOf(Uint8Array);
            expect(buffer).to.have.length(3);
        });
    });

    describe("#readString()", function () {
        var length;

        beforeEach("setup", function () {
            length = 4;
            buffer.setUint32(0, length, true);
        });

        it("should read the length 32bit length of the string", function () {
            expect(stream.readString()).to.have.length(length);
        });

        it("should read bytes of the string", function () {
            var value = "test";

            buffer.setUint8(4, value.charCodeAt(0));
            buffer.setUint8(5, value.charCodeAt(1));
            buffer.setUint8(6, value.charCodeAt(2));
            buffer.setUint8(7, value.charCodeAt(3));

            expect(stream.readString()).to.equal(value);
        });

        it("should advance the position by size of length + length bytes", function () {
            stream.readString();

            expect(stream.pos).to.equal(4 + length);
        });
    });
});
