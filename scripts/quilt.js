
function createQuiltJson(data) {
    return JSON.stringify({
        schema_version: 1,
        quilt_loader: {
            id: data.id,
            version: data.version,

            metadata: {
                name: data.display.name,
                description: data.display.description,
                contributors: getQuiltAuthors(data.authors),
                license: data.license,
                icon: data.display.icon || undefined,
            }
        },
        minecraft: {
            environment: getQuiltEnvironment(data.env)
        }
    });
}

function getQuiltAuthors(authors) {
    const result = {};
    for (const author of authors) {
        result[author.name] = "Author";
    }
    return result;
}

function getQuiltEnvironment(env) {
    const client = env.includes("CLIENT");
    const server = env.includes("SERVER");
    if (client !== server) {
        if (client) {
            return "client";
        }
        if (server) {
            return "dedicated_server";
        }
    }
    return "*";
}