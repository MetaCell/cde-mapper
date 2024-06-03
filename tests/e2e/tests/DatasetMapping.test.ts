import * as puppeteer from "puppeteer";
import 'expect-puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot'
expect.extend({ toMatchImageSnapshot })
import * as path from 'path';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Browser } from 'puppeteer';



const URL = process.env.url || "https://cde-mapper.dev.metacell.us/";
const TIMEOUT = 6000;


jest.setTimeout(400000);
let dm_test_browser: Browser;
let dm_test_page;


describe('CDE: Dataset Mapping Test', () => {


    beforeAll(async () => {
        dm_test_browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox', "--ignore-certificate-errors"],
            headless: false,
            devtools: false,
            defaultViewport: {
                width: 1600,
                height: 1000,
            },
        });
        dm_test_page = await dm_test_browser.newPage();
    });

    afterAll(async () => {
        await dm_test_browser.close();
    });

    describe('Load files', () => {

        test('Load the page', async () => {
            console.log('Loading the page ...')

            await dm_test_page.goto(URL);
            await dm_test_page.waitForSelector('#datasetMappingFileDropzone', { timeout: TIMEOUT, hidden: false });
            console.log(dm_test_page.url());
            console.log('Page loaded successfully');

        });

        test('Upload dataset mapping file', async () => {
            console.log('Uploading dataset mapping files ...')
            await dm_test_page.waitForSelector('#datasetMappingFileDropzone')
            await dm_test_page.waitForSelector('#datasetMappingFileInput')
            const inputUploadHandle = await dm_test_page.waitForSelector('#datasetMappingFileInput');
            await inputUploadHandle.uploadFile('resources/cde_dictionary.csv');
            await dm_test_page.waitForFunction(
                () => document.querySelector('#datasetMappingFileDropzone').textContent === 'Selected file: cde_dictionary.csv',
                { timeout: TIMEOUT }
            );
            console.log('Dataset mapping files uploaded successfully');
        });

        test('Upload additional dataset mapping file', async () => {
            console.log('Uploading additional dataset mapping files ...')
            await dm_test_page.waitForSelector('#additionalDatasetMappingFilesDropzone')
            await dm_test_page.waitForSelector('#additionalDatasetMappingFilesInput')
            const inputUploadHandle = await dm_test_page.waitForSelector('#additionalDatasetMappingFilesInput');
            await inputUploadHandle.uploadFile('resources/cde_other_mappings.csv');
            await dm_test_page.waitForFunction(
                () => document.querySelector('#additionalDatasetMappingFilesDropzone').textContent === 'Selected files: cde_other_mappings.csv',
                { timeout: TIMEOUT }
            );
            console.log('Additional dataset mapping files uploaded successfully');
        });

        test('Upload dataset file', async () => {
            console.log('Uploading dataset files ...')
            await dm_test_page.waitForSelector('#datasetFileDropzone')
            await dm_test_page.waitForSelector('#datasetFileInput')
            const inputUploadHandle = await dm_test_page.waitForSelector('#datasetFileInput');
            await inputUploadHandle.uploadFile('resources/cde_dataset.csv');
            await dm_test_page.waitForFunction(
                () => document.querySelector('#datasetFileDropzone').textContent === 'Selected file: cde_dataset.csv',
                { timeout: TIMEOUT }
            );
            console.log('Dataset files uploaded successfully');
        });

        test('Submit files', async () => {
            console.log('Submitting files ...')
            await dm_test_page.waitForSelector('#submitButton', { timeout: TIMEOUT, disabled: false })
            await dm_test_page.click('#submitButton')
            await dm_test_page.waitForSelector('.mapping__start-btn', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.mapping__start-btn');
            await dm_test_page.waitForSelector('button[title="Skip tutorial"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.click('button[title="Skip tutorial"]')
            console.log('Files submitted successfully');
        })


    })



    describe('Go through Suggestions', () => {
        test('Accept 1/3 suggestion', async () => {
            console.log('Accepting suggestion 1 ...')
            await dm_test_page.waitForSelector('.suggestion-details > div > span', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.suggestion-details > div > span');
            await dm_test_page.waitForSelector('.suggestions__navigation-block > div > button:nth-child(2)');
            await dm_test_page.click('.suggestions__navigation-block > div > button:nth-child(2)');
            console.log('Suggestion 1 accepted successfully');
        })
        test('Ignore 2/3 suggestion', async () => {
            console.log('Ignoring suggestion 2 ...')
            await dm_test_page.waitForSelector('.suggestions__button-block > button:nth-child(1)', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.suggestions__button-block > button:nth-child(1)');
            await dm_test_page.waitForSelector('.suggestions__navigation-block > div > button:nth-child(2)');
            await dm_test_page.click('.suggestions__navigation-block > div > button:nth-child(2)');
            console.log('Suggestion 2 ignored successfully');
        })
        test('Ignore 3/3 suggestion', async () => {
            console.log('Ignoring suggestion 3 ...')
            await dm_test_page.waitForSelector('.suggestions__button-block > button:nth-child(1)', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.suggestions__button-block > button:nth-child(1)');
            await dm_test_page.waitForSelector('.suggestions__button-block > button:nth-child(2)', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.suggestions__button-block > button:nth-child(2)');
            await dm_test_page.waitForSelector('.collection__select-btn', { hidden: false, timeout: TIMEOUT });
            console.log('Suggestion 3 ignored successfully');
        })

    })
    describe('Select Repo', () => {
        test('Select default repo', async () => {
            console.log('Selecting default repo ...')
            // await dm_test_page.waitForSelector('button[title="Skip tutorial"]', { hidden: false, timeout: TIMEOUT })
            // await dm_test_page.click('button[title="Skip tutorial"]')
            await dm_test_page.waitForSelector('.collection__select-btn', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.collection__select-btn');
            await dm_test_page.waitForSelector('.mapping-step', { hidden: false, timeout: TIMEOUT });
            console.log('Default repo selected successfully');

        })
    })



    describe('Map Dataset', () => {

        test('Sort fields', async () => {
            console.log('Sorting fields ...')
            await dm_test_page.waitForSelector('.mapping__sort-icon', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.mapping__sort-icon');
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.click('.mapping__sort-icon');
            const elements_after_sort = await dm_test_page.$$eval('.mapping-chip', nodes => nodes.map(n => n.innerText));
            for (let i = 0; i < 5; i++) {
                expect(elements_after_sort[i]).toBe('Unmapped');
            }
            console.log('Fields sorted successfully');
        })
        // test.skip('Filter fields', async () => {
        //     await dm_test_page.waitForSelector('.mapping__filter-btn', { hidden: false, timeout: TIMEOUT });
        //     await dm_test_page.click('.mapping__filter-btn');
        //     await dm_test_page.waitForSelector('.mapping__filter-popover', { hidden: false, timeout: TIMEOUT });
        //     await dm_test_page.waitForSelector('.mapping__filter-popover > div > div > div > label:nth-child(3)', { hidden: false, timeout: TIMEOUT });
        //     await dm_test_page.click('.mapping__filter-popover > div > div > div > label:nth-child(3)');
        //     await dm_test_page.mouse.click(0, 0);
        //     const elements_after_filter = await dm_test_page.$$('.mapping-chip');
        //     expect(elements_after_filter.length).toBe(5);

        // })
        test('Map field 1', async () => {
            console.log('Mapping fields ...')
            await dm_test_page.waitForFunction(
                () => (document.querySelector('.mapping-header__indicator') as HTMLElement).innerText === '5/13 column headers still unmapped',
                { timeout: TIMEOUT }
            );
            await dm_test_page.waitForSelector('#Species .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.click('#Species .cde-fields__item-first div');
            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');
           
            console.log('Species mapped successfully');
        })

        test('Map field 2', async () => {
            console.log('Mapping fields ...')
            await dm_test_page.waitForFunction(
                () => (document.querySelector('.mapping-header__indicator') as HTMLElement).innerText === '4/13 column headers still unmapped',
                { timeout: TIMEOUT }
            );
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.waitForSelector('#Age .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.click('#Age .cde-fields__item-first div');
            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');
            console.log('Age mapped successfully');

        })

        test('Map field 3', async () => {
            console.log('Mapping fields ...')
            await dm_test_page.waitForFunction(
                () => (document.querySelector('.mapping-header__indicator') as HTMLElement).innerText === '3/13 column headers still unmapped',
                { timeout: TIMEOUT }
            );
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.waitForSelector('#StudyOutcomeMeasureType .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.click('#StudyOutcomeMeasureType .cde-fields__item-first div');
            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');
            console.log('Study mapped successfully');

        })

        test('Map field 4', async () => {
            console.log('Mapping fields ...')
            await dm_test_page.waitForFunction(
                () => (document.querySelector('.mapping-header__indicator') as HTMLElement).innerText === '2/13 column headers still unmapped',
                { timeout: TIMEOUT }
            );
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.waitForSelector('div[id="Impactor tip diameter - measurement"] .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.click('div[id="Impactor tip diameter - measurement"] .cde-fields__item-first div');
            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');
            console.log('Impactor mapped successfully');

        })

        test('Map field 5', async () => {
            console.log('Mapping fields ...')
            await dm_test_page.waitForFunction(
                () => (document.querySelector('.mapping-header__indicator') as HTMLElement).innerText === '1/13 column headers still unmapped',
                { timeout: TIMEOUT }
            );
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.waitForSelector('div[id="roto time"] .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.click('div[id="roto time"] .cde-fields__item-first div');
            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');
            console.log('Roto time mapped successfully');

        })

        test('Check fields', async () => {
            console.log('Checking fields ...')
            await dm_test_page.waitForFunction(
                () => (document.querySelector('.mapping-header__indicator') as HTMLElement).innerText === '0/13 column headers still unmapped',
                { timeout: TIMEOUT }
            );
            await dm_test_page.waitForTimeout(500);
            // await dm_test_page.waitForSelector('.mapping__filter-btn', { hidden: false, timeout: TIMEOUT });
            // await dm_test_page.click('.mapping__filter-btn');
            // await dm_test_page.waitForSelector('.mapping__filter-popover', { hidden: false, timeout: TIMEOUT });
            // await dm_test_page.waitForSelector('.mapping__filter-popover > div > div > div > label:nth-child(3)', { hidden: false, timeout: TIMEOUT });
            // await dm_test_page.click('.mapping__filter-popover > div > div > div > label:nth-child(3)');
            await dm_test_page.waitForSelector('.mapping-chip', { hidden: false, timeout: TIMEOUT });
            const elements_after_mapping = await dm_test_page.$$eval('.mapping-chip', nodes => nodes.map(n => n.innerText));
            for (let i = 0; i < 4; i++) {
                expect(elements_after_mapping[i]).toBe('Mapped to CDE');
            }
            console.log('Fields checked successfully');
        })

    })

    describe('Download Dataset', () => {
        test('Save Mapping', async () => {
            console.log('Saving mapping ...')
            const downloadPath = path.resolve(__dirname, 'downloads/DatasetMapping');
            await dm_test_page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath,
            });

            await dm_test_page.$$eval('button', (buttons, value) => {
                buttons.find(button => button.innerText === value).click();
            }, 'Save mapping');

            await new Promise(resolve => setTimeout(resolve, 6000));
            const filePath = path.join(downloadPath, 'datasetMapping.csv');
            expect(fs.existsSync(filePath)).toBeTruthy();
            console.log('Mapping saved successfully');
        })
    })

    describe('Compare Dataset', () => {
        test('Check downloaded CSV', async () => {
            console.log('Checking downloaded CSV ...')
            const downloadPath = path.resolve(__dirname, 'downloads/DatasetMapping');
            const filePath = path.join(downloadPath, 'datasetMapping.csv');
            const fileContents = fs.readFileSync(filePath, 'utf8');
            expect(fileContents.length).not.toBe(0);
            console.log('Downloaded CSV checked successfully');
        })

        test('Check CSV data', async () => {
            console.log('Checking CSV data ...')
            const species_element = await dm_test_page.waitForSelector('#Species .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            const species_inner_text = await dm_test_page.evaluate(el => el.innerText, species_element);

            const age_element = await dm_test_page.waitForSelector('#Age .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            const age_inner_text = await dm_test_page.evaluate(el => el.innerText, age_element);

            const StudyOutcomeMeasureType_element = await dm_test_page.waitForSelector('#StudyOutcomeMeasureType .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            const StudyOutcomeMeasureType_inner_text = await dm_test_page.evaluate(el => el.innerText, StudyOutcomeMeasureType_element);

            const Impactor_tip_diameter_element = await dm_test_page.waitForSelector('#Impactor\\ tip\\ diameter\\ -\\ measurement .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            const Impactor_tip_diameter_inner_text = await dm_test_page.evaluate(el => el.innerText, Impactor_tip_diameter_element);

            const roto_time_element = await dm_test_page.waitForSelector('#roto\\ time .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            const roto_time_inner_text = await dm_test_page.evaluate(el => el.innerText, roto_time_element);


            const expectedData = [
                { 'Variable Name (UI)': 'Subject', 'Title': 'Unique identification of  each mouse ID' },
                { 'Variable Name (UI)': 'Species', 'Title': species_inner_text },
                { 'Variable Name (UI)': 'Strain', 'Title': 'Strain of the mouse' },
                { 'Variable Name (UI)': 'Sex', 'Title': 'Sex of the mouse' },
                { 'Variable Name (UI)': 'Age', 'Title': age_inner_text },
                { 'Variable Name (UI)': 'Group', 'Title': 'Injury group assignment type' },
                { 'Variable Name (UI)': 'StudyInjModelTyp', 'Title': 'Traumatic Brain Injury (TBI) model type(s)' },
                { 'Variable Name (UI)': 'StudyOutcomeMeasureType', 'Title': StudyOutcomeMeasureType_inner_text },
                { 'Variable Name (UI)': 'Type of actuator used for impact', 'Title': 'Type of actuator used for impact' },
                { 'Variable Name (UI)': 'Impactor tip diameter - measurement', 'Title': Impactor_tip_diameter_inner_text },
                { 'Variable Name (UI)': 'roto time', 'Title': roto_time_inner_text },
                { 'Variable Name (UI)': 'Rotor rod - start speed', 'Title': 'Rotor rod test - start speed value' },
                { 'Variable Name (UI)': 'Rotor rod - final speed', 'Title': 'Rotor rod test - final speed value' },

            ];

            const downloadPath = path.resolve(__dirname, 'downloads/DatasetMapping');
            const filePath = path.join(downloadPath, 'datasetMapping.csv');

            const data = [];

            await new Promise<void>((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (row) => {
                        const filteredRow = {
                            'Variable Name (UI)': row['Variable Name (UI)'],
                            'Title': row['Title']
                        };
                        data.push(filteredRow);
                    })
                    .on('end', () => {
                        try {
                            expectedData.forEach(expected => {
                                expect(data).toContainEqual(expected);
                            });
                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    });

            });
            console.log('CSV data checked successfully');
        })
    })



});