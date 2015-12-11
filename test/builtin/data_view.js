import { expect } from "chai";

describe("buildin", function () {
    describe("DataView", function () {
        describe("#getUint8()", function () {
            context("when reading out of range", function () {
                it("should throw", function () {
                    var buffer = new ArrayBuffer(2);
                    var data_view = new DataView(buffer);

                    expect(() => { data_view.getUint8(3); }).to.throw(RangeError);
                    expect(() => { data_view.getUint16(2); }).to.throw(RangeError);
                    expect(() => { data_view.getUint32(0); }).to.throw(RangeError);
                });
            });
        });

        describe("#getUint16()", function () {
            context("when reading little endian", function () {
                it("should return the first byte as lower part", function () {
                    var buffer = new ArrayBuffer(2);
                    var data_view = new DataView(buffer);
                    data_view.setUint8(0, 0xDE);
                    data_view.setUint8(1, 0xC0);

                    expect(data_view.getUint16(0, true)).to.equal(0xC0DE);
                });
            });

            context("when reading without endian", function () {
                it("should return big endian", function () {
                    var buffer = new ArrayBuffer(2);
                    var data_view = new DataView(buffer);
                    data_view.setUint8(0, 0xC0);
                    data_view.setUint8(1, 0xDE);

                    expect(data_view.getUint16(0)).to.equal(0xC0DE);
                    expect(data_view.getUint16(0, false)).to.equal(0xC0DE);
                });
            });
        });
    });
});
