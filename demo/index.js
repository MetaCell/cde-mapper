import {mapAndInit} from "./integration.js";

let cdeFile = null;
let datasetFile = null;
let additionalCdeFiles = [];


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
        mapAndInit(cdeFile, additionalCdeFiles, datasetFile);
    }
});

document.getElementById('additionalDatasetMappingFilesDropzone').addEventListener('click', function () {
    document.getElementById('additionalDatasetMappingFilesInput').click();
});

document.getElementById('additionalDatasetMappingFilesInput').addEventListener('change', function (event) {
    additionalCdeFiles = Array.from(event.target.files);
    if (additionalCdeFiles.length > 0) {
        const fileNames = additionalCdeFiles.map(file => file.name).join(', ');
        document.getElementById('additionalDatasetMappingFilesDropzone').textContent = `Selected files: ${fileNames}`;
    }
});

function updateSubmitButtonState() {
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = !datasetFile;
}