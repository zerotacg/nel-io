import CWriteStream from "nel/io/write_stream";

const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);
const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);

/**
 * @class nlio.CBuffer
 */
export default class CBuffer {
    /**
     * @param {number} [size=16]
     * @returns {CBuffer}
     */
    static create( size ) {
        var default_size = 16;
        var buffer = new ArrayBuffer(size || default_size);

        return new CBuffer(buffer);
    }

    static fromValues( values ) {
        var buffer = CBuffer.create(values.length);
        var stream = new CWriteStream(buffer);
        stream.littleEndian = false;
        values.map(value => {
            if ( typeof(value) === "string" ) {
                stream.writeChars(value);
            }
            else if ( value <= 0xFF ) {
                stream.writeUint8(value);
            }
            else if ( value <= 0xFFFF ) {
                stream.writeUint16(value);
            }
            else {
                stream.writeUint32(value);
            }
        });

        return buffer;
    }

    /**
     * @param {ArrayBuffer} buffer
     */
    constructor( buffer ) {
        this.setBuffer(buffer);
    }

    /**
     * @param {ArrayBuffer} buffer
     */
    setBuffer( buffer ) {
        this.buffer = buffer;
        this.length = buffer.byteLength;
        this.data_view = new DataView(buffer);
    }

    /**
     * @method
     * @name nlio.CBuffer#reserve
     * @param {number} size
     */
    reserve( size ) {
        if ( size < this.length ) {
            return;
        }
        var array = new Uint8Array(this.buffer);
        var buffer = new ArrayBuffer(size);

        this.setBuffer(buffer);
        this.set(array);
    }

    /**
     * @method
     * @name nlio.CBuffer#set
     * @param {Uint8Array} src_array
     * @param {number} [byteOffset]
     */
    set( src_array, byteOffset ) {
        var dst_array = new Uint8Array(this.buffer);
        dst_array.set(src_array, byteOffset);
    }

    /**
     * @method
     * @name nlio.CBuffer#get
     * @param {number} [byteOffset]
     * @param {number} [length]
     * @return {Uint8Array}
     */
    get( byteOffset, length ) {
        return new Uint8Array(this.buffer, byteOffset, length);
    }

    /**
     * @method
     * @name nlio.CBuffer#getUint8
     * @param {number} byteOffset
     * @returns {number}
     */
    getUint8( byteOffset ) {
        return this.data_view.getUint8(byteOffset);
    }

    /**
     * @method
     * @name nlio.CBuffer#setUint8
     * @param {number} byteOffset
     * @param {number} value
     */
    setUint8( byteOffset, value ) {
        this.data_view.setUint8(byteOffset, value);
    }

    /**
     * @method
     * @name nlio.CBuffer#getSint8
     * @param {number} byteOffset
     * @returns {number}
     */
    getSint8( byteOffset ) {
        return this.data_view.getInt8(byteOffset);
    }

    /**
     * @method
     * @name nlio.CBuffer#setSint8
     * @param {number} byteOffset
     * @param {number} value
     */
    setSint8( byteOffset, value ) {
        this.data_view.setInt8(byteOffset, value);
    }

    /**
     * @method
     * @name nlio.CBuffer#getUint16
     * @param {number} byteOffset
     * @param {boolean} [littleEndian=false]
     * @returns {number}
     */
    getUint16( byteOffset, littleEndian ) {
        return this.data_view.getUint16(byteOffset, littleEndian);
    }

    /**
     * @method
     * @name nlio.CBuffer#setUint16
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian=false]
     */
    setUint16( byteOffset, value, littleEndian ) {
        this.data_view.setUint16(byteOffset, value, littleEndian);
    }

    /**
     * @method
     * @name nlio.CBuffer#getSint16
     * @param {number} byteOffset
     * @param {boolean} [littleEndian=false]
     * @returns {number}
     */
    getSint16( byteOffset, littleEndian ) {
        return this.data_view.getInt16(byteOffset, littleEndian);
    }

    /**
     * @method
     * @name nlio.CBuffer#setSint16
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian=false]
     */
    setSint16( byteOffset, value, littleEndian ) {
        this.data_view.setInt16(byteOffset, value, littleEndian);
    }

    /**
     * @method
     * @name nlio.CBuffer#getUint32
     * @param {number} byteOffset
     * @param {boolean} [littleEndian=false]
     * @returns {number}
     */
    getUint32( byteOffset, littleEndian ) {
        return this.data_view.getUint32(byteOffset, littleEndian);
    }

    /**
     * @method
     * @name nlio.CBuffer#setUint32
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian=false]
     */
    setUint32( byteOffset, value, littleEndian ) {
        this.data_view.setUint32(byteOffset, value, littleEndian);
    }

    /**
     * @method
     * @name nlio.CBuffer#getSint32
     * @param {number} byteOffset
     * @param {boolean} [littleEndian=false]
     * @returns {number}
     */
    getSint32( byteOffset, littleEndian ) {
        return this.data_view.getInt32(byteOffset, littleEndian);
    }

    /**
     * @method
     * @name nlio.CBuffer#setFloat
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian=false]
     */
    setSint32( byteOffset, value, littleEndian ) {
        this.data_view.setInt32(byteOffset, value, littleEndian);
    }

    /**
     * @method
     * @name nlio.CBuffer#getFloat
     * @param {number} byteOffset
     * @param {boolean} [littleEndian=false]
     * @returns {number}
     */
    getFloat( byteOffset, littleEndian ) {
        return this.data_view.getFloat32(byteOffset, littleEndian);
    }

    /**
     * @method
     * @name nlio.CBuffer#getFloat
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian=false]
     * @returns {number}
     */
    setFloat( byteOffset, value, littleEndian ) {
        return this.data_view.setFloat32(byteOffset, value, littleEndian);
    }

    toString() {
        var bytes = new Uint8Array(this.buffer);

        var byte_string = bytes.reduce(( string, byte, index ) => {
            var value;
            var isPrintable = A <= byte && byte <= Z || a <= byte && byte <= z;
            if ( isPrintable ) {
                value = String.fromCharCode(byte);
            }
            else
            {
                value = byte.toString(16);
                if ( byte <= 0xf ) {
                    value = "0" + value;
                }
            }
            var prefix = (index && (index % 4 === 0)) ? " " : "";

            return string + prefix + value;
        }, "");

        return byte_string;
    }
}
