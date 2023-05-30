const reader = new JSZip();

/**
 * @param name {string}
 * @returns {string}
 */
const toModId = (name) => {
    return name.substring(0, name.lastIndexOf("-"))
        .replace(" ", "_")
        .replace(/[^a-z0-9_]/gi, "")
        .toLowerCase();
}

/**
 *
 * @param zip {JSZip}
 * @param folder {string}
 * @returns {boolean}
 */
const containsFolder = (zip, folder) => {
    for (let filesKey in zip.files) {
        if (filesKey.startsWith(folder)) {
            return true;
        }
    }
    return false;
}

/**
 * @param file {File}
 */
const infer = async (file) => {
    const zip = await reader.loadAsync(file);
    const name = file.name.substring(0, file.name.lastIndexOf("."));
    const packMeta = await zip.file("pack.mcmeta")?.async("text");
    const packMetaJson = packMeta ? JSON.parse(packMeta) : {};
    const packIcon = await zip.file("pack.png");
    const env = [];
    if (containsFolder(zip, "data/")) env.push("SERVER");
    if (containsFolder(zip, "assets/")) env.push("CLIENT");

    return {
        id: toModId(name),
        env: env,
        display: {
            name: name,
            description: packMetaJson?.pack?.description || "",
            icon: packIcon ? "pack.png" : undefined,
        },

        zipFile: zip,
    }
}

