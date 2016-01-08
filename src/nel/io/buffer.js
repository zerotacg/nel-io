/**
 * @class nlio.CBuffer
 */
export default class CBuffer {

    constructor( size ) {
        this.reserve(size);
    }

    reserve( size ) {
        var array = new Uint8Array(this.buffer);
        this.buffer = new ArrayBuffer(size);
        this.data_view = new DataView(this.buffer);
        this.set(array);

        this.length = this.buffer.byteLength;
    }

    /**
     * @param {Uint8Array} src_array
     * @param {number} [byteOffset]
     */
    set( src_array, byteOffset ) {
        var dst_array = new Uint8Array(this.buffer);
        dst_array.set(src_array, byteOffset);
    }

    /**
     * @param {number} [byteOffset]
     * @param {number} [length]
     * @return {Uint8Array}
     */
    get( byteOffset, length ) {
        return new Uint8Array(this.buffer, byteOffset, length);
    }

    getUint8( byteOffset ) {
        return this.data_view.getUint8(byteOffset);
    }

    getUint16( byteOffset, littleEndian ) {
        return this.data_view.getUint16(byteOffset, littleEndian);
    }

    getUint32( byteOffset, littleEndian ) {
        return this.data_view.getUint32(byteOffset, littleEndian);
    }

    setUint8( byteOffset, value ) {
        this.data_view.setUint8(byteOffset, value);
    }

    setInt8( byteOffset, value ) {
        this.data_view.setInt8(byteOffset, value);
    }

    setInt16( byteOffset, value, littleEndian ) {
        this.data_view.setInt16(byteOffset, value, littleEndian);
    }

    toString() {
        var bytes = new Uint8Array(this.buffer);

        var byte_string = bytes.reduce(( string, byte, index ) => {
            var value = byte.toString(16);
            var prefix = index ? " " : "";
            if ( byte <= 0xf ) {
                prefix += "0";
            }

            return string + prefix + value;
        }, "");

        return byte_string;
    }
}
