export default class CReadStream {

    constructor(buffer) {
        this.buffer = buffer;
        this.pos = 0;
    }

    read( serializable ) {
        serializable.readFrom( this );
    }

    read_UINT8() {
        return this.buffer.getUint8(this.pos++);
    }
}
