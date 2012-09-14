process.env.MONGOHQ_URL = 'mongodb://localhost/duma-node_test';

var expect = require('expect.js'),
    app    = require('../app'),
    routes = require('../routes'),
    QuoteSchema = require('../quote').QuoteSchema;

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

describe('App', function() {
  var req = null
  var res = null;
  
  var Tquote      = new QuoteSchema();
  Tquote.human_id = 1;
  Tquote.content  = "Test Quote";
  
  Tquote.save(function(err) { });
  
  beforeEach(function() {
    req = {
      params: {}
    };
    res = {
      render: function() {
        expect("json").to.be("html");
      },
      json: function() {
        expect("html").to.be("json");
      }
    };
  });

  it('should give me a random quote with HTML output when I get the Root', function(done) {
    expect(routes.index).to.be.a("function");
    res.render = function(name, params) {
      expect(name).to.be.ok();
      expect(name).to.be('index');
      expect(params).to.be.an('object');
      expect(params).to.have.property('title');
      expect(params.title).to.be('[ droID:242 duma page');
      expect(params).to.have.property('quote');
      expect(params.quote).to.have.property('human_id');
      expect(params.quote).to.have.property('content');
      expect(params.quote._id.toString()).to.be(Tquote._id.toString());
      expect(params.quote.human_id).to.be(Tquote.human_id);
      expect(params.quote.content).to.be(Tquote.content);
      done();
    };
    routes.index(req, res);
  });

  it('should give me a random quote with HTML output when I get /random.html', function(done) {
    expect(routes.random).to.be.a("function");
    res.render = function(name, params) {
      expect(name).to.be.ok();
      expect(name).to.be('index');
      expect(params).to.be.an('object');
      expect(params).to.have.property('title');
      expect(params.title).to.be('[ droID:242 duma page');
      expect(params).to.have.property('quote');
      expect(params.quote).to.have.property('human_id');
      expect(params.quote).to.have.property('content');
      expect(params.quote._id.toString()).to.be(Tquote._id.toString());
      expect(params.quote.human_id).to.be(Tquote.human_id);
      expect(params.quote.content).to.be(Tquote.content);
      done();
    };
    req.params = {
      format: "html"
    }
    routes.random(req, res);
  });

  it('should give me a random quote with JSON output when I get /random.json', function(done) {
    expect(routes.random).to.be.a("function");
    res.json = function(params) {
      expect(params).to.be.an('object');
      expect(params).to.have.property('human_id');
      expect(params).to.have.property('content');
      expect(params._id.toString()).to.be(Tquote._id.toString());
      expect(params.human_id).to.be(Tquote.human_id);
      expect(params.content).to.be(Tquote.content);
      done();
    };
    req.params = {
      format: "json"
    }
    routes.random(req, res);
  });

  it('should give me a specific quote with HTML output when I get /:id.html', function(done) {
    expect(routes.special).to.be.a("function");
    res.render = function(name, params) {
      expect(name).to.be.ok();
      expect(name).to.be('index');
      expect(params).to.be.an('object');
      expect(params).to.have.property('title');
      expect(params.title).to.be('[ droID:242 duma page');
      expect(params).to.have.property('quote');
      expect(params.quote).to.have.property('human_id');
      expect(params.quote).to.have.property('content');
      expect(params.quote._id.toString()).to.be(Tquote._id.toString());
      expect(params.quote.human_id).to.be(Tquote.human_id);
      expect(params.quote.content).to.be(Tquote.content);
      done();
    };
    req.params = {
      id: Tquote.human_id,
      format: "html"
    }
    routes.special(req, res);
  });
  it('should give me a specific quote with JSON output when I get /:id.json', function(done) {
    expect(routes.special).to.be.a("function");
    res.json = function(params) {
      expect(params).to.be.an('object');
      expect(params).to.have.property('human_id');
      expect(params).to.have.property('content');
      expect(params._id.toString()).to.be(Tquote._id.toString());
      expect(params.human_id).to.be(Tquote.human_id);
      expect(params.content).to.be(Tquote.content);
      done();
    };
    req.params = {
      id: Tquote.human_id,
      format: "json"
    }
    routes.special(req, res);
  });
  it('should give me a random quote with HTML output when I get /:id.html and that does not esist', function(done) {
    expect(routes.special).to.be.a("function");
    res.render = function(name, params) {
      expect(name).to.be.ok();
      expect(name).to.be('index');
      expect(params).to.be.an('object');
      expect(params).to.have.property('title');
      expect(params.title).to.be('[ droID:242 duma page');
      expect(params).to.have.property('quote');
      expect(params.quote).to.have.property('human_id');
      expect(params.quote).to.have.property('content');
      expect(params.quote._id.toString()).to.be(Tquote._id.toString());
      expect(params.quote.human_id).to.be(Tquote.human_id);
      expect(params.quote.content).to.be(Tquote.content);
      done();
    };
    req.params = {
      id: -1,
      format: "html"
    }
    routes.special(req, res);
  });
  it('should give me a random quote with JSON output when I get /:id.json and that does not esist', function(done) {
    expect(routes.special).to.be.a("function");
    res.json = function(params) {
      expect(params).to.be.an('object');
      expect(params).to.have.property('human_id');
      expect(params).to.have.property('content');
      expect(params._id.toString()).to.be(Tquote._id.toString());
      expect(params.human_id).to.be(Tquote.human_id);
      expect(params.content).to.be(Tquote.content);
      done();
    };
    req.params = {
      id: -1,
      format: "json"
    }
    routes.special(req, res);
  });
});