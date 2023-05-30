
const createForgeJson = (data) => `
modloader="lowcode"
loaderVersion="1"
license="${data.license}"

[[mods]]
modId="${data.id}"
version="${data.version}"
displayName="${data.display.name}"
description="${data.display.description}"
${data.display.icon ? `logoFile="${data.display.icon}"` : ""}
${data.authors ? `authors="${getForgeAuthors(data.authors)}"` : ""}
`;

function getForgeAuthors(authors) {
    const result = [];
    for (const author of authors) {
        result.push(author.name);
    }
    return result.join(",");
}