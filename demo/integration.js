
import {init, mapElasticSearchHitsToOptions} from './cde-mapper.js';
import {getQueryObject} from "./query.js";

export function mapAndInit(datasetMappingFile, additionalDatasetMappingsFiles, datasetFile) {
    let datasetMappings = [];
    let additionalDatasetMappings = [];
    let datasetSample = [];

    const processCsvFile = (file, isDatasetMapping = false) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                const text = event.target.result;

                // eslint-disable-next-line no-undef
                Papa.parse(text, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        const headers = Object.keys(results.data[0]);
                        const mappings = [headers];
                        results.data.forEach(row => {
                            const rowData = headers.map(header => row[header] || '');
                            mappings.push(rowData);
                        });

                        if (isDatasetMapping) {
                            datasetMappings = mappings;
                        } else {
                            additionalDatasetMappings.push(mappings);
                        }
                        resolve();
                    },
                    error: function (error) {
                        console.error('Error parsing CSV file:', error.message);
                        reject(error);
                    }
                });
            };
            reader.onerror = function (event) {
                console.error('Error reading CSV file:', event.target.error);
                reject(event.target.error);
            };
            reader.readAsText(file);
        });
    };

    const processDatasetFile = () => {
        const datasetReader = new FileReader();
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
                        additionalDatasetMappings: additionalDatasetMappings,
                        datasetSample: datasetSample,
                        collections: getCollections(),
                        config: {width: '60%', height: '80%'},
                        name: 'TestLabName',
                        callback: (datasetMapping, datasetMappingHeader) => downloadDatasetMappingAsCSV(datasetMapping, datasetMappingHeader),
                        headerIndexes: {
                            variableName: 0,
                            preciseAbbreviation: 1,
                            title: 2,
                            id: 11,
                            cdeLevel: 12,
                        },
                        emailTemplate: {
                            email: 'support@interlex.org',
                            title: 'CDE Mapper collection not found',
                            description: 'This is an email coming from the cde mapper application to flag that a certain collection is missing.'
                        }
                    });
                },
                error: function (error) {
                    console.error('Error parsing Dataset CSV file:', error.message);
                }
            });
        };
        datasetReader.readAsText(datasetFile);
    };

    const startProcessing = async () => {
        if (datasetMappingFile) {
            await processCsvFile(datasetMappingFile, true);
        }
        for (const file of additionalDatasetMappingsFiles) {
            await processCsvFile(file);
        }
        processDatasetFile();
    };

    startProcessing();
}

function getCollections() {
    return [
        {
            id: 'global',
            name: "Global",
            fetch: fetchElasticSearchData,
        }
    ]
}

async function fetchElasticSearchData(queryString) {
    const query = getQueryObject(queryString)
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseUrl = '/api/1/elastic/Interlex_pr/_search';

    const queryParameters = new URLSearchParams({
        key: apiKey,
    }).toString();

    const response = await fetch(`${baseUrl}?${queryParameters}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...query
        }),
    });

    const data = await response.json();
    return mapElasticSearchHitsToOptions(data.hits.hits || [])
}


function downloadDatasetMappingAsCSV(datasetMapping, datasetMappingHeader) {
    // Prepare data in the format that Papa Parse expects
    const data = Object.values(datasetMapping).map(row => {
        const rowData = {};
        datasetMappingHeader.forEach((header, index) => {
            rowData[header] = row[index] || '';
        });
        return rowData;
    });

    // eslint-disable-next-line no-undef
    const csv = Papa.unparse({
        fields: datasetMappingHeader,
        data: data,
    });

    // Trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "datasetMapping.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}