var Bot = require('telegram-api');
var Message = require('telegram-api/types/Message');
var Keyboard = require('telegram-api/types/Keyboard');
var File = require('telegram-api/types/File');
var cheerio = require('cheerio');
var request = require('request');
const kb = new Keyboard().keys([
  ["Dollar"],
  ["Euro"]
]);
var bot = new Bot({
  token: '127393459:AAH5mRJGfGGasENu4TLMyrSN2H6ZE56tAxE'
});

bot.start();
console.log("the server is started");

function msg() {
  return new Message().keyboard(kb);
}

function Filemsg() {
  return new File().keyboard(kb);
}
var dollarcount = 0;
var eurocount = 0;

bot.get(/Test|test/, function(message) {
  console.log(message);
  var answer = new msg().text('khob ke chi').to(message.chat.id);
  bot.send(answer);
});

bot.get(/Hi|Hey|Hello|Yo/, function(message) {
  var answer = new Message().text('Hello, Sir').to(message.chat.id);
  bot.send(answer);
});

bot.get(/Dollar|dollar|dollars|Dollars/, function(message) {
  ++dollarcount;
  request('http://www.arzlive.com/', function(error, response, body) {
    var $ = cheerio.load(body),
      dollar = $('.s3_40').text();
    request('http://www.fibazar.ir/', function(error, response, body) {
      var $ = cheerio.load(body),
        dollar_1 = $('#price-of-1USD .b-value').text();
      request('http://www.eranico.com/', function(error, response, body) {
        var $ = cheerio.load(body);
        var $$ = cheerio.load($('.hotPrice').eq(1).html());
        dollar_2 = $$('.even .second span').eq(0).text();
        var answer = new Message().text('Dollar rate:\narzlive: ' + dollar + '\nfibazar: ' + dollar_1 + '\neranico: ' + dollar_2.substring(0, 6)).to(message.chat.id);
        bot.send(answer);
        console.log(message.from.first_name + ' attempt for dollar and number of dollar request is : ' + dollarcount);
      });
    });
  });
});

bot.get(/euro|Euro/, function(message) {
  ++eurocount;
  request('http://www.arzlive.com/', function(error, response, body) {
    var $ = cheerio.load(body),
      euro = $('.s3_41').text();
    request('http://www.fibazar.ir/', function(error, response, body) {
      var $ = cheerio.load(body),
        euro_1 = $('#price-of-1EUR .b-value').text();
      request('http://www.eranico.com/', function(error, response, body) {
        var $ = cheerio.load(body);
        var $$ = cheerio.load($('.hotPrice').eq(1).html());
        euro_2 = $$('.odd .second span').eq(0).text();
        var answer = new Message().text('Dollar rate:\narzlive: ' + euro + '\nfibazar: ' + euro_1 + '\neranico: ' + euro_2.substring(0, 6)).to(message.chat.id);
        bot.send(answer);
        console.log(message.from.first_name + ' attempt for dollar and number of euro request is : ' + eurocount);
      });
    });
  });
});

/* bot.command('dollar', function(message) {
  request('http://www.arzlive.com/', function(error, response, body) {
    var $ = cheerio.load(body),
      dollar = $('.s3_40').text();
    request('http://www.fibazar.ir/', function(error, response, body) {
      var $ = cheerio.load(body),
        dollar_1 = $('#price-of-1USD .b-value').text();
      request('http://www.eranico.com/', function(error, response, body) {
        var $ = cheerio.load(body);
        var $$ = cheerio.load($('.hotPrice').eq(1).html());
        dollar_2 = $$('.even .second span').eq(0).text();
        var answer = new Message().text('Dollar rate:\narzlive: ' + dollar + '\nfibazar: ' + dollar_1 + '\neranico: ' + dollar_2.substring(0, 6)).to(message.chat.id);
        bot.send(answer);
      });
    });
  });
});

bot.command('euro', function(message) {
  request('http://www.arzlive.com/', function(error, response, body) {
    var $ = cheerio.load(body),
      euro = $('.s3_41').text();
    request('http://www.fibazar.ir/', function(error, response, body) {
      var $ = cheerio.load(body),
        euro_1 = $('#price-of-1EUR .b-value').text();
      request('http://www.eranico.com/', function(error, response, body) {
        var $ = cheerio.load(body);
        var $$ = cheerio.load($('.hotPrice').eq(1).html());
        euro_2 = $$('.odd .second span').eq(0).text();
        var answer = new Message().text('Dollar rate:\narzlive: ' + euro + '\nfibazar: ' + euro_1 + '\neranico: ' + euro_2.substring(0, 6)).to(message.chat.id);
        bot.send(answer);
      });
    });
  });
});
*/
bot.command('start', function(message) {
  var welcome = new msg().text('Hi.\nMy name is currency notifier and my job is to notify you from rate of $ from three website\nArzlive.com\n2gheroon.ir\nAnd feebazar.ir\nat first we started with 2 currency.\njust dollar and euro.\nEnjoy it\nfor start click one of these item').to(message.chat.id);
  bot.send(welcome);
});

bot.command('author', function(message) {
  var welcome = new msg().text('salam.\nbaray ersal nazarat va pishnehadat khod mitavanid be @behnamghafary telegram dahid.\nmamnoonam.').to(message.chat.id);
  bot.send(welcome);
});

bot.get(/ */, function(message) {
  var welcome = new msg().text('Hi.\nMy name is currency notifier and my job is to notify you from rate of $ from three website\nArzlive.com\n2gheroon.ir\nAnd feebazar.ir\nat first we started with 2 currency.\njust dollar and euro.\nEnjoy it\nfor start click one of these item').to(message.chat.id);
  bot.send(welcome);
});
