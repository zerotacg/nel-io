import { MAX_SINGLE_BYTE_VERSION } from "nel/io/stream";

/**
 * @class nlio.CReadStream
 * @implements {nlio.IReadStream}
 */
export default class CReadStream {
    /**
     * @param {nlio.CBuffer} buffer
     */
    constructor( buffer ) {
        this.buffer = buffer;
        this.pos = 0;
        this.littleEndian = true;
    }

    /**
     * @param {nlio.IReadable} readable
     */
    read( readable ) {
        readable.readFrom(this);
    }

    readUint8() {
        return this.buffer.getUint8(this.pos++);
    }

    readUint16() {
        var value = this.buffer.getUint16(this.pos, this.littleEndian);
        this.pos += 2;

        return value;
    }

    readUint32() {
        var value = this.buffer.getUint32(this.pos, this.littleEndian);
        this.pos += 4;

        return value;
    }

    readSint32() {
        var value = this.buffer.getSint32(this.pos, this.littleEndian);
        this.pos += 4;

        return value;
    }

    readBuffer( length ) {
        var value = this.buffer.get(this.pos, length);
        this.pos += length;

        return value;
    }

    readString() {
        var length = this.readUint32();
        var buffer = this.readBuffer(length);

        return String.fromCharCode.apply(null, buffer);
    }

    readCheckString( expected ) {
        var actual = this.readString();
        if ( expected !== actual ) {
            var message = `Invalid data format, expected to read "${expected}" but got "${actual}"`;

            throw new TypeError(message);
        }
    }

    readVersion() {
        var version = this.readUint8();

        if ( version === MAX_SINGLE_BYTE_VERSION ) {
            version = this.readUint32();
        }

        return version;
    }

    readArray( readElement ) {
        var length = this.readSint32();
        var value = new Array(length);

        for ( var i = 0; i < length; ++i ) {
            value[i] = readElement(this);
        }

        return value;
    }
}
