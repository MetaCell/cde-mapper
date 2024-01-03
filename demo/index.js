import { init } from '../dist/cde-selector.js';


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
        // Replace 'init' with the actual function from your library
        init({
            cdeFileMapping: cdeFile,
            datasetSample: datasetFile,
            labFileMapping: null,
            callback: (data) => console.log(data),
            repositories: [],
            config: { width: '60%', height: '80%' },
            labName: 'TestLabName'
        });
    }
});

function updateSubmitButtonState() {
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = !(cdeFile && datasetFile);
}
