var cheerio = require('cheerio');
var moment = require('moment');
var fs = require('fs');

function readModuleFile(path, callback) {
    try {
        var filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

function parseMonthString(month) {
	if (typeof month !== 'string') {
		throw new Error('month shoud be a string');
	}

	switch (month) {
		case 'Januar':
			return '01'
			break;
		case 'Februar':
			return '02'
			break;
		case 'März':
			return '03'
			break;
		case 'April':
			return '04'
			break;
		case 'Mai':
			return '05'
			break;
		case 'Juni':
			return '06'
			break;
		case 'Juli':
			return '07'
			break;
		case 'August':
			return '08'
			break;
		case 'September':
			return '09'
			break;
		case 'Oktober':
			return '10'
			break;
		case 'November':
			return '11'
			break;
		case 'Dezember':
			return '12'
			break;
		default:
			return 01
	}
}

readModuleFile('./tablewithappointments.html', function (err, html) {

    var $ = cheerio.load(html),
        cells = $('.CELL'),
        month = $('#month').find('span').text(),
        year = $('#year').find('span').text(),
        availableAppointments = [];

    cells.map(function(){
      if($(this).find('div > span').text() === '1'){ // 1 in span == available appointment
        var day = $(this).find('a > span').text();
        var date = moment(Date.parse(day + '-' + month + '-' + year)).locale('de').format('D/MM/YYYY');
        availableAppointments.push(date)
    	}
    });

    console.log(availableAppointments);

});
