import {Loaders} from "./loaders.js";
import {FabricLoader} from "./loaders/fabric.js";
import {QuiltLoader} from "./loaders/quilt.js";
import {ForgeLoader} from "./loaders/forge.js";
import {infer} from "./infer.js";
import {Data} from "./data.js";

Loaders.addLoader(new FabricLoader());
Loaders.addLoader(new QuiltLoader());
Loaders.addLoader(new ForgeLoader())

document.getElementById("file").addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) {
        infer(file).then(Data.set);
    }
});