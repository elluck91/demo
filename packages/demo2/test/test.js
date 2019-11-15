var request = require("request"),
  assert = require('assert'),
  demo1 = require("../server.js"),
  base_url = "http://localhost:9002/";

describe("DEMO_2 Server", function () {
  describe("GET /", function () {
    it("returns status code 200", function (done) {
      request.get(base_url, function (error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it("returns DEMO_2", function (done) {
      request.get(base_url, function (error, response, body) {
        assert.equal("DEMO_2 on branch master", body);
        demo1.closeServer();
        done();
      });
    });
  });
});