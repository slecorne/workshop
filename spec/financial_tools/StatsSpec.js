describe("Stats", function() {
  var Stats = require('../../financial_tools/stats');

  it("should compute stats correctly", function() {
    var nestle = {id:"Nestle", "performance":0.25, "investement":"120000", "numberStocks":120, "bank":"CS"};
    var nokia = {id:"Nokia", "performance":0.15, "investement":"1000", "numberStocks":1000, "bank":"UBS"};
    var stocks= [nestle, nokia];
    expect(Stats.performanceMin(stocks)).toEqual(0.15);
    expect(Stats.performanceMax(stocks)).toEqual(0.25);
  });

  it("should get best performance stock correctly", function() {
    var nestle = {id:"Nestle", "performance":0.25, "investement":"120000", "numberStocks":120, "bank":"CS"};
    var nokia = {id:"Nokia", "performance":0.15, "investement":"1000", "numberStocks":1000, "bank":"UBS"};
    var stocks= [nestle, nokia];
    expect(Stats.best(stocks)).toEqual([nestle]);
  });

});
