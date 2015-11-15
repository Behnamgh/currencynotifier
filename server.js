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
        var answer = new Message().text('Euro rate:\narzlive: ' + euro + '\nfibazar: ' + euro_1 + '\neranico: ' + euro_2.substring(0, 6)).to(message.chat.id);
        bot.send(answer);
        console.log(message.from.first_name + ' attempt for dollar and number of euro request is : ' + eurocount);
      });
    });
  });
});
bot.get(/Hi|Hey|Hello|Yo/i, function(message) {
  var answer = new msg().text('Hello, Sir').to(message.chat.id);
  bot.send(answer);
});

bot.get(/khubi|Khubi/, function(message) {
  var answer = new Message().text('khubaaaaaam aaaaali to chetori').to(message.chat.id);
  bot.send(answer);
});
bot.get(/khafesho|Khafesho|khafe|Khafe/, function(message) {
  if (message.from.id === 110176673) {

    var getUserProfilePhotos = "api.telegram.org/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/getUserProfilePhotos?user_id=" + message.from.id
    request('https://' + getUserProfilePhotos, function(error, response, body) {
      var findstr = body.indexOf('"file_id":"') + 11;
      var findlst = body.indexOf('","file_size":');
      var getuserfile = "api.telegram.org/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/getFile?file_id=" + body.substring(findstr, findlst);

      request('https://' + getuserfile, function(error, response, body) {
        var findstart = body.indexOf(',"file_path":"') + 14;
        var findlast = body.indexOf('"}}');
        var answer = new File().file('https://api.telegram.org/file/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/' + body.substring(findstart, findlast)).caption('azizam to ke az in harfa be man nemizadi?:*').to(message.chat.id);
        bot.send(answer);

      });

    });
  } else {

    var getUserProfilePhotos = "api.telegram.org/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/getUserProfilePhotos?user_id=" + message.from.id
    request('https://' + getUserProfilePhotos, function(error, response, body) {
      var findstr = body.indexOf('"file_id":"') + 11;
      var findlst = body.indexOf('","file_size":');
      var getuserfile = "api.telegram.org/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/getFile?file_id=" + body.substring(findstr, findlst);
      var piccount = body[body.indexOf('"total_count":') + 15];
      console.log('number of pics of' + message.from.first_name + piccount);
      if (piccount === 0) {
        var answer = new Message().text('ay khak too saret ke axe profile nadari, dar zemn khodet khafesho').to(message.chat.id);

        bot.send(answer);
      } else {
        request('https://' + getuserfile, function(error, response, body) {
          var findstart = body.indexOf(',"file_path":"') + 14;
          var findlast = body.indexOf('"}}');
          var answer = new File().file('https://api.telegram.org/file/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/' + body.substring(findstart, findlast)).caption('khodet khafesho ba in ghiafat!!!').to(message.chat.id);
          bot.send(answer);

        });
      }
    });
  }
});
bot.get(/sal+am/i, function(message) {
  var answer = new Message().text('salam azizaaaaaaam').to(message.chat.id);

  bot.send(answer);
});
bot.get(/funny mr young boy/, function(message) {
  var answer = new Message().text('asfdhaiuserca aserfcasecbaescxea cc year yscxgabexyu rxeaweyg xw3ayrbcxaeayuscgyavwrx awe xdoye xiweiyrx sea xse ye y').to(message.chat.id);

  bot.send(answer);
});
bot.get(/che khabar|Che khabar|chekhabar|Chekhabar/, function(message) {
  var answer = new Message().text('salamati,khabari nis,shoma chekhabar?').to(message.chat.id);
  bot.send(answer);
});

bot.get(/Behnam/i, function(message) {
  var answer = new Message().text('oh oh esme kiam gofti,yani soltane in bashar,man didamesh az nazdik').to(message.chat.id);

  bot.send(answer);
});
bot.get(/goh|kir|koskesh/i, function(message) {
  if (message.from.id === 110176673) {

    var getUserProfilePhotos = "api.telegram.org/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/getUserProfilePhotos?user_id=" + message.from.id
    request('https://' + getUserProfilePhotos, function(error, response, body) {
      var findstr = body.indexOf('"file_id":"') + 11;
      var findlst = body.indexOf('","file_size":');
      var getuserfile = "api.telegram.org/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/getFile?file_id=" + body.substring(findstr, findlst);

      request('https://' + getuserfile, function(error, response, body) {
        var findstart = body.indexOf(',"file_path":"') + 14;
        var findlast = body.indexOf('"}}');
        var answer = new File().file('https://api.telegram.org/file/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/' + body.substring(findstart, findlast)).caption('azizam to goli gol jigaram').to(message.chat.id);
        bot.send(answer);

      });

    });
  } else {

    var getUserProfilePhotos = "api.telegram.org/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/getUserProfilePhotos?user_id=" + message.from.id
    request('https://' + getUserProfilePhotos, function(error, response, body) {
      var findstr = body.indexOf('"file_id":"') + 11;
      var findlst = body.indexOf('","file_size":');
      var getuserfile = "api.telegram.org/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/getFile?file_id=" + body.substring(findstr, findlst);
      var piccount = body[body.indexOf('"total_count":') + 15];
      console.log('number of pics of' + message.from.first_name + piccount);
      if (piccount === 0) {
        var answer = new Message().text('ay khak too saret ke axe profile nadari, dar zemn ' + message.text + ' ham khodeto').to(message.chat.id);

        bot.send(answer);
      } else {
        request('https://' + getuserfile, function(error, response, body) {
          var findstart = body.indexOf(',"file_path":"') + 14;
          var findlast = body.indexOf('"}}');
          var answer = new File().file('https://api.telegram.org/file/bot127367067:AAH7oUB3iKXC9SwH9jrGMjJ_pnxjhsAD1E0/' + body.substring(findstart, findlast)).caption(message.text + ' ' + message.from.first_name + 'e na man be ebarati in balaiaaaas').to(message.chat.id);
          bot.send(answer);

        });
      }
    });
  }
});
bot.command('author', function(message) {
  var author = new Message().text('Behnam.ghafary@gmail.com\nma inimmmm,\naman az bikari vaghan').to(message.chat.id);

  bot.send(author);
});

bot.command('start', function(message) {
  if (members.indexOf(message.chat.id) == -1) {
    var answer = new Message().text('salam azizaaaaaaam').to(message.chat.id);

    var i = members.length;
    members[i] = message.chat.id;
    console.log(members);
    bot.send(answer);
  } else {
    var answer = new Message().text('salam azizaaaaaaam,shoma ghablan ozv shodi jigar').to(message.chat.id);

    bot.send(answer);
  }
});

bot.get(/ */, function(message) {
  var welcome = new msg().text('Hi.\nMy name is currency notifier and my job is to notify you from rate of $ from three website\nArzlive.com\n2gheroon.ir\nAnd feebazar.ir\nat first we started with 2 currency.\njust dollar and euro.\nEnjoy it\nfor start click one of these item').to(message.chat.id);
  bot.send(welcome);
});
