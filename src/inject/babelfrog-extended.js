// Potentially illegitimate use of non-public API; but many other extensions use it too.
BabelFrog.engines.googleTranslateFreeExtended = function(sourceText){
  jQuery.ajax({
    url:'http://translate.google.com/translate_a/single',
    type: 'GET',
    dataType: 'text',
    success: function(response){

      console.log(response);
      return;

      // s/,(?=,|])/,[]/g

      if (response && response.sentences && response.sentences.length > 0) {
        var ret = [];
        for (var i = 0; i < response.sentences.length; i++) {
          ret.push(response.sentences[i].trans);
        }
        ret = ret.join(" ");

        // google translate sends us definitions only if a single word is searched for
        if (response.dict) {
          var dictRet = [];
          for (var i = 0; i < response.dict.length; i++) {
            var def = response.dict[i];
            var base = def.base_form,
                type = def.pos,
                terms = def.terms.join(", ");

            dictRet.push("<em>(" + type + ")</em> " + def.terms.join(", "));
          }

          ret = ret + "<br/><br/>" + dictRet.join("<br/>");
        }
        BabelFrog.config.successCallback(ret);
        return;
      }

      // Google Translate reports 200 in case of error messages
      if (response.error){
        BabelFrog.config.errorCallback('Google Translate Error ' + response.error.code + ': <br/>' + response.error.message);
      }
      else {
        BabelFrog.config.errorCallback('Google Translate: unable to parse response.');
      }
    },
    error: function(xhr, status){
      BabelFrog.config.errorCallback("Google Translate XHR error: <br/>"  + status);
    },

    /*
client: 'at',
hl: 'en',
dt: 'bd',
dt: 'ex',
dt: 'ld',
dt: 'md',
dt: 'qc',
dt: 'rw',
dt: 'rm',
dt: 'ss',
dt: 't',
ie: 'UTF-8',
oe: 'UTF-8',
oc: '1',
prev: 'conf',
psl: 'auto',
ptl: 'en',
otf: '1',
it: 'sel.7964',
ssel: '3',
tsel: '0',
sl: BabelFrog.config.source,
tl: BabelFrog.config.target,
q: sourceText
*/
    data: {
      client:'at',
      hl:'en',
      sc:'2',
      ie:'UTF-8',
      oe:'UTF-8',
      ssel:'0',
      tsel:'0',
      sl: BabelFrog.config.source,
      tl: BabelFrog.config.target,
      q: sourceText
    }
  });
}
