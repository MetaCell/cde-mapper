import * as puppeteer from "puppeteer";
import 'expect-puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot'
expect.extend({ toMatchImageSnapshot })
const fs = require('fs');
const path = require('path');
import * as csv from 'csv-parser';


const URL = process.env.url || "https://cde-mapper.dev.metacell.us/";
const TIMEOUT = 6000;


//SNAPSHOT:
const SNAPSHOT_OPTIONS = {
    customSnapshotsDir: `./tests/snapshots/TemplateCreation.test/`,
    comparisonMethod: 'ssim',
    failureThresholdType: 'percent',
    failureThreshold: 0.10
};


jest.setTimeout(400000);
let tc_test_browser: any;
let tc_test_page: any;

declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchImageSnapshot(options?: import('jest-image-snapshot').MatchImageSnapshotOptions): R;
        }
    }
}

describe('CDE: Template Creation Test', () => {


    beforeAll(async () => {
        tc_test_browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox', "--ignore-certificate-errors"],
            headless: false,
            devtools: false,
            defaultViewport: {
                width: 1600,
                height: 1000,
            },
        });
        tc_test_page = await tc_test_browser.newPage();
    });

    afterAll(async () => {
        await tc_test_browser.close();
    });

    describe('Open Template Creation', () => {

        test('Load the page', async () => {
            console.log('Loading the page ...')

            await tc_test_page.goto(URL);
            await tc_test_page.waitForSelector('#datasetMappingFileDropzone', { timeout: TIMEOUT, hidden: false });
            console.log(tc_test_page.url());
            console.log('Page loaded successfully');

        });

        test('Open template page', async () => {
            await tc_test_page.waitForSelector('#createTemplateButton', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('#createTemplateButton');
            await tc_test_page.waitForSelector('h6.MuiTypography-root.MuiTypography-h6', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.waitForFunction(
                () => (document.querySelector('h6.MuiTypography-root.MuiTypography-h6') as HTMLElement).innerText === 'Create template',
                { timeout: TIMEOUT }
            );

        });

    })

    describe('Create Template', () => {

        test('Choose CDE', async () => {
            await tc_test_page.waitForSelector('div > div.MuiStack-root > div.MuiBox-root:nth-child(2)', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('div > div.MuiStack-root > div.MuiBox-root:nth-child(2)');
            await tc_test_page.waitForSelector('.MuiBox-root li', { hidden: false, timeout: TIMEOUT })
            await tc_test_page.click('.MuiBox-root li');

        })

        test('Add Dictionary field', async () => {
            await tc_test_page.waitForSelector('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorPrimary:first-of-type', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorPrimary:first-of-type');
            await tc_test_page.waitForSelector('div > div.MuiStack-root > div.MuiBox-root:nth-child(4)', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('div > div.MuiStack-root > div.MuiBox-root:nth-child(4)');
            await tc_test_page.waitForSelector('#simple-popper .MuiButtonBase-root.MuiButton-root.MuiButton-text', { hidden: false, timeout: TIMEOUT })
            await tc_test_page.click('#simple-popper .MuiButtonBase-root.MuiButton-root.MuiButton-text')
            await tc_test_page.waitForSelector('#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth', { hidden: false, timeout: TIMEOUT })

        })

    })

    describe('Save Template', () => {})

    describe('Check Template', () => {})

   


});