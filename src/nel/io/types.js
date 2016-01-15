
export class bool {
    static readFrom( stream ) {
        return stream.readBool();
    }
}

export class uint8 {
    static readFrom( stream ) {
        return stream.readUint8();
    }
}

export class sint8 {
    static readFrom( stream ) {
        return stream.readSint8();
    }
}

export class uint16 {
    static readFrom( stream ) {
        return stream.readUint16();
    }
}

export class sint16 {
    static readFrom( stream ) {
        return stream.readSint16();
    }
}

export class uint32 {
    static readFrom( stream ) {
        return stream.readUint32();
    }
}

export class sint32 {
    static readFrom( stream ) {
        return stream.readSint32();
    }
}

export class float {
    static readFrom( stream ) {
        return stream.readFloat();
    }
}
