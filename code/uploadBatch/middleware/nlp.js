var natural = require('natural');
var wordnet = new natural.WordNet();
const language = "EN"
const defaultCategory = 'N';
const defaultCategoryCapitalized = 'NNP';


/*
this is the where the actual NLP takes palce 
tokenzise the work and split nound verb and adjective
eg: "Anarchism is a political philosophy and movement that is sceptical of authority and rejects all involuntary, coercive forms of hierarchy. Anarchism calls for the abolition of the state which it holds to be undesirable, unnecessary and harmful."

0:{token: 'Anarchism', tag: 'NNP'}
1:{token: 'is', tag: 'VBZ'}
2:{token: 'a', tag: 'DT'}
3:{token: 'political', tag: 'JJ'}
4:{token: 'philosophy', tag: 'NN'}
5:{token: 'and', tag: 'CC'}
6:{token: 'movement', tag: 'NN'}
7:{token: 'that', tag: 'IN'}
8:{token: 'is', tag: 'VBZ'}
9:{token: 'sceptical', tag: 'JJ'}
10:{token: 'of', tag: 'IN'}
11:{token: 'authority', tag: 'NN'}
*/
exports.nlpprocesstokenizer = async function (req, res, next) {

    var tokenizer = new natural.WordTokenizer();
    req.tokenizer = tokenizer.tokenize(req.body.$text)
    var NGrams = natural.NGrams;
    req.message = {
        "message": "hello"
    }
    let tokenArr = []


    console.log(NGrams.ngrams(req.body.$text, 3));

    for (let i = 0; i < req.tokenizer.length; i++) {
        let tokenmap = {}
        // tokenmap.val=req.tokenizer[i]
        //  getPOS(req.tokenizer[i])
        //Princeton University this is taken from 

        //tokenArr.push(tokenmap)

    }

    var lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
    var ruleSet = new natural.RuleSet('EN');
    var tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
    var sentence = req.tokenizer;
    // console.log(tagger.tag(sentence));
    req.tagger = tagger.tag(sentence)
    next()
}


function next_tag_is(sentence, i, parameter) {
    if (i < sentence.taggedWords.length - 1) {
        return (sentence.taggedWords[i + 1][1] === parameter);
    } else {
        return (false);
    }
}

function nextTagParameterValues(sentence, i) {
    if (i < sentence.length - 1) {
        return [sentence[i + 1].tag];
    } else {
        return [];
    }
}
//Princeton University this is taken from 
async function getPOS(word) {

    wordnet.lookup(word, function (results) {
        console.log(results)
    })


}