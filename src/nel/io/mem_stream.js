import CBuffer from "nel/io/buffer";

export default class CMemStream {

    constructor() {
        this.buffer = new CBuffer(8);
        this.pos = 0;
        this.length = 0;
        this.is_writing = true;
    }

    serialize( serializable ) {
        serializable.serialize( this );
    }

    serialize_UINT8( object, property ) {
        if ( this.is_writing ) {
            this.write_UINT8( object[property] );
        } else {
            object[property] = this.read_UINT8();
        }
    }

    write_UINT8( value ) {
        console.assert(typeof(value) === "number");

        this.buffer.setUint8(this.pos++, value);
        this.length++;
    }

    read_UINT8() {
        return this.dataview.getUint8(this.pos++);
    }

    toString() {
        var bytes = this.buffer.bytes( 0, this.length );
        var byte_string = bytes.reduce(( string, byte, index ) => {
            var prefix = index === this.pos ? "|" : " ";
            var value = byte.toString(16);
            if ( byte <= 0xf ) {
                prefix += "0";
            }

            return string + prefix + value;
        }, "");

        if ( this.pos === this.length ) {
            byte_string += ">";
        }

        return byte_string;
    }
}
