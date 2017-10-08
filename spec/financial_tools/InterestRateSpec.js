describe("InterestRate", function() {
  var RateCalculator = require('../../financial_tools/interest_rate');

  describe("should compute correctly number of relevant days", function() {
    it("should consider 360 days for a full year", function() {
      let start = new Date("2016-01-01");
      let end = new Date("2017-01-01");
      expect(RateCalculator.numDaysWithInterest(start, end)).toEqual(360);
    });

    it("should consider correctly 31 days month as 30 commercial days", function() {
      let start = new Date("2017-06-10");
      let end = new Date("2017-08-31");
      expect(RateCalculator.numDaysWithInterest(start, end)).toEqual(80);
    });

    it("should consider february correctly for non leap year (start)", function() {
      let start = new Date("2017-02-28");
      let end = new Date("2017-04-11");
      expect(RateCalculator.numDaysWithInterest(start, end)).toEqual(41);
    });

    it("should consider february correctly for non leap year (end)", function() {
      let start = new Date("2017-01-11");
      let end = new Date("2017-02-28");
      expect(RateCalculator.numDaysWithInterest(start, end)).toEqual(49);
    });

    it("should consider february correctly for leap year (start)", function() {
      let start = new Date("2016-02-28");
      let end = new Date("2016-04-11");
      expect(RateCalculator.numDaysWithInterest(start, end)).toEqual(43);
    });

    it("should consider february correctly for non leap year (end)", function() {
      let start = new Date("2016-01-11");
      let end = new Date("2016-02-28");
      expect(RateCalculator.numDaysWithInterest(start, end)).toEqual(47);
    });

  });

  it("should compute correct rate for 1 year", function() {
    var testData = {};
    testData.deposit = 1000;
    testData.start = "2016-01-01";
    testData.end = "2017-01-01";
    testData.rate = 0.01;

    expect(RateCalculator.interest(testData)).toEqual(10);
  });


  it("should compute correct negative rate", function() {
    var testData = {};
    testData.deposit = 1000;
    testData.start = "2016-01-01";
    testData.end = "2017-01-01";
    testData.rate = -0.01;

    expect(RateCalculator.interest(testData)).toEqual(-10);
  });

  //demonstrates use of expected exceptions
  describe("#missing data", function() {
    it("should throw an exception if data invalid", function() {
      var testData = {};
      testData.deposit = 1000;
      testData.start = "2016-01-01"
      testData.start = "2017-01-01"
      //testData.rate = 0.01;
      expect(function() {
        RateCalculator.interest(testData);
      }).toThrowError("Missing Data");
    });
  });

});
