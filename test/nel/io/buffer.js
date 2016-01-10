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
