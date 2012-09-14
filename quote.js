var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId;

if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
} else {
  mongoose.connect(process.env.MONGOHQ_URL || "mongodb://localhost/duma-node");
}

var QuoteSchema = new Schema({
  human_id: Number,
  content:  String
});

QuoteSchema.static('random', function(cb) {
  var that = this;
  return this.count(function(err, max) {
    var num = (Math.round(Math.random() * 1000) % max);
    return that.findOne({}).limit(1).skip(num).exec(cb);
  });
});

QuoteSchema.static('findByHumanIdOrGetRandom', function(id, cb) {
  var _this = this;
  return _this.findOne({human_id: id}, function(err, quote) {
    if (err || quote === null) {
      _this.random(function(err, quote) {
        return cb(err, quote);
      });
    } else {
      return cb(err, quote);
    }
  });
});

QuoteSchema.static('isConnected', function(cb) {
  return cb(null, (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2));
});

module.exports.QuoteSchema = mongoose.model('Quote', QuoteSchema);