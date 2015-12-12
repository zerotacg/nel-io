import { expect } from "chai";

describe("builtin.ArrayBuffer", function () {
    describe("#constructor()", function () {
        it("should initialize to zero", function () {
            var buffer = new ArrayBuffer(4);
            var data_view = new DataView(buffer);

            expect(data_view.getUint8(0)).to.equal(0);
            expect(data_view.getUint16(0)).to.equal(0);
            expect(data_view.getUint32(0)).to.equal(0);
        });
    });
});
