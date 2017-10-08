'use strict';

var leapYear = require('leap-year');
var moment = require('moment');

// convention CH/Eu is 360 days with interest
// https://www.vermoegenszentrum.ch/conseils/articles/particuliers/lever-une-hypotheque/les-methodes-de-decompte-des-interets.html
// http://www.pambianco.net/new-page-2/programme-cfc/theorie/1ere-annee/les-interets/calcul-des-jours.html
// start and end should be date object
function numDaysWithInterest(start, end) {
	var days = 0;
	if (end.year()===start.year()) {
		if (end.month()===start.month()) {
			// within a month
			days = end.date()-start.date();
			return days;
		} 
		// within same year
		// count 30 days for each full months betweend start and end
		var numCompleteMonths = (end.month()-start.month()-1);
		days += 30 * numCompleteMonths;
		var startMonth = 30 - start.date();
		var endMonth = end.date();
		// add days of initial month
		// handle specific case february
		if (start.month()!==1 /*month starts at 0*/ ) { 
			// normal case
			days += startMonth>0 ? startMonth : 0;
		} else {
			if (leapYear(start.year()) && start.date()==29) {
				//last day is 29
				// no day counted for that month
			} else if (!leapYear(start.year()) && start.date()==28)  {
				// last day is 28
				// no day counted for that month
			} else {
				// normal case
				days += startMonth>0 ? startMonth : 0;
			}
		}
		// add day of final month
		// handle specific case february
		if (end.month()!==1 /*month starts at 0*/ ) { 
			// normal case
			days += endMonth>30 ? 30 : endMonth;
		} else {
			if (leapYear(end.year()) && end.date()==29) {
				//last day is 29
				// no day counted for that month
				days += 30;
			} else if (!leapYear(end.year()) && end.date()==28)  {
				// last day is 28
				// 30 days for that month
				days += 30;
			} else {
				// normal case
				days += endMonth>30 ? 30 : endMonth;
			}
		}

	} else {
		// different years
		days = 360*(end.year()-start.year());
	}

	return days;
}

// get Date object from javascript date format or CSV/xls format (also support FR)
function dateFromString(date, format) {
	if (!format) {
		return moment(date);
	}
	// try parsing csv format
	return moment(date, format);
}

// data should contain:
// start: start date
// end: end date
// rate: interest rate (ex: 0.02 -> 2%)
// deposit: initial account deposit
function interest(data) {
	if (!data || !data.start || !data.end || !data.deposit) {
		console.log("ERROR Interest calculation: missing data");
    	throw new Error("Missing Data");
	}

	var YEAR = 360; // 360 commercial days

	var startDate = dateFromString(data.start);
	var endDate = dateFromString(data.end);
	var numDays = numDaysWithInterest(startDate, endDate);
	return data.deposit*data.rate*(numDays/YEAR);
}

module.exports = {
	interest: interest,
	numDaysWithInterest: numDaysWithInterest,
	dateFromString: dateFromString
};