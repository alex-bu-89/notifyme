const config = require('config');
const webdriverio = require('webdriverio');
const logger = require('../../config/logger');

const options = { desiredCapabilities: { browserName: 'chrome' } };
// const options = { desiredCapabilities: { browserName: 'phantomjs' } };
const client = webdriverio.remote(options);

module.exports.get = async (ctx) => {
  logger.info('Start webdriverio');

  client
    .init()
    .url(config.get('startUrl'))
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
      logger.info(html);

      ctx.response.body = {
        status: 200,
        data: 'working',
      };
    })
    // .end()
    .catch((error) => {
      logger.error(error);
      throw error;
    });
};
