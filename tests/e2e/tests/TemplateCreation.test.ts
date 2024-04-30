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
            console.log('Opening the template page ...')
            await tc_test_page.waitForSelector('#createTemplateButton', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('#createTemplateButton');
            await tc_test_page.waitForSelector('h6.MuiTypography-root.MuiTypography-h6', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.waitForFunction(
                () => (document.querySelector('h6.MuiTypography-root.MuiTypography-h6') as HTMLElement).innerText === 'Create template',
                { timeout: TIMEOUT }
            );
            console.log('Template page opened successfully');

        });

    })

    describe('Create Template', () => {

        test('Choose CDE', async () => {
            console.log('Choosing CDE ...')
            await tc_test_page.waitForSelector('div > div.MuiStack-root > div.MuiBox-root:nth-child(2)', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('div > div.MuiStack-root > div.MuiBox-root:nth-child(2)');
            await tc_test_page.waitForSelector('.MuiBox-root li', { hidden: false, timeout: TIMEOUT })
            await tc_test_page.click('.MuiBox-root li');
            console.log('CDE chosen successfully');

        })

        test('Add Dictionary field', async () => {
            console.log('Adding Dictionary field ...')
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
            console.log('Dictionary field editor opened successfully');
        })


        test('Add Title', async () => {
            console.log('Adding Title ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[1].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[1].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[1].type('Automated Testing Dataset');
            await tc_test_page.waitForTimeout(1000);
            console.log('Title added successfully');
        })

        test('Add Unit of Measure', async () => {
            console.log('Adding Unit of Measure ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[2].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[2].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[2].type('percentage');
            await tc_test_page.waitForTimeout(1000);
            console.log('Unit of Measure added successfully');

        })

        test('Add Description', async () => {
            console.log('Adding Description ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[3].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[3].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[3].type('description');
            await tc_test_page.waitForTimeout(1000);
            console.log('Description added successfully');
        })

        test('Add DataType', async () => {
            console.log('Adding DataType ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[4].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[4].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[4].type('int');
            await tc_test_page.waitForTimeout(1000);
            console.log('DataType added successfully');
        })

        test('Add Multiple Values', async () => {
            console.log('Adding Multiple Values ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[5].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[5].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[5].type('multiple values');
            await tc_test_page.waitForTimeout(1000);
            console.log('Multiple Values added successfully');

        })

        test('Add Permitted values', async () => {
            console.log('Adding Permitted values ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[6].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[6].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[6].type('0-100');
            await tc_test_page.waitForTimeout(1000);
            console.log('Permitted values added successfully');
        })

        test('Add Minimum value', async () => {
            console.log('Adding Minimum value ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[7].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[7].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[7].type('0');
            await tc_test_page.waitForTimeout(1000);
            console.log('Minimum value added successfully');

        })

        test('Add Maximum value', async () => {
            console.log('Adding Maximum value ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[8].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[8].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[8].type('100');
            await tc_test_page.waitForTimeout(1000);
            console.log('Maximum value added successfully');
        })

        test('Add Comment', async () => {
            console.log('Adding Comment ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[9].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[9].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[9].type('comment');
            await tc_test_page.waitForTimeout(1000);
            console.log('Comment added successfully');
        })

        test('Add Abbreviation', async () => {
            console.log('Adding Abbreviation ...')
            const dic_field_selector = '#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth';
            await tc_test_page.waitForSelector(dic_field_selector, { hidden: false, timeout: TIMEOUT });
            let elements = await tc_test_page.$$(dic_field_selector);
            await elements[0].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[0].click();
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[0].type('Aut_Test_dataset');
            await tc_test_page.waitForTimeout(3000);
            elements = await tc_test_page.$$(dic_field_selector);
            await elements[1].click();
            console.log('Abbreviation added successfully');
        })


        test('Confirm custom dictionary', async () => {
            console.log('Confirming custom dictionary ...')
            await tc_test_page.waitForSelector('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedInfo.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorInfo', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedInfo.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorInfo');
            console.log('Custom dictionary confirmed successfully');
        })

        test('Select custom dictionary', async () => {
            console.log('Selecting custom dictionary ...')
            await tc_test_page.waitForSelector('#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth');
            await tc_test_page.type('#simple-popper .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth', 'Aut_Test_dataset');
            await tc_test_page.waitForTimeout(3000);
            await tc_test_page.waitForSelector('li > p.MuiTypography-root.MuiTypography-body1', { timeout: TIMEOUT, hidden: false });
            const selector = 'li > p.MuiTypography-root.MuiTypography-body1';
            await tc_test_page.waitForFunction(
                (selector, text) => Array.from(document.querySelectorAll(selector), element => element.textContent).includes(text),
                { timeout: 10000 },
                selector,
                'Aut_Test_dataset'
            );
          
            await tc_test_page.waitForFunction(
                (selector, delay) => {
                    return new Promise((resolve) => {
                        const intervalId = setInterval(() => {
                            const elements = document.querySelectorAll(selector);
                            if (elements.length === 1) {
                                clearInterval(intervalId);
                                resolve(true);
                            }
                        }, 100);

                        setTimeout(() => {
                            clearInterval(intervalId);
                        }, delay);
                    });
                },
                { timeout: TIMEOUT },
                selector,
                15000 
            );

            await tc_test_page.waitForSelector('.MuiBox-root li', { hidden: false, timeout: TIMEOUT })
            await tc_test_page.click('.MuiBox-root li');
            console.log('Custom dictionary selected successfully');
        })


    })

    describe('Save Template', () => {

        test('Check fields', async () => {
            console.log('Checking fields ...')
            await tc_test_page.waitForSelector('div > div.MuiStack-root > div.MuiBox-root:nth-child(3)', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.waitForSelector('div > div.MuiStack-root > div.MuiBox-root:nth-child(4)', { timeout: TIMEOUT, hidden: false });
            const selector = 'div > div.MuiStack-root > div.MuiBox-root:nth-child(4)';
            const elementText = await tc_test_page.$eval(selector, element => element.textContent);
            expect(elementText).toBe('Aut_Test_dataset');
            console.log('Fields checked successfully');

        })

        test('Save/Create template', async () => {
            console.log('Saving template ...')
            const downloadPath = path.resolve(__dirname, 'downloads/TemplateCreation');
            await tc_test_page._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: downloadPath,
            });

            await tc_test_page.waitForSelector('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary', { timeout: TIMEOUT, hidden: false });
            await tc_test_page.click('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary');

            await new Promise(resolve => setTimeout(resolve, 6000));
            const datasetPath = path.join(downloadPath, 'dataset.csv');
            const mappingPath = path.join(downloadPath, 'datasetMapping.csv');

            expect(fs.existsSync(datasetPath)).toBeTruthy();
            expect(fs.existsSync(mappingPath)).toBeTruthy();
            console.log('Template saved successfully');
        })
    })

    describe.skip('Check Template', () => {

        test('Check CSV data', async () => {
            console.log('Checking CSV data ...')


            console.log('CSV data checked successfully');
        })
    })




});