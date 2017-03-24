var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
var testConf = require('./../config.json').testConf;
var cheerio = require('cheerio');

const MONTHS_TO_CHECK = 2

client
  .init()
  .url(testConf.startUrl)
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
  .then(function(){

    var availableAppointments = []

    for(var i=0; i < MONTHS_TO_CHECK; i++){
      client.getHTML('body')
        .then((html) => {
            var $ = cheerio.load(html),
                cells = $('.CELL'),
                month = $('#month').find('span').text(),
                year = $('#year').find('span').text();

            cells.map(function(){
              if($(this).find('div > span').text() === '1'){ // 1 in span == available appointment
                var day = $(this).find('a > span').text();
                var date = moment(Date.parse(day + '-' + month + '-' + year)).locale('de').format('D/MM/YYYY');
                console.log(date);
                // availableAppointments.push(date)
            	}
            });
        })

        .click('#labnextMonth')
    }

    // console.log(availableAppointments);
  })
  // .end();
