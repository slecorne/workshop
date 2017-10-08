'use strict';

var leapYear = require('leap-year');


// convention CH/Eu is 360 days with interest
// https://www.vermoegenszentrum.ch/conseils/articles/particuliers/lever-une-hypotheque/les-methodes-de-decompte-des-interets.html
// http://www.pambianco.net/new-page-2/programme-cfc/theorie/1ere-annee/les-interets/calcul-des-jours.html
// start and end should be date object
function numDaysWithInterest(start, end) {
	var days = 0;
	if (end.getYear()===start.getYear()) {
		if (end.getMonth()===start.getMonth()) {
			// within a month
			days = end.getUTCDate()-start.getUTCDate();
			return days;
		} 
		// within same year
		// count 30 days for each full months betweend start and end
		var numCompleteMonths = (end.getMonth()-start.getMonth()-1);
		days += 30 * numCompleteMonths;
		var startMonth = 30 - start.getUTCDate();
		var endMonth = end.getUTCDate();
		// add days of initial month
		// handle specific case february
		if (start.getMonth()!==1 /*getMonth starts at 0*/ ) { 
			// normal case
			days += startMonth>0 ? startMonth : 0;
		} else {
			if (leapYear(start.getYear()) && start.getUTCDate()==29) {
				//last day is 29
				// no day counted for that month
			} else if (!leapYear(start.getYear()) && start.getUTCDate()==28)  {
				// last day is 28
				// no day counted for that month
			} else {
				// normal case
				days += startMonth>0 ? startMonth : 0;
			}
		}
		// add day of final month
		// handle specific case february
		if (end.getMonth()!==1 /*getMonth starts at 0*/ ) { 
			// normal case
			days += endMonth>30 ? 30 : endMonth;
		} else {
			if (leapYear(end.getYear()) && end.getUTCDate()==29) {
				//last day is 29
				// no day counted for that month
				days += 30;
			} else if (!leapYear(end.getYear()) && end.getUTCDate()==28)  {
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
		days = 360*(end.getYear()-start.getYear());
	}

	return days;
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

	var startDate = new Date(data.start);
	var endDate = new Date(data.end);
	var numDays = numDaysWithInterest(startDate, endDate);
	return data.deposit*data.rate*(numDays/YEAR);
}

module.exports = {
	interest: interest,
	numDaysWithInterest: numDaysWithInterest
};