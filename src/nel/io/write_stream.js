/**
 * @class nlio.CWriteStream
 */
export default class CWriteStream {
    /**
     * @param {nlio.CBuffer} buffer
     */
    constructor( buffer ) {
        this.buffer = buffer;
        this.pos = 0;
        this.littleEndian = true;
    }

    write( serializable ) {
        serializable.writeTo(this);
    }

    writeUint8( value ) {
        console.assert(typeof(value) === "number", "typeof(value) === 'number'");

        this.buffer.setUint8(this.pos++, value);
    }

    writeUint32( value ) {
        console.assert(typeof(value) === "number", "typeof(value) === 'number'");

        this.buffer.setUint32(this.pos, value, this.littleEndian);
        this.pos += 4;
    }

    writeBuffer( value ) {
        var length = value.length;

        this.buffer.set( value, this.pos );
        this.pos += length;
    }

    writeString( value ) {
        console.assert(typeof(value) === "string", "typeof(value) === 'string'");

        var length = value.length;
        var buffer = new Uint8Array(length);
        for ( var i = 0; i < length; ++i ) {
            buffer[ i ] = value.charCodeAt(i);
        }
        this.writeUint32(length);
        this.writeBuffer(buffer);
    }
}
