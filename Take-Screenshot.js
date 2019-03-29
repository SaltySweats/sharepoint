// capture.js
// https://github.com/Microsoft/nodejstools/wiki/Advanced-Debugging
// https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagegotourl-options

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')

function readUrlList() {

    var fs = require('fs'),
    readline = require('readline');

    var array = fs.readFileSync('.txt').toString().split("\n");

    return array;
};

const captureScreenshots = async () => {

    var siteUrls = readUrlList().slice(1,5);

    var i = 0;
    var lLength = siteUrls.length;

    for (site in siteUrls) {

        var pageUrl = siteUrls[site].trim();

        try {

            // Get new browser process every 100 pages. THIS may no longer be needed.
            if (i % 100 == 0) {

                browser = await puppeteer.launch();
                page = await browser.newPage();
                //await page.setViewport({ width: 1920, height: 800 });

                page.on('dialog', async dialog => { console.log(dialog.message()); await dialog.dismiss(); });

                console.log('Recycling Browser')
            }

            i++;

            console.log(`Loading: ${i} of ${lLength}  ${pageUrl}`);
            await page.goto(pageUrl);
            //await page.waitForNavigation({ 'waitUntil': 'waitForNavigation' });
            await page.waitFor('body');

            pageUrl = pageUrl.replace('https://gmweb.gm.com/','').replace(/\//ig,'.');
            //console.log(pageUrl);

            var fileName = `Screenshots\\${pageUrl}.png`;
            await page.screenshot({ path: fileName, fullPage: true })
        }
        catch (ex) {

            console.log(ex);
        }
    }

    await browser.close();
    console.log("Done");
}

captureScreenshots()

//Example
/*
captureScreenshots("c:\file1.txt")
console.log('1')
captureScreenshots("c:\file1.txt")
console.log('2')
captureScreenshots("c:\file1.txt")
captureScreenshots("c:\file1.txt")
*/