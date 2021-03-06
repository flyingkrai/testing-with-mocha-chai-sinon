var
  expect = require('chai').expect,
  sinon = require('sinon'),
  hex2rgb = require('../lib/hex2rgb');

describe("HEX2RGB Lib", function () {

  describe("#convert", function () {

    it("should call #parse once", function (done) {
      sinon.spy(hex2rgb, "parse");

      hex2rgb.convert("#fff", function (err, result) {
        expect(hex2rgb.parse.calledOnce).to.be.true;
        // hex2rgb.parse.args[0][0] - stands for called once and first arg
        expect(hex2rgb.parse.args[0][0]).to.be.an('array').with.length(6);

        hex2rgb.parse.restore();
        done();
      });
    });

    it('should always return the result of #parse', function (done) {
      sinon.stub(hex2rgb, "parse").returns([0, 0, 200]);

      hex2rgb.convert("#fff", function (err, result) {
        expect(result).to.deep.equal([0, 0, 200]);

        hex2rgb.parse.restore();
        done();
      });
    });

    it('should always pass a 6 item array to #parse ', function (done) {
      var mock = sinon.mock(hex2rgb);
      mock.expects('parse').twice().withExactArgs('000000'.split(''));

      hex2rgb.convert("#000000", function (err, result) {
        hex2rgb.convert("#000", function (err, result) {
          mock.verify();

          done();
        });
      });
    });

    it('should throw an error if the value is not a hex code', function (done) {
      hex2rgb.convert('blue', function (err, result) {
        expect(err).to.exist;

        done();
      });
    });

    it("should return a correctly converted rgb value", function (done) {
      hex2rgb.convert("#fff", function (err, result) {
        expect(err).to.not.exist;
        expect(result).to.deep.equal([255, 255, 255]);

        done();
      });
    });

  });
});
