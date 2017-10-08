'use strict';

var _ = require('lodash');

// data assumed list of stock results
// {id:"Nestle", "performance":0.25, "investement":, "numberStocks:"", "bank":}
function performanceMin(data) {
	return _.min(data, "performance").performance;
}

function performanceMax(data) {
	return _.max(data, "performance").performance;
}

function bestStocks(data) {
	var bestPerformance = performanceMax(data);
	return _.select(data, function(stock) {
		return stock.performance == bestPerformance;
	});
}

module.exports = {
	performanceMin: performanceMin,
	performanceMax: performanceMax,
	best: bestStocks
};