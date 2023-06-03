import {Loader} from "../loaders.js";

export class QuiltLoader extends Loader {

    constructor() {
        super("quilt.mod.json");
    }


    createMetadata(data) {
        return JSON.stringify({
            schema_version: 1,
            quilt_loader: {
                id: data.id,
                group: `packed.${data.id}.mod`,
                version: data.version,

                metadata: {
                    name: data.display.name,
                    description: data.display.description,
                    contributors: QuiltLoader.getQuiltAuthors(data.authors),
                    license: data.license,
                    icon: data.display.icon || undefined,
                }
            },
            minecraft: {
                environment: QuiltLoader.getQuiltEnvironment(data.env)
            }
        }, null, 4);
    }

    static getQuiltAuthors(authors) {
        const result = {};
        for (const author of authors) {
            result[author.name] = "Author";
        }
        return result;
    }

    static getQuiltEnvironment(env) {
        const client = env.includes("CLIENT");
        const server = env.includes("SERVER");
        if (client && !server) {
            return "client";
        }
        return "*";
    }
}