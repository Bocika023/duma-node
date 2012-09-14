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
  this.count(function(err, max) {
    var num = (Math.round(Math.random() * 1000) % max);
    that.findOne({}).limit(1).skip(num).exec(cb);
  });
});

module.exports.QuoteSchema = mongoose.model('Quote', QuoteSchema);