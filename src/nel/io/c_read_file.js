import CBuffer from "nel/io/buffer";

/**
 * @class nlio.CReadFile
 * @implements {nlio.IReadStream}
 */
export default class CReadFile {
    /**
     * @param {File} file
     * @return {Promise<ArrayBuffer>}
     */
    static readAsArrayBuffer(file) {
        return new Promise(( reject, resolve) => {
            var reader = new FileReader();
            reader.addEventListener("load", resolve);
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * @param {File} file
     * @return {Promise<CReadFile>}
     */
    static open(file) {
        return (this.readAsArrayBuffer(file)
            .then(array_buffer => {
                var buffer = new CBuffer( array_buffer );
                return new CReadFile(buffer);
            })
        );
    }

    read() {}

    readUint8() {}

    readUint16() {}

    close() {}
}
