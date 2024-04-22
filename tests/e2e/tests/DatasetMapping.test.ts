import * as puppeteer from "puppeteer";
import 'expect-puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot'
expect.extend({ toMatchImageSnapshot })
const fs = require('fs');
const path = require('path');

const URL = process.env.url || "https://cde-mapper.dev.metacell.us/";
const TIMEOUT = 6000;


//SNAPSHOT:
const SNAPSHOT_OPTIONS = {
    customSnapshotsDir: `./tests/snapshots/DatasetMapping.test/`,
    comparisonMethod: 'ssim',
    failureThresholdType: 'percent',
    failureThreshold: 0.10
};


jest.setTimeout(400000);
let dm_test_browser: any;
let dm_test_page: any;

declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchImageSnapshot(options?: import('jest-image-snapshot').MatchImageSnapshotOptions): R;
        }
    }
}

describe('Control Panel Test', () => {


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

        });

        test('Upload dataset mapping file', async () => {
            await dm_test_page.waitForSelector('#datasetMappingFileDropzone')
            await dm_test_page.waitForSelector('#datasetMappingFileInput')
            const inputUploadHandle = await dm_test_page.waitForSelector('#datasetMappingFileInput');
            await inputUploadHandle.uploadFile('resources/cde_dictionary.csv');
            await dm_test_page.waitForFunction(
                () => document.querySelector('#datasetMappingFileDropzone').textContent === 'Selected file: cde_dictionary.csv',
                { timeout: TIMEOUT }
            );
        });

        test('Upload additional dataset mapping file', async () => {
            await dm_test_page.waitForSelector('#additionalDatasetMappingFilesDropzone')
            await dm_test_page.waitForSelector('#additionalDatasetMappingFilesInput')
            const inputUploadHandle = await dm_test_page.waitForSelector('#additionalDatasetMappingFilesInput');
            await inputUploadHandle.uploadFile('resources/cde_other_mappings.csv');
            await dm_test_page.waitForFunction(
                () => document.querySelector('#additionalDatasetMappingFilesDropzone').textContent === 'Selected files: cde_other_mappings.csv',
                { timeout: TIMEOUT }
            );
        });

        test('Upload dataset file', async () => {
            await dm_test_page.waitForSelector('#datasetFileDropzone')
            await dm_test_page.waitForSelector('#datasetFileInput')
            const inputUploadHandle = await dm_test_page.waitForSelector('#datasetFileInput');
            await inputUploadHandle.uploadFile('resources/cde_dataset.csv');
            await dm_test_page.waitForFunction(
                () => document.querySelector('#datasetFileDropzone').textContent === 'Selected file: cde_dataset.csv',
                { timeout: TIMEOUT }
            );
        });

        test('Submit files', async () => {
            await dm_test_page.waitForSelector('#submitButton', { timeout: TIMEOUT, disabled: false })
            await dm_test_page.click('#submitButton')
            await dm_test_page.waitForSelector('.mapping__start-btn', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.mapping__start-btn');
            await dm_test_page.waitForSelector('.repository__select-btn', { hidden: false, timeout: TIMEOUT });
        })


    })

    describe('Select Repo', () => {
        test('Select default repo', async () => {
            await dm_test_page.waitForSelector('.repository__select-btn', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.waitForSelector('button[title="Skip tutorial"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.click('button[title="Skip tutorial"]')
            await dm_test_page.click('.repository__select-btn');
            await dm_test_page.waitForSelector('.cde-suggestions__content', { hidden: false, timeout: TIMEOUT });

        })
    })

    describe('Go through Suggestions', () => {
        test('Accept 1/3 suggestion', async () => {
            await dm_test_page.waitForSelector('.suggestion-details > div > span', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.suggestion-details > div > span');
            await dm_test_page.waitForSelector('.suggestions__navigation-block > div > button:nth-child(2)');
            await dm_test_page.click('.suggestions__navigation-block > div > button:nth-child(2)');
        })
        test('Ignore 2/3 suggestion', async () => {
            await dm_test_page.waitForSelector('.suggestions__button-block > button:nth-child(1)', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.suggestions__button-block > button:nth-child(1)');
            await dm_test_page.waitForSelector('.suggestions__navigation-block > div > button:nth-child(2)');
            await dm_test_page.click('.suggestions__navigation-block > div > button:nth-child(2)');
        })
        test('Ignore 3/3 suggestion', async () => {
            await dm_test_page.waitForSelector('.suggestions__button-block > button:nth-child(1)', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.suggestions__button-block > button:nth-child(1)');
            await dm_test_page.waitForSelector('.suggestions__button-block > button:nth-child(2)', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.suggestions__button-block > button:nth-child(2)');
            await dm_test_page.waitForSelector('.mapping-step', { hidden: false, timeout: TIMEOUT });
        })

    })

    describe('Map Dataset', () => {

        test('Sort fields', async () => {
            await dm_test_page.waitForSelector('.mapping__sort-icon', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.mapping__sort-icon');
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.click('.mapping__sort-icon');
            const elements_after_sort = await dm_test_page.$$eval('.mapping-chip', nodes => nodes.map(n => n.innerText));
            for (let i = 0; i < 5; i++) {
                expect(elements_after_sort[i]).toBe('Unmapped');
            }
        })
        test('Filter fields', async () => {
            await dm_test_page.waitForSelector('.mapping__filter-btn', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.mapping__filter-btn');
            await dm_test_page.waitForSelector('.mapping__filter-popover', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.waitForSelector('.mapping__filter-popover > div > div > div > label:nth-child(3)', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.mapping__filter-popover > div > div > div > label:nth-child(3)');
            await dm_test_page.mouse.click(0, 0);
            const elements_after_filter = await dm_test_page.$$('.mapping-chip');
            expect(elements_after_filter.length).toBe(5);

        })
        test('Map fields', async () => {
            await dm_test_page.waitForFunction(
                () => (document.querySelector('.mapping-header__indicator') as HTMLElement).innerText === '5/13 column headers still unmapped',
                { timeout: TIMEOUT }
            );
            await dm_test_page.waitForSelector('#Species .cde-fields__item-first div', { hidden: false, timeout: TIMEOUT });
            // await dm_test_page.click('#Species .cde-fields__item-first div');
            await dm_test_page.waitForTimeout(500);
            await dm_test_page.click('#Species .cde-fields__item-first div');
            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');

            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');

            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');

            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');

            await dm_test_page.waitForSelector('input[placeholder="Search in multiple collections"]', { hidden: false, timeout: TIMEOUT })
            await dm_test_page.waitForSelector('.cde-field__popper li', { hidden: false, timeout: TIMEOUT });
            await dm_test_page.click('.cde-field__popper li');

        })

        test('Check fields', async () => {

            await dm_test_page.waitForFunction(
                () => (document.querySelector('.mapping-header__indicator') as HTMLElement).innerText === '0/13 column headers still unmapped',
                { timeout: TIMEOUT }
            );

            // await dm_test_page.waitForSelector('.mapping__filter-btn', { hidden: false, timeout: TIMEOUT });
            // await dm_test_page.click('.mapping__filter-btn');
            // await dm_test_page.waitForSelector('.mapping__filter-popover', { hidden: false, timeout: TIMEOUT });
            // await dm_test_page.waitForSelector('.mapping__filter-popover > div > div > div > label:nth-child(3)', { hidden: false, timeout: TIMEOUT });
            // await dm_test_page.click('.mapping__filter-popover > div > div > div > label:nth-child(3)');
            await dm_test_page.waitForSelector('.mapping-chip', { hidden: false, timeout: TIMEOUT });
            const elements_after_mapping = await dm_test_page.$$eval('.mapping-chip', nodes => nodes.map(n => n.innerText));
            for (let i = 0; i < 12; i++) {
                expect(elements_after_mapping[i]).toBe('Mapped to CDE');
            }
        })

    })

    describe('Download Dataset', () => { })

    describe('Compare Dataset', () => { })




});