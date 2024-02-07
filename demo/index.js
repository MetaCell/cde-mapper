import {mapAndInit} from "./integration.js";

let cdeFile = null;
let datasetFile = null;

document.getElementById('datasetMappingFileDropzone').addEventListener('click', function () {
    document.getElementById('datasetMappingFileInput').click();
});

document.getElementById('datasetFileDropzone').addEventListener('click', function () {
    document.getElementById('datasetFileInput').click();
});

document.getElementById('datasetMappingFileInput').addEventListener('change', function (event) {
    if (event.target.files.length > 0) {
        cdeFile = event.target.files[0];
        document.getElementById('datasetMappingFileDropzone').textContent = `Selected file: ${cdeFile.name}`;
        updateSubmitButtonState();
    }
});

document.getElementById('datasetFileInput').addEventListener('change', function (event) {
    if (event.target.files.length > 0) {
        datasetFile = event.target.files[0];
        document.getElementById('datasetFileDropzone').textContent = `Selected file: ${datasetFile.name}`;
        updateSubmitButtonState();
    }
});

document.getElementById('submitButton').addEventListener('click', function (event) {
    event.preventDefault();
    if (datasetFile) {
        mapAndInit(cdeFile, datasetFile);
    }
});

function updateSubmitButtonState() {
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = !datasetFile;
}