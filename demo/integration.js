import { init } from '/cde-mapper/dist/cde-selector.js';

export function mapAndInit(cdeFile, datasetFile) {
    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;

        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                const cdeMappings = results.data.map(row => ({
                    variableName: row['Variable Name (UI)'],
                    abbreviation: row['Abbreviation'],
                    interlexID: row['InterLex ID'],
                    // Map other fields as needed
                }));

                // Then call the 'init' function from the library
                init({
                    inputMappings: [cdeMappings],
                    datasetSample: datasetFile,
                    callback: (data) => console.log(data),
                    repositories: [],
                    config: { width: '60%', height: '80%' },
                    labName: 'TestLabName'
                });
            },
            error: function(error) {
                console.error('Error parsing CSV file:', error.message);
                // Handle the error as needed
            }
        });
    };

    reader.onerror = function(event) {
        console.error('Error reading CSV file:', event.target.error);
        // Handle the error as needed
    };

    reader.readAsText(cdeFile);
}
