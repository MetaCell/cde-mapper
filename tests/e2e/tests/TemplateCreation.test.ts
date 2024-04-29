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
            headless: true,
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
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForFunction(
                (selector, count) => document.querySelectorAll(selector).length === count,
                { timeout: TIMEOUT },
                dic_field_selector,
                11
            );
        })


        test('Add Title', async () => {
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[1].click();
            await elements[1].type('Automated Testing Dataset');
        })

        test('Add Unit of Measure', async () => {
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[2].click();
            await elements[2].type('percentage');

        })

        test('Add Description', async () => {
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[3].click();
            await elements[3].type('description');
        })

        test('Add DataType', async () => {
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[4].click();
            await elements[4].type('int');
        })

        test('Add Multiple Values', async () => {
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[5].click();
            await elements[5].type('multiple values');


        })

        test('Add Permitted values', async () => {
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[6].click();
            await elements[6].type('0-100');
        })

        test('Add Minimum value', async () => {
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[7].click();
            await elements[7].type('0');
        })

        test('Add Maximum value', async () => {
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[8].click();
            await elements[8].type('100');
        })

        test('Add Comment', async () => {
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[9].click();
            await elements[9].type('comment');
        })

        test('Add Abbreviation', async () => {

            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            const elements = await tc_test_page.$$(dic_field_selector);
            await elements[0].click();
            await elements[0].type('Aut_Test_dataset');
        })


        test('Confirm custom dictionary', async () => {

            await tc_test_page.waitForSelector('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedInfo.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorInfo', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedInfo.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorInfo');
        })

        test('Select custom dictionary', async () => {
            await tc_test_page.waitForSelector('#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth');
            await tc_test_page.type('#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth', 'Aut_Test_dataset');

            const selector = 'li > p.MuiTypography-root.MuiTypography-body1';
            await tc_test_page.waitForFunction(
                (selector, text) => Array.from(document.querySelectorAll(selector), element => element.textContent).includes(text),
                { timeout: TIMEOUT },
                selector,
                'Aut_Test_dataset'
            );
            // await tc_test_page.waitForTimeout('1000');
            // await tc_test_page.waitForFunction(
            //     (selector) => document.querySelectorAll(selector).length === 1,
            //     { timeout: TIMEOUT },
            //     selector
            // );

            await tc_test_page.waitForFunction(
                (selector, delay) => {
                    return new Promise((resolve) => {
                        const intervalId = setInterval(() => {
                            const elements = document.querySelectorAll(selector);
                            if (elements.length === 1) {
                                clearInterval(intervalId);
                                resolve(true);
                            }
                        }, 100); // check every 100ms

                        setTimeout(() => {
                            clearInterval(intervalId);
                        }, delay);
                    });
                },
                { timeout: TIMEOUT },
                selector,
                15000 // check for 10 seconds
            );

            // const elements = await tc_test_page.$$('.MuiBox-root li');
            // const targetElement = elements.find(element => element.textContent === 'Aut_Test_dataset');
            // await targetElement.click();
            await tc_test_page.waitForSelector('.MuiBox-root li', { hidden: false, timeout: TIMEOUT })
            await tc_test_page.click('.MuiBox-root li');
        })


    })

    describe('Save Template', () => {

        test('Check fields', async () => {
            await tc_test_page.waitForSelector('div > div.MuiStack-root > div.MuiBox-root:nth-child(3)', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.waitForSelector('div > div.MuiStack-root > div.MuiBox-root:nth-child(4)', { timeout: TIMEOUT, hidden: false });
            const selector = 'div > div.MuiStack-root > div.MuiBox-root:nth-child(4)';
            const elementText = await tc_test_page.$eval(selector, element => element.textContent);
            expect(elementText).toBe('Aut_Test_dataset');

        })

        test('Save/Create template', async () => {
            const downloadPath = path.resolve(__dirname, 'downloads/TemplateCreation');
            // Set the download behavior
            await tc_test_page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath,
            });

            await tc_test_page.waitForSelector('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary');

            // Wait for the download to complete
            await new Promise(resolve => setTimeout(resolve, 6000));
            // Check if the file exists
            const datasetPath = path.join(downloadPath, 'dataset.csv');
            const mappingPath = path.join(downloadPath, 'datasetMapping.csv');

            expect(fs.existsSync(datasetPath)).toBeTruthy();
            expect(fs.existsSync(mappingPath)).toBeTruthy();
        })
    })

    describe('Check Template', () => {

        test('Check CSV data', async () => { 

        })
     })




});