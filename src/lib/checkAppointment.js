const webdriverio = require('webdriverio');
const cheerio = require('cheerio');
const config = require('config');

const options = { desiredCapabilities: { browserName: 'chrome' } };
const client = webdriverio.remote(options);
const logger = require('../../config/winston');
const { parseMonthString } = require('./util');

// const { parseMonthString } = require('./util.js');
//
// const MONTHS_TO_CHECK = 2;
const availableAppointments = [];

const getFreeAppoitments = (html) => {
  logger.info('getting free appoitments');

  const $ = cheerio.load(html);
  const cells = $('.CELL');
  const month = parseMonthString($('#month').find('span').text());
  const year = $('#year').find('span').text();

  cells.map(() => {
    if ($(this).find('div > span').text() === '1') {
      const day = $(this).find('a > span').text();
      const date = `${day} - ${month} - ${year}`;
      logger.info(date);
      availableAppointments.push(date);
    }
  });
};

logger.info('Start webdriverio');
client
  .init()
  .url(config.get('berlinde.url'))
  .click('#btnTerminBuchen')
  .selectByValue('#cobStaat', 160) // Staatsangehörigkeit
  .selectByValue('#cobFamAngInBerlin', 'Nein') // Familienangehörigen in EU Ja / Nein
  .selectByValue('#cobAnliegen', 305304) // Anliegen *
  .click('#cbZurKenntnis')
  .click('#labNextpage')
  .setValue('#tfFirstName', 'Test') // Vorname
  .setValue('#tfLastName', 'Test') // Nachname
  .selectByValue('#cobGebDatumTag', 1) // Geb. Datum
  .selectByValue('#cobGebDatumMonat', 1)
  .setValue('#tfGebDatumJahr', 2000)
  .selectByValue('#cobVPers', 1) // Anzahl der Personen
  .setValue('#tfMail', 'test@gmail.com') // Email
  .selectByValue('#cobGenehmigungBereitsVorhanden', 'Ja') // Besitzen Sie bereits eine Aufenthaltserlaubnis ?
  .setValue('#tfEtNr', '12345') // Nummer der Aufenthaltserlaubnis
  .click('#txtNextpage') // double click on next button...bug?
  .click('#txtNextpage')
  .getHTML('body')
  .then((html) => {
    getFreeAppoitments(html);
    logger.info('availableAppointments: ', availableAppointments);
  })
  .click('#labnextMonth');
