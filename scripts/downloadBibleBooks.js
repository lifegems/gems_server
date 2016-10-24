var https = require('https');
var fs   = require('fs');

https.get('https://www.jw.org/en/publications/bible/nwt/books/json/html/', function(response) {
  var data = "";
  response.on('data', function(chunk) {
    data += chunk;
  });
  response.on('end', function() {
    // writeContentsToFile('../data/nwt/books.json', data);
    downloadAllBooks(data);
  });
});


function getBookContents(bookid, chapter) {
   var url = 'https://www.jw.org/en/publications/bible/nwt/books/json/html/';
   var rng = formatRange(bookid, chapter);
   
   https.get(url + rng, function(response) {
     var data = "";
     response.on('data', function(chunk) {
       data += chunk;
     });
     response.on('end', function() {
       var filename = bookid + '.' + chapter + '.json';
       writeContentsToFile('../data/nwt/books/' + filename, data);
     });
   });
}

function writeContentsToFile(filepath, contents) {
   if (fs.exists(filepath)) {
      fs.unlink(filepath);
   }
   fs.writeFile(filepath, contents, { flag: 'w' });
   console.log('Saved file: ' + filepath);
}

function downloadAllBooks(bookdata) {
   bookdata = JSON.parse(bookdata);
   let booknumber = 60;
   for (var i = booknumber - 1; i < booknumber + 6; i++) {
      var bookid = i + 1;
      var book = bookdata.editionData.books[bookid];
      var chapters = parseInt(book.chapterCount);
      for (var j = 0; j < chapters; j++) {
         var chapter = j + 1;
         getBookContents(bookid, chapter);
      }
   }
}

function formatRange(bookid, chapterid) {
   var chapter = "";
   if (chapterid < 10) {
      chapter = "00" + chapterid;
   } else if (chapterid < 100) {
      chapter = "0" + chapterid;
   } else {
      chapter = chapterid;
   }

   return bookid + chapter + "001-" + bookid + chapter + "999";
}
