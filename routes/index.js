
/*
 * GET home page.
 */

var Quote = require('../quote').QuoteSchema;

var render_page = function(res, quote) {
  res.render('index', { title: '[ droID:242 duma page', quote: quote });
};

exports.index = function(req, res) {
  Quote.random(function(err, quote) {
    render_page(res, quote);
  });
};

/*
 * By selected ID from parameters
 */
exports.special = function(req, res) {
  Quote.findByHumanIdOrGetRandom(req.params['id'], function(err, quote) {
    if (req.params.format == 'json') {
      res.json(quote);
    } else {
      render_page(res, quote);
    }          
  });
};

exports.random = function(req, res) {
  Quote.random(function(err, quote) {
    if (req.params.format == 'json') {
      res.json(quote);
    } else {
      render_page(res, quote);
    }
  });
};