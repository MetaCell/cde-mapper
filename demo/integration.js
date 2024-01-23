import { init } from '../lib/main.tsx';

export function mapAndInit(cdeFile, datasetFile) {
    const dictionaryReader = new FileReader();
    const datasetReader = new FileReader();

    let datasetMappings = [];
    let datasetSample = [];

    dictionaryReader.onload = function(event) {
        const text = event.target.result;

        // eslint-disable-next-line no-undef
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                // The first row is the header
                const headers = Object.keys(results.data[0]);
                datasetMappings.push(headers);

                // Subsequent rows are the data
                results.data.forEach(row => {
                    const rowData = headers.map(header => row[header] || '');
                    datasetMappings.push(rowData);
                });

                // After processing the dictionary, process the dataset file
                datasetReader.readAsText(datasetFile);
            },
            error: function(error) {
                console.error('Error parsing CDE CSV file:', error.message);
            }
        });
    };

    datasetReader.onload = function(event) {
        const text = event.target.result;

        // eslint-disable-next-line no-undef
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
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
                    config: { width: '60%', height: '80%' },
                    name: 'TestLabName',
                    callback: (cdeFileMapping) => console.log(cdeFileMapping)
                });
            },
            error: function(error) {
                console.error('Error parsing Dataset CSV file:', error.message);
                // Handle the error as needed
            }
        });
    };

    dictionaryReader.onerror = function(event) {
        console.error('Error reading CDE CSV file:', event.target.error);
        // Handle the error as needed
    };

    datasetReader.onerror = function(event) {
        console.error('Error reading Dataset CSV file:', event.target.error);
        // Handle the error as needed
    };

    dictionaryReader.readAsText(cdeFile);
}
