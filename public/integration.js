import { init } from '../lib/main.tsx';

export function mapAndInit(cdeFile, datasetFile) {
    const dictionaryReader = new FileReader();
    const datasetReader = new FileReader();

    let dictionaryRows = [];
    let datasetSample = [];

    dictionaryReader.onload = function(event) {
        const text = event.target.result;

        // eslint-disable-next-line no-undef
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                dictionaryRows = results.data.map(row => ({
                    variableName: row['Variable Name (UI)'],
                    abbreviation: row['Abbreviation'],
                    interlexID: row['InterLex ID'],
                    // Map other fields as needed
                }));

                // After processing the dictionary, process the dataset file
                datasetReader.readAsText(datasetFile);
            },
            error: function(error) {
                console.error('Error parsing CDE CSV file:', error.message);
                // Handle the error as needed
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
                    mappings: dictionaryRows,
                    datasetSample: datasetSample,
                    callback: (data) => console.log(data),
                    repositories: [],
                    config: { width: '60%', height: '80%' },
                    labName: 'TestLabName'
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
