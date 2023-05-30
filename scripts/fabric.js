
function createFabricJson(data) {
    return JSON.stringify({
        schemaVersion: 1,

        id: data.id,
        version: data.version,

        environment: getFabricEnvironment(data.env),

        name: data.display.name,
        description: data.display.description,

        authors: getFabricAuthors(data.authors) || undefined,

        license: data.license,

        icon: data.display.icon || undefined,
    });
}

function getFabricAuthors(authors) {
    const result = [];
    for (const author of authors) {
        result.push(author.name);
    }
    return result;
}

function getFabricEnvironment(env) {
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