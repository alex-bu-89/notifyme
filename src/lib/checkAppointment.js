const webdriverio = require('webdriverio');
const config = require('config');

const options = { desiredCapabilities: { browserName: 'chrome' } };
const client = webdriverio.remote(options);
const logger = require('../../config/winston');
// const { parseMonthString } = require('./util.js');
//
// const MONTHS_TO_CHECK = 2;
// const availableAppointments = [];

// let setFreeAppoitments = (html) => {
//   const $ = cheerio.load(html),
//     cells = $('.CELL'),
//     month = parseMonthString($('#month').find('span').text()),
//     year = $('#year').find('span').text();
//
//   cells.map(function() {
//     console.log($(this).find('div > span').text());
//     if ($(this).find('div > span').text() === '1') {
//
//       const day = $(this).find('a > span').text();
//       const date = day + '-' + month + '-' + year;
//       console.log(date);
//       availableAppointments.push(date)
//     }
//   });
// }
logger.info('Start webdriverio');
logger.info(logger);
// client
//   .init()
//   .url(config.get('berlinde.url'))
//   .click('#btnTerminBuchen')
//   .selectByValue('#cobStaat', 160) // Staatsangehörigkeit
//   .selectByValue('#cobFamAngInBerlin', 'Nein') // Familienangehörigen in EU Ja / Nein
//   .selectByValue('#cobAnliegen', 305304) // Anliegen *
//   .click('#cbZurKenntnis')
//   .click('#labNextpage')
//   .setValue('#tfFirstName', 'Test') // Vorname
//   .setValue('#tfLastName', 'Test') // Nachname
//   .selectByValue('#cobGebDatumTag', 1) // Geb. Datum
//   .selectByValue('#cobGebDatumMonat', 1)
//   .setValue('#tfGebDatumJahr', 2000)
//   .selectByValue('#cobVPers', 1) // Anzahl der Personen
//   .setValue('#tfMail', 'test@gmail.com') // Email
//   .selectByValue('#cobGenehmigungBereitsVorhanden', 'Ja') // Besitzen Sie bereits eine Aufenthaltserlaubnis ?
//   .setValue('#tfEtNr', '12345') // Nummer der Aufenthaltserlaubnis
//   .click('#txtNextpage') // double click on next button...bug?
//   .click('#txtNextpage')
//   .getHTML('body')
//   .then((html) => {
//     logger.info('Html result');
//     logger.debug(html);
//   })
//   .click('#labnextMonth');
