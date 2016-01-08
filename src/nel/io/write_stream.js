/**
 * @class nlio.CWriteStream
 */
export default class CWriteStream {
    /**
     * @param {nlio.CBuffer} buffer
     */
    constructor(buffer) {
        this.buffer = buffer;
        this.pos = 0;
    }

    write( serializable ) {
        serializable.writeTo( this );
    }

    write_UINT8( value ) {
        console.assert(typeof(value) === "number", "typeof(value) === 'number'");

        this.buffer.setUint8(this.pos++, value);
    }
}
