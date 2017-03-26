
/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
exports.toRes = function toRes(res, status=200) {
	return (err, thing) => {
		if (err) return res.status(500).send(err);

		if (thing && typeof thing.toObject==='function') {
			thing = thing.toObject();
		}
		res.status(status).json(thing);
	};
}

exports.parseMonthString = function parseMonthString(month) {
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
