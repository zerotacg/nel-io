import CBuffer from "nel/io/buffer";

export default class CMemStream {

    constructor() {
        this.buffer = new CBuffer(8);
        this.pos = 0;
        this.length = 0;
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
        this.length++;
    }

    read_UINT8() {
        return this.buffer.getUint8(this.pos++);
    }

    toString() {
        var bytes = this.buffer.bytes( 0, this.length );

        var byte_string = bytes.reduce(( string, byte, index ) => {
            var prefix = this.bytePrefix( index);
            var value = byte.toString(16);
            if ( byte <= 0xf ) {
                prefix += "0";
            }

            return string + prefix + value;
        }, "");

        byte_string += this.bytePrefix(this.length);

        return byte_string;
    }

    bytePrefix( index ) {
        var position_indicator = ">";

        return this.pos === index ? position_indicator : " ";
    }
}
