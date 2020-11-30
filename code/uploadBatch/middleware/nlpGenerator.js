var natural = require('natural');
var wordnet = new natural.WordNet();
const language = "EN"
const defaultCategory = 'N';
const defaultCategoryCapitalized = 'NNP';
const _ = require('lodash')
const neo4j_calls = require('./../util/neo4j_api');


/*[ { token: 'Madagascar', tag: 'NNP' },
     { token: 'has', tag: 'VBZ' },
     { token: 'diplomatic', tag: 'JJ' },
     { token: 'relations', tag: 'NNS' },
     { token: 'with', tag: 'IN' },
     { token: 'many', tag: 'JJ' },
     { token: 'countries', tag: 'NNS' },
     { token: 'both', tag: 'N' },
     { token: 'individual', tag: 'JJ' },
     { token: 'bilateral', tag: 'JJ' },
     jOINING ADJECTIVE WITH NOUN
     */

exports.patterGenerator = async function (req, res, next) {

    // console.log("before", req.tagger.taggedWords)
    let currentdata = req.tagger.taggedWords

    currentdata = currentdata.map(x => {

        if (['NNS', 'NN', 'NNP', 'N'].indexOf(x.tag) > -1) {
            x.tag = 'NN'
        } else if (['VBZ', 'VBN', 'VBD'].indexOf(x.tag) > -1) {
            x.tag = 'VB'
        } else if (['CC', 'IN'].indexOf(x.tag) > -1) {
            x.tag = 'IN'
        }
        return x
    })

    //joining adjectives with noun
    for (let i = 0; i < currentdata.length; i++) {
        if (currentdata[i] != undefined && currentdata[i + 1] != undefined) {
            if (currentdata[i].tag == 'JJ' && currentdata[i + 1].tag == 'JJ') {
                currentdata[i + 1].token = currentdata[i].token + "_" + currentdata[i + 1].token
                currentdata[i].token = currentdata[i + 1].token
            }
            if (currentdata[i].tag == 'IN' && currentdata[i + 1].tag == 'IN') {
                currentdata[i + 1].token = currentdata[i].token + "_" + currentdata[i + 1].token
                currentdata[i].token = currentdata[i + 1].token
            }
            if (currentdata[i].tag == 'JJ' && ['NNS', 'NN', 'NNP'].indexOf(currentdata[i + 1].tag) > -1) {
                currentdata[i + 1].token = currentdata[i].token + "_" + currentdata[i + 1].token
                currentdata[i].token = currentdata[i + 1].token
            }
            if (currentdata[i].tag == 'NN' && ['NN'].indexOf(currentdata[i + 1].tag) > -1) {
                currentdata[i + 1].token = currentdata[i].token + "_" + currentdata[i + 1].token
                currentdata[i].token = currentdata[i + 1].token
            }

            if (['VB', 'VBN', 'VBD'].indexOf(currentdata[i].tag) > -1 && ['VB', 'VBN', 'VBD'].indexOf(currentdata[i + 1].tag) > -1) {
                currentdata[i + 1].token = currentdata[i].token + "_" + currentdata[i + 1].token
                currentdata[i].token = currentdata[i + 1].token
            }

        }
    }

    //console.log("currentdata",currentdata)
    //Removing adjectives
    let filterdata = _.filter(currentdata, function (o) {
        return o.tag != 'JJ'

    })

    console.log("filterdata", filterdata)
    filterdata = _.uniq(filterdata)

    for (let i = 0; i < filterdata.length; i++) {
        if (filterdata[i] != undefined && filterdata[i + 1] != undefined && filterdata[i + 2] != undefined) {
            if (filterdata[i].tag == 'NN' && filterdata[i + 1].tag == 'VB' && filterdata[i + 2].tag == 'NN') {
                //insert into DB
                let data = {
                    "noun": filterdata[i].token,
                    "verb": filterdata[i + 1].token,
                    "noun2": filterdata[i + 2].token

                }
                neo4j_calls.update_noun_verb_noun(data)
                console.log("NNN", filterdata[i], filterdata[i + 1], filterdata[i + 2])

            } else if (filterdata[i].tag == 'NN' && filterdata[i + 1].tag == 'IN' && (filterdata[i + 2].tag == 'JJ' || filterdata[i + 2].tag == 'NN')) {
                //insert into DB
                let data = {
                    "noun": filterdata[i].token,
                    "verb": filterdata[i + 1].token,
                    "noun2": filterdata[i + 2].token

                }
                neo4j_calls.update_noun_verb_noun(data)
                console.log(filterdata[i], filterdata[i + 1], filterdata[i + 2])
            }
        }
    }

    // console.log("after", filterdata)
    next()
}