import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.io.CReadStream", function () {
    var CBuffer;

    before("imports", function ( done ) {
        var imports = [
            "nel/io/buffer"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CBuffer = modules[ 0 ].default;
            })
            .then(done, done);
    });

    describe(".fromValues()", function () {
        it("should convert strings to bytes", function () {
            var buffer = CBuffer.fromValues(["test", "bytes"]);
            expect(buffer.toString()).to.equal("test byte s");
        });

        it("should convert numbers up to one byte with one byte", function () {
            var buffer = CBuffer.fromValues([0, 1, 0xFE, 0xFF]);
            expect(buffer.toString()).to.equal("0001feff");
        });

        it("should convert numbers up to two bytes with two bytes", function () {
            var buffer = CBuffer.fromValues([0x0100, 0xFFFF]);
            expect(buffer.toString()).to.equal("0100ffff");
        });

        it("should convert numbers up to 4 bytes with 4 bytes", function () {
            var buffer = CBuffer.fromValues([0x00010000, 0xFFFFFFFF]);
            expect(buffer.toString()).to.equal("00010000 ffffffff");
        });
    });

    describe("#reserve()", function () {
        it("should increase the buffer to hold at least size bytes", function () {
            var buffer = CBuffer.create();
            var size = 32;

            buffer.reserve(size);

            expect(buffer).to.have.length.of.at.least(size);
        });

        it("should preserve current content", function () {
            var buffer = CBuffer.create(2);

            buffer.setUint8(0, 0xDE);
            buffer.setUint8(1, 0xAD);

            buffer.reserve(4);

            buffer.setUint8(2, 0xC0);
            buffer.setUint8(3, 0xDE);

            expect(buffer.getUint32(0)).to.equal(0xDEADC0DE);
        });
    });
});
