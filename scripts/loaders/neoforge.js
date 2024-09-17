import {Loader} from "../loaders.js";

export class NeoForgeLoader extends Loader {

    constructor() {
        super("META-INF/neoforge.mods.toml");
    }


    createMetadata(data) {
        const metadata = `
            modLoader="lowcodefml"
            loaderVersion="[1,)"
            license="${data.license}"
            
            [[mods]]
            modId="${data.id}"
            version="${data.version}"
            displayName="${data.display.name}"
            description="${data.display.description}"
            ${data.display.icon ? `logoFile="${data.display.icon}"` : ""}
            authors="${data.authors.map(author => author.name).join(",")}"
        `;
        return metadata.split("\n")
            .filter(line => line.trim().length > 0)
            .map(line => line.trim())
            .join("\n");
    }
}