/**
 * @class nel.io.CReadStream
 */
export default class CReadStream {
    /**
     * @param {nel.io.CBuffer} buffer
     */
    constructor(buffer) {
        this.buffer = buffer;
        this.pos = 0;
        this.littleEndian = true;
    }

    read( serializable ) {
        serializable.readFrom( this );
    }

    read_UINT8() {
        return this.buffer.getUint8(this.pos++);
    }

    read_UINT16() {
        var value = this.buffer.getUint16(this.pos, this.littleEndian);
        this.pos += 2;

        return value;
    }
}
