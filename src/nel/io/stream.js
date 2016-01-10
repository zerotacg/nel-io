export const MAX_SINGLE_BYTE_VERSION = 0xFF;

export class VersionError extends TypeError {
    constructor(expected, actual) {
        var message = `The version in stream is not compatible with this class expected version ${expected} but got ${actual}`;
        super(message);
    }
}
