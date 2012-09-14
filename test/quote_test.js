process.env.MONGOHQ_URL = 'mongodb://localhost/duma-node_test';

var QuoteSchema = require('../quote').QuoteSchema,
    expect = require('expect.js');
    
var testQuote = {
  ok: {
    human_id: 1,
    content:  'Test Quote'
  },
  wrong: {
    human_id: 2,
    content:  'Wrong Test Quote'
  }
};

describe('Quote model', function() {
  QuoteSchema.find({human_id: testQuote.ok.human_id}).remove(function(err) {
    it('shoud connect to MongoDB', function(done) {
      QuoteSchema.isConnected(function(err, res) {
        expect(err).to.not.be.ok();
        done();
      });
    });

    it('shoud find 0 document in quotes collection', function(done) {
      QuoteSchema.count(function(err, res) {
        expect(err).to.not.be.ok();
        expect(res).to.be(0);
        done();
      });
    });

    it('shoud insert a new quote', function(done) {
      var quote      = new QuoteSchema();
      quote.human_id = testQuote.ok.human_id;
      quote.content  = testQuote.ok.content;

      quote.save(function(err) {
        expect(err).to.not.be.ok();
      });
      done();
    });

    it('shoud find a quote with Human Id', function(done) {
      QuoteSchema.findOne({human_id: testQuote.ok.human_id}, function(err, quote) {
        expect(err).to.not.be.ok();
        expect(quote).to.be.ok();
        expect(quote).to.not.be.empty();
        expect(quote).to.have.property('human_id');
        expect(quote).to.have.property('content');
        expect(quote.human_id).to.be(testQuote.ok.human_id);
        expect(quote.content).to.be(testQuote.ok.content);
        done();
      });
    });

    it('shound return a random quote', function(done) {
      QuoteSchema.random(function(err, quote) {
        expect(err).to.not.be.ok();
        expect(quote).to.be.ok();
        expect(quote).to.not.be.empty();
        expect(quote).to.have.property('human_id');
        expect(quote).to.have.property('content');
        expect(quote.human_id).to.be(testQuote.ok.human_id);
        expect(quote.content).to.be(testQuote.ok.content);
        done();
      })
    });

    it('shound return a random quote when the given Human Id does not esist', function(done) {
      QuoteSchema.findByHumanIdOrGetRandom(testQuote.wrong.human_id, function(err, quote) {
        expect(err).to.not.be.ok();
        expect(quote).to.be.ok();
        expect(quote).to.not.be.empty();
        expect(quote).to.have.property('human_id');
        expect(quote).to.have.property('content');
        expect(quote.human_id).to.not.be(testQuote.wrong.human_id);
        expect(quote.content).to.not.be(testQuote.wrong.content);
        expect(quote.human_id).to.be(testQuote.ok.human_id);
        expect(quote.content).to.be(testQuote.ok.content);
        done();
      })
    });

    it('shound delete quote by HumanId', function(done) {
      QuoteSchema.findOne({human_id: testQuote.ok.human_id}).remove(function(err) {
        expect(err).to.not.be.ok();
        done();
      });
    });
  });
});