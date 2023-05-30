const input = document.getElementById("file");
let data = undefined;

input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        data = infer(file);
    }
});