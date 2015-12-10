export default class CMemStream {

    constructor() {
        this.buffer = new ArrayBuffer(8);
        this.dataview = new DataView(this.buffer);
        this.pos = 0;
        this.length = 0;
    }

    serialize( serializable ) {
        serializable.serialize( this );
    }

    serialize_UINT8( object, property ) {
        var value = object[property];
        console.assert(typeof(value) === "number");

        this.dataview.setUint8(this.pos, value);
        this.pos++;
        this.length++;
    }

    toString() {
        var bytes = new Uint8Array(this.buffer, 0, this.length );
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
