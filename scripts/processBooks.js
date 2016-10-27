var fs = require('fs');
var _  = require('underscore');


var data = extractData(19, 3);
console.log(data);

function extractData(book, chapter) {
   var file = '../data/nwt/books/' + book + '.' + chapter + '.json';
   contents = JSON.parse(fs.readFileSync(file));

   var SPLIT_TEXT = '<span class="verse"';
   var text = contents.ranges[_.keys(contents.ranges)[0]].html.split(SPLIT_TEXT);

   var aText = [];
   _.each(text, function(item) {
      if (item) {
         var verse = aText.length + 1;
         var html = SPLIT_TEXT + item;
         var text = html.replace(/<(?:.|\n)*?\>/gm, '').replace(/\+/gm, '').replace(/\*+/gm, '');

         aText.push({
            book: book,
            chapter: chapter,
            verse: verse,
            html: html,
            text: text
         });
      }
   });
   return aText;
}