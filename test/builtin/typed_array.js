import { expect } from "chai";

describe("builtin", function () {
    describe("TypedArray", function () {
        describe("#set()", function () {
            it("should initialize to zero", function () {
                var buffer = new ArrayBuffer(2);
                var data_view = new DataView(buffer);
                data_view.setUint8(0, 0xDE);
                data_view.setUint8(1, 0xAD);

                var merged_buffer = new ArrayBuffer(4);
                var merged_array = new Uint8Array(merged_buffer);
                var array = new Uint8Array(buffer);
                merged_array.set(array);
                data_view = new DataView(merged_buffer);
                data_view.setUint8(2, 0xC0);
                data_view.setUint8(3, 0xDE);

                expect(data_view.getUint32(0)).to.equal(0xDEADC0DE);
            });
        });
    });
});
