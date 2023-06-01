import {Loaders} from "./loaders.js";

export class Data {

    /**
     * Sets the inferred data
     * @param data {Object}
     */
    static set(data) {
        document.getElementById("form").style.display = "block";
        Data.init("mod-id", data.id, "", id => data.id = id);
        Data.init("version", data.version, "", version => data.version = version);
        Data.init("license", data.license, "All Rights Reserved", license => data.license = license);
        Data.init("name", data.display.name, "", name => data.display.name = name);
        Data.init("description", data.display.description, "", description => data.display.description = description);
        Data.init("authors", data.authors.map(author => author.name).join(", "), "", authors => data.authors = authors.split(",").map(author => ({name: author.trim()})));

        const submit = document.getElementById("submit");
        const newSubmit = submit.cloneNode(true);
        submit.parentNode.replaceChild(newSubmit, submit);
        newSubmit.addEventListener("click", () => {
            const zip = data.zipFile;
            Loaders.save(zip, data)
            zip.generateAsync({type: "blob"}).then(content => {
                Data.saveFileAs(content, data.id + "-" + data.version + ".jar");
            });
        });
    }

    /**
     * Initializes the data
     * @param id {string}
     * @param value {string}
     * @param defaultValue {string}
     * @param callback {function}
     */
    static init(id, value, defaultValue, callback) {
        const element = document.getElementById(id);
        element.value = value || defaultValue;
        if (callback) {
            element.addEventListener("input", e => callback(e.target.value));
        }
    }

    /**
     * Saves the file as the given name and downloads it.
     * @param data {Blob}
     * @param file {string}
     */
    static saveFileAs(data, file) {
        const link = document.getElementById("blob-opener");
        const url = window.URL.createObjectURL(data);
        link.href = url;
        link.download = file;
        link.click();
        window.URL.revokeObjectURL(url);
    };
}