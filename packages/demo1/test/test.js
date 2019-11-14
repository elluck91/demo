var request = require("request"),
    assert = require('assert'),
    demo1 = require("../server.js"),
    base_url = "http://localhost:9001/";

describe("DEMO_1 Server", function() {
  describe("GET /", function() {
    this.timeout(1000);
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it("returns DEMO_1", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal("DEMO_1", body);
        demo1.closeServer();
        done();
      });
    });
  });
});