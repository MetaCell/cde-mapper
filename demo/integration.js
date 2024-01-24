import {init} from './cde-mapper.js';

export function mapAndInit(cdeFile, datasetFile) {
    const datasetReader = new FileReader();

    let datasetMappings = [];
    let datasetSample = [];

    const processDatasetFile = () => {
        datasetReader.onload = function (event) {
            const text = event.target.result;

            // eslint-disable-next-line no-undef
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    datasetSample.push(results.meta.fields); // First element is the header array
                    results.data.slice(0, 10).forEach(row => {
                        datasetSample.push(results.meta.fields.map(field => row[field]));
                    });

                    // Then call the 'init' function from the library
                    init({
                        datasetMapping: datasetMappings,
                        additionalDatasetMappings: [],
                        datasetSample: datasetSample,
                        collections: [],
                        config: {width: '60%', height: '80%'},
                        name: 'TestLabName',
                        callback: (cdeFileMapping) => console.log(cdeFileMapping)
                    });
                },
                error: function (error) {
                    console.error('Error parsing Dataset CSV file:', error.message);
                }
            });
        };

        datasetReader.onerror = function (event) {
            console.error('Error reading Dataset CSV file:', event.target.error);
        };

        datasetReader.readAsText(datasetFile);
    };

    if (cdeFile) {
        const datasetMappingReader = new FileReader();

        datasetMappingReader.onload = function (event) {
            const text = event.target.result;

            // eslint-disable-next-line no-undef
            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    // The first row is the header
                    const headers = Object.keys(results.data[0]);
                    datasetMappings.push(headers);

                    // Subsequent rows are the data
                    results.data.forEach(row => {
                        const rowData = headers.map(header => row[header] || '');
                        datasetMappings.push(rowData);
                    });

                    // After processing the dataset mapping, process the dataset file
                    processDatasetFile();
                },
                error: function (error) {
                    console.error('Error parsing CDE CSV file:', error.message);
                    // Handle the error as needed
                }
            });
        };

        datasetMappingReader.onerror = function (event) {
            console.error('Error reading CDE CSV file:', event.target.error);
        };

        datasetMappingReader.readAsText(cdeFile);
    } else {
        processDatasetFile();
    }
}
