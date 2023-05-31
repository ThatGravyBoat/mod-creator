export class Loaders {

    /**
     * The list of loaders.
     * @type {Loader[]}
     */
    static loaders = [];


    /**
     * Adds a loader to the list of loaders.
     * @param loader {Loader}
     */
    static addLoader(loader) {
        this.loaders.push(loader);
    }

    static save(zip, data) {
        for (const loader of this.loaders) {
            loader.save(zip, data);
        }
    }
}

export class Loader {

    /**
     * The file name of the metadata file.
     * @param file {string}
     */
    constructor(file) {
        this.file = file;
    }

    /**
     * Saves the loaders metadata to the zip file with the given data.
     * @param zip {JSZip}
     * @param data {Object}
     */
    save(zip, data) {
        zip.file(this.file, this.createMetadata(data))
    }

    /**
     * Creates the metadata for the loader.
     * @param data {Object}
     * @returns {string}
     */
    createMetadata(data) {
        throw new Error("Not implemented");
    }
}