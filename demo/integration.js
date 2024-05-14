import {init, mapElasticSearchHitsToOptions} from './cde-mapper.js';
// import {init, mapElasticSearchHitsToOptions} from '../lib/main.tsx';
import {getCollectionFilter, getQueryById, getQueryByName, getRelatedQuery} from "./query.js";

const headersIndexes = {
    variableName: 0,
    preciseAbbreviation: 1,
    title: 2,
    id: 11,
    cdeLevel: 12,
}

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
                        headerIndexes: headersIndexes,
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

export function createAndInit() {
    let datasetMappings = [];
    let additionalDatasetMappings = [];
    let datasetSample = [];

    const processDatasetFile = () => {
        init({
            datasetMapping: datasetMappings,
            additionalDatasetMappings: additionalDatasetMappings,
            datasetSample: datasetSample,
            collections: getCollections(),
            config: {width: '60%', height: '80%'},
            name: 'TestLabName',
            callback: (datasetMapping, datasetMappingHeader) => downloadDatasetMappingAndDatasetAsCSV(datasetMapping, datasetMappingHeader),
            headerIndexes: headersIndexes,
            emailTemplate: {
                email: 'support@interlex.org',
                title: 'CDE Mapper collection not found',
                description: 'This is an email coming from the cde mapper application to flag that a certain collection is missing.'
            }
        });
    };

    const startProcessing = async () => {
        processDatasetFile();
    };

    startProcessing();
}


function getCollections() {
    return [
        {
            id: 'precise',
            name: "PRECISE-TBI",
            fetch: fetchElasticSearchDataWithModifier("ilx_0793866"),
            getPairingSuggestions: getPairingSuggestionsWithModifier("ilx_0793866"),
        },
        {
            id: 'global',
            name: "Interlex",
            fetch: fetchElasticSearchData,
            getPairingSuggestions: getPairingSuggestions,
        }
    ]
}

async function fetchElasticSearchData(queryString, filters = []) {
    const query = getQueryByName(queryString, filters);
    const data = await queryInterlex(query);
    return mapElasticSearchHitsToOptions(data.hits.hits || [], headersIndexes);
}


function fetchElasticSearchDataWithModifier(ancestorId) {
    return async (queryString) => {
        return fetchElasticSearchData(queryString, [getCollectionFilter(ancestorId)]);
    };
}

async function getPairingSuggestions(id, filters = []) {
    const query = getQueryById(id, filters);
    const initialData = await queryInterlex(query);

    if (initialData.hits.hits.length === 1 && initialData.hits.hits[0]._source.superclasses?.length) {
        const superclassId = initialData.hits.hits[0]._source.superclasses[0].ilx;

        if (superclassId) {
            // Fetch related suggestions based on the superclass ID
            const relatedQuery = getRelatedQuery(superclassId, filters);
            const relatedData = await queryInterlex(relatedQuery);
            return mapElasticSearchHitsToOptions(relatedData.hits.hits || [], headersIndexes);
        }
    }

    return [];
}

function getPairingSuggestionsWithModifier(ancestorId) {
    return async (id) => {
        return await getPairingSuggestions(id, [getCollectionFilter(ancestorId)]);
    };
}


async function queryInterlex(query) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseUrl = 'https://api.scicrunch.io/elastic/v1/Interlex_pr/_search';

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
    return data;
}

function triggerCSVDownload(csv, fileName) {
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    triggerCSVDownload(csv, "datasetMapping.csv")
}

function downloadDatasetMappingAndDatasetAsCSV(datasetMapping, datasetMappingHeader) {
    // Prepare data in the format that Papa Parse expects
    const data = Object.values(datasetMapping)[0].map((_, index) => {
        let rowData = {};
        Object.values(datasetMapping).forEach((row, i) => {
            rowData[datasetMappingHeader[i]] = row[index]
        })
        return rowData;
    });

    // eslint-disable-next-line no-undef
    const datasetMappingCSV = Papa.unparse({
        fields: datasetMappingHeader,
        data: data,
    });

    const datasetCSV = Papa.unparse({
        // fields: datasetMappingHeader,
        data: [datasetMapping["Variable Name"]],
    })

    // Trigger download
    triggerCSVDownload(datasetMappingCSV, "datasetMapping.csv")
    triggerCSVDownload(datasetCSV, "dataset.csv")
}
