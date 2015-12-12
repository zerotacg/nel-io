import AWriteStream from "nel/io/write_stream";

export default class CMemStream {

    constructor(buffer) {
        this.buffer = buffer;
        this.pos = 0;
    }

    write( serializable ) {
        serializable.writeTo( this );
    }

    read( serializable ) {
        serializable.readFrom( this );
    }

    write_UINT8( value ) {
        console.assert(typeof(value) === "number");

        this.buffer.setUint8(this.pos++, value);
    }

    read_UINT8() {
        return this.buffer.getUint8(this.pos++);
    }
}

Object.assign(CMemStream.prototype, AWriteStream.prototype);
