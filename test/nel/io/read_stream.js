import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);

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
        buffer = new CBuffer(16);
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
            buffer.setSint8(0, -1);
            expect(stream.readUint8()).to.equal(0xFF);
        });
    });

    describe("#readUint16()", function () {
        it("should advance the position by 2 bytes", function () {
            stream.readUint16();

            expect(stream.pos).to.equal(2);
        });

        it("should return an unsigned value", function () {
            buffer.setSint16(0, -1);
            expect(stream.readUint16()).to.equal(0xFFFF);
        });
    });

    describe("#readUint32()", function () {
        it("should advance the position by 4 bytes", function () {
            stream.readUint32();

            expect(stream.pos).to.equal(4);
        });

        it("should return an unsigned value", function () {
            buffer.setSint32(0, -1);
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
        it("should read bytes of the string", function () {
            var value = "test";
            setString(value);

            expect(stream.readString()).to.equal(value);
        });
    });

    function setString( value ) {
        buffer.setUint32(0, value.length, stream.littleEndian);
        var offset = 4;

        for ( var i = 0, length = value.length; i < length; ++i ) {
            buffer.setUint8(offset + i, value.charCodeAt(i));
        }
    }

    describe("#readCheckString()", function () {
        beforeEach("setup", function () {
            setString("check");
        });

        context("when the given value is equal to the read value", function () {
            it("should not throw", function () {
                expectCheck("check").to.not.throw(Error);
            });
        });

        function expectCheck( check ) {
            return expect(() => stream.readCheckString(check));
        }

        context("when the given value is not equal to the read value", function () {
            it("should throw", function () {
                expectCheck("fail").to.throw(TypeError);
            });
        });
    });

    describe("#readVersion()", function () {
        it("should read 1 byte", function () {
            var version = 0xF0;
            buffer.setUint8(0, version);
            expect(stream.readVersion()).to.equal(version);
        });
        context("when the version byte is 0xff", function () {
            it("should read 32bit version", function () {
                var version = 0xFF00FF00;
                buffer.setUint8(0, 0xFF);
                buffer.setUint32(1, version, stream.littleEndian);
                expect(stream.readVersion()).to.equal(version);
            });
        });
    });

    describe("#readArray()", function () {
        var readElement;
        var length;

        beforeEach("setup", function () {
            length = 3;
            buffer.setSint32(0, length, stream.littleEndian);
            readElement = sinon.spy();
        });

        it("should return an array", function () {
            expect(stream.readArray(readElement)).to.be.an("array");
        });

        it("should read a 32bit signed length", function () {
            expect(stream.readArray(readElement)).to.have.length(length);
        });

        it("should call the given function for every element with itself as parameter", function () {
            stream.readArray(readElement);

            expect(readElement).to.always.have.been.calledWith(stream);
        });

        it("should set the return value of the given function as element in the array", function () {
            var i = 0;
            var value = stream.readArray(() => `read: ${i++}`);

            expect(value).to.deep.equal(["read: 0", "read: 1", "read: 2"]);
        });

        context("when the length is negative", function () {
            it("should throw an RangeError", function () {
                var length = -1;
                buffer.setSint32(0, length, stream.littleEndian);

                expect(() => stream.readArray(readElement)).to.throw(RangeError);
            });
        });
    });
});
