export default class AWriteStream {

    write( serializable ) {
        serializable.writeTo( this );
    }

    write_UINT8( value ) {
        console.assert(typeof(value) === "number");

        var buffer = new ArrayBuffer(1);
        var data_view = new DataView(buffer);
        data_view.setUint8( value );
        this.buffer.setUint8(this.pos++, value);
    }
}
