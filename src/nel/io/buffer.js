export default class CBuffer {

    constructor( size ) {
        this.reserve(size);
    }

    reserve( size ) {
        var old_buffer = this.buffer;
        this.buffer = new ArrayBuffer(size);
        this.data_view = new DataView(this.buffer);
        this.set(old_buffer);

        this.length = this.buffer.byteLength;
    }

    set( src_buffer ) {
        var src_array = new Uint8Array(src_buffer);
        var dst_array = new Uint8Array(this.buffer);
        dst_array.set(src_array);
    }

    setUint8( byteOffset, value ) {
        this.data_view.setUint8(byteOffset, value);
    }

    getUint8( byteOffset ) {
        return this.data_view.getUint8(byteOffset);
    }

    getUint32( byteOffset, littleEndian ) {
        return this.data_view.getUint32(byteOffset, littleEndian);
    }

    bytes( byteOffset, length ) {
        return new Uint8Array(this.buffer, byteOffset, length);
    }
}
