import CBuffer from "nel/io/buffer";
import CReadStream from "nel/io/read_stream";

/**
 * @class nlio.CReadFile
 */
export default class CReadFile extends CReadStream {
    /**
     * @param {File} file
     * @return {Promise<ArrayBuffer>}
     */
    static readAsArrayBuffer( file ) {
        return new Promise(( resolve, reject ) => {
            var reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result));
            reader.addEventListener("error", reject);
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * @param {File} file
     * @return {Promise<CReadFile>}
     */
    static open( file ) {
        return (this.readAsArrayBuffer(file)
                .then(array_buffer => {
                    var buffer = new CBuffer(array_buffer);
                    return new CReadFile(buffer);
                })
        );
    }

    close() {}
}
