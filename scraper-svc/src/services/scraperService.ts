import puppeteer from 'puppeteer';
const screenshot = './berlin-de.screenshot.png';
const startUrl = 'https://formular.berlin.de/xima-forms-29/get/14963116144270000?mandantid=/OTVBerlin_LABO_XIMA/000-01/instantiationTasks.properties';

async function getTermins() {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(startUrl, { waitUntil: 'networkidle2' });

        // main page
        await page.click('#btnTerminBuchen');

        await page.waitForSelector('#cobStaat', {visible: true});

        await page.evaluate(() => {
            const element: HTMLSelectElement = document.querySelector('#cobStaat');
            const option: HTMLOptionElement = document.querySelector('#cobStaat > option[value="160"]');
            const event: any = new Event('change', { bubbles: true });

            option.selected = true;
            event.simulated = true;
            element.dispatchEvent(event);
        });

        // await page.click('#cobStaat');
        // await page.waitFor(1000);

        await page.evaluate(() => {debugger;});
        // await page.select('#cobStaat', '160');

        await page.waitForSelector('#cobFamAngInBerlin', {visible: true});
        await page.click('#cobFamAngInBerlin');
        await page.select('#cobFamAngInBerlin', 'Nein');

        await page.waitForSelector('#cobAnliegen', {visible: true});
        await page.click('#cobAnliegen');
        await page.select('#cobAnliegen', '305304');

        await page.waitForSelector('#cbZurKenntnis', {visible: true});
        await page.click('#cbZurKenntnis');
        await page.click('#labNextpage');

        await page.waitFor(10000);
        // await page.evaluate(() => {debugger;});

        // .click('#cbZurKenntnis')
        // .click('#labNextpage')
        // .setValue('#tfFirstName', 'Test') // Vorname
        // .setValue('#tfLastName', 'Test') // Nachname
        // .selectByValue('#cobGebDatumTag', 1) // Geb. Datum
        // .selectByValue('#cobGebDatumMonat', 1)
        // .setValue('#tfGebDatumJahr', 2000)
        // .selectByValue('#cobVPers', 1) // Anzahl der Personen
        // .setValue('#tfMail', 'test@gmail.com') // Email
        // .selectByValue('#cobGenehmigungBereitsVorhanden', 'Ja') // Besitzen Sie bereits eine Aufenthaltserlaubnis ?
        // .setValue('#tfEtNr', '12345') // Nummer der Aufenthaltserlaubnis
        // .click('#txtNextpage') // double click on next button...bug?
        // .click('#txtNextpage')

        // await page.screenshot({ path: screenshot });
        await browser.close();
    } catch (err) {
        await browser.close();
        throw err;
    }
}

export default {
    getTermins
};
