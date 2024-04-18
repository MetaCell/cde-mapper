import * as puppeteer from "puppeteer";
import 'expect-puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot'
expect.extend({ toMatchImageSnapshot })
const fs = require('fs');
const path = require('path');

const URL = process.env.url || "https://cde-mapper.dev.metacell.us/";
const TIMEOUT = 60000;


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
        test('Accept 1/3 suggestion', async () => {})
        test('Ignore 2/3 suggestion', async () => {})
        test('Accept 3/3 suggestion', async () => {})

    })

    describe('Map Dataset', () => { })

    describe('Download Dataset', () => { })

    describe('Compare Dataset', () => { })




});