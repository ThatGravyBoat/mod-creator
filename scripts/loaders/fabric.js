import {Loader} from "../loaders.js";

export class FabricLoader extends Loader {

    constructor() {
        super("fabric.mod.json");
    }

    createMetadata(data) {
        return JSON.stringify({
            schemaVersion: 1,

            id: data.id,
            version: data.version,

            environment: FabricLoader.getFabricEnvironment(data.env),

            name: data.display.name,
            description: data.display.description,

            authors: data.authors.map(author => author.name),

            license: data.license,

            icon: data.display.icon || undefined,
        }, null, 4);
    }

    static getFabricEnvironment(env) {
        const client = env.includes("CLIENT");
        const server = env.includes("SERVER");
        if (client !== server) {
            if (client) {
                return "client";
            }
            if (server) {
                return "server";
            }
        }
        return "*";
    }
}