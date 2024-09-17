import {Loaders} from "./loaders.js";
import {FabricLoader} from "./loaders/fabric.js";
import {QuiltLoader} from "./loaders/quilt.js";
import {ForgeLoader} from "./loaders/forge.js";
import {NeoForgeLoader} from "./loaders/neoforge.js";
import {infer} from "./infer.js";
import {Data} from "./data.js";

Loaders.addLoader(new FabricLoader());
Loaders.addLoader(new QuiltLoader());
Loaders.addLoader(new ForgeLoader())
Loaders.addLoader(new NeoForgeLoader())

document.getElementById("file").addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) {
        infer(file).then(Data.set);
    }
});

document.body.addEventListener("dragenter", event => event.preventDefault());
document.body.addEventListener("dragover", event => event.preventDefault());

document.body.addEventListener("drop", event => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
        infer(file).then(Data.set);
    }
})