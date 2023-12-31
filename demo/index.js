import {mapAndInit} from "./integration.js";

let cdeFile = null;
let datasetFile = null;

document.getElementById('cdeFileDropzone').addEventListener('click', function() {
    document.getElementById('cdeFileInput').click();
});

document.getElementById('datasetFileDropzone').addEventListener('click', function() {
    document.getElementById('datasetFileInput').click();
});

document.getElementById('cdeFileInput').addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        cdeFile = event.target.files[0];
        document.getElementById('cdeFileDropzone').textContent = `Selected file: ${cdeFile.name}`;
        updateSubmitButtonState();
    }
});

document.getElementById('datasetFileInput').addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        datasetFile = event.target.files[0];
        document.getElementById('datasetFileDropzone').textContent = `Selected file: ${datasetFile.name}`;
        updateSubmitButtonState();
    }
});

document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault();
    if (cdeFile && datasetFile) {
        mapAndInit(cdeFile, datasetFile); // This function will be defined in integration.js
    }
});

function updateSubmitButtonState() {
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = !(cdeFile && datasetFile);
}
