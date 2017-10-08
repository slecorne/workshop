'use strict';



// convention CH/Eu is 360 days with interest
// https://www.vermoegenszentrum.ch/conseils/articles/particuliers/lever-une-hypotheque/les-methodes-de-decompte-des-interets.html
// http://www.pambianco.net/new-page-2/programme-cfc/theorie/1ere-annee/les-interets/calcul-des-jours.html
// start and end should be date object
function numDaysWithInterest(start, end) {
	var days = 0;
	if (end.getYear()===start.getYear()) {
		if (end.getMonth()===start.getMonth()) {
			// within a month
			days = end.getDay()-start.getDay();
			return days;
		} 
		// within same year
		// count 30 days for each full months betweend start and end
		days = 30*(end.getMonth()-start.getMonth()-1);
		// add days of initial month
		var startMonth = 30 - start.getDay();
		days += startMonth>0 ? startMonth : 0;
		var endMonth = start.getDay();
		days += endMonth>30 ? 30 : endMonth;
		// add day of final month
	} else {
		// different years
		days = 360*(end.getYear()-start.getYear());

	}
	if (end.getMonth()!==start.getMonth()) {
		days+= 30*(end.getMonth()-start.getMonth());
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