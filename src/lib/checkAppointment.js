var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
var testConf = require('./src/config.json').testConf;

client
  .init()
  .url(testConf.startUrl)
  .click('#btnTerminBuchen')
  .selectByValue('#cobStaat', 160) // Staatsangehörigkeit
  .pause(1000)
  .selectByValue('#cobFamAngInBerlin', 'Nein') // Familienangehörigen in EU Ja / Nein
  .pause(1000)
  .selectByValue('#cobAnliegen', 305304) // Anliegen *
  .pause(1000)
  .click('#cbZurKenntnis')
  .click('#labNextpage')
  .pause(1000)
  .setValue('#tfFirstName', 'Test') // Vorname
  .setValue('#tfLastName', 'Test') // Nachname
  .selectByValue('#cobGebDatumTag', 1) // Geb. Datum
  .selectByValue('#cobGebDatumMonat', 1)
  .setValue('#tfGebDatumJahr', 2000)
  .selectByValue('#cobVPers', 1) // Anzahl der Personen
  .setValue('#tfMail', 'test@gmail.com') // Email
  .selectByValue('#cobGenehmigungBereitsVorhanden', 'Ja') // Besitzen Sie bereits eine Aufenthaltserlaubnis ?
  .pause(1000)
  .setValue('#tfEtNr', '12345') // Nummer der Aufenthaltserlaubnis
  .click('#txtNextpage') // double click on next button...bug?
  .click('#txtNextpage');
  // .end();
