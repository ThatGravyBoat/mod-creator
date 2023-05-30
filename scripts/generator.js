const input = document.getElementById("file");
let data = undefined;

const saveBlob = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (blob, fileName) {
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

function setData(data) {
    this.data = data;

    const container = document.getElementById("container");
    if (container.children.length > 1) {
        container.removeChild(container.lastChild);
    }

    const form = document.createElement("div");
    form.classList.add("input-form");
    form.appendChild(createLabelInput(true, "Mod Id", data.id || "", id => data.id = id));
    form.appendChild(createLabelInput(true, "Version", data.version || "", version => data.version = version));
    form.appendChild(createLabelInput(true, "License", "All Rights Reserved", license => data.license = license));

    form.appendChild(createLabelInput(false, "Name", data.display.name, name => data.display.name = name));
    form.appendChild(createLabelInput(false, "Description", data.display.description, description => data.display.description = description));
    form.appendChild(createLabelInput(false, "Authors (comma seperated)", "", authors => data.authors = authors.split(",").map(author => ({name: author.trim()}))));

    form.appendChild(createFinishedButtons());

    container.appendChild(form);

    console.log(data);
}

function createLabelInput(required, title, value, callback) {
    const label = document.createElement("label");
    label.innerHTML = "<span>" + title + (required ? `<span class="required">*</span>` : "") + "</span>";
    label.classList.add("input-field")
    const input = document.createElement("input");
    input.value = value;
    if (callback) {
        input.addEventListener("input", e => callback(e.target.value));
    }

    label.appendChild(input);
    return label;
}

function createFinishedButtons() {
    const container = document.createElement("div");
    container.classList.add("input-buttons");
    const finish = document.createElement("div");
    finish.classList.add("input-button");
    finish.innerText = "Finish";
    finish.addEventListener("click", () => {
        const zip = this.data.zipFile;
        zip.file("fabric.mod.json", createFabricJson(this.data), null, 4);
        zip.file("quilt.mod.json", createQuiltJson(this.data), null, 4);
        zip.file("META-INF/mods.toml", createForgeJson(this.data), null, 4);
        zip.generateAsync({type: "blob"}).then(content => {
            saveBlob(content, this.data.id + "-" + this.data.version + ".jar");
        });
        console.log("Finished");
    });

    container.appendChild(finish);
    container.appendChild(document.createTextNode("This will download a jar file of the pack."));
    return container;
}

input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        infer(file).then(setData);
    }
});