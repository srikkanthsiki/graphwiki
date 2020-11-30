const express = require("express");
const router = express.Router();
const neo4j_calls = require("./../util/neo4j_api");
let nlp = require("./../middleware/nlp");
let nlpGenerator = require("./../middleware/nlpGenerator");
var axios = require("axios");
let fs = require("fs"),
  flow = require("xml-flow"),
  xml2js = require("xml2js");
var axios = require("axios");

router.get("/", async function (req, res, next) {
  res.status(200).send("Root Response from :8080/test_api");
  return 700000;
});


/*
this method parse the bulk file as as stream and extracts title and abstract and send the data to NLP
 Takes data 6gb of data for steam 
 Parses the xml converts this to json 
 calls another API to do Natural Language Processing
 */
router.get("/start", async function (req, res, next) {
  try {
    inFile = fs.createReadStream(__dirname + "/../enwiki-latest-abstract.xml");
    xmlStream = flow(inFile);
    var config = {
      method: "post",
      url: "http://localhost:4300/api/startNLP",
      headers: {
        "Content-Type": "application/json",
      },
    };

    xmlStream.on("tag:abstract", function (abstract) {
      console.log(abstract);
      config.data = abstract;
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    // console.log(req.mem)
    xmlStream.on("end", function () {
      writeStream.end();
      next;
    });
  } catch (e) {
    console.log(e);
  }
});

/*
Process Each message and put it in NEO4j
converst the word to part of speech 
take Nound verb and noun and creats Graph Relation maps
*/
router.post(
  "/startNLP",
  nlp.nlpprocesstokenizer,
  nlpGenerator.patterGenerator,
  (req, res) => res.json(req.message)
);

router.put("/neo", async function (req, res, next) {
  //Passing in "name" parameter in body of POST request
  let requestObj = req.body;
  let string = await neo4j_calls.update_verb(requestObj);
  res.status(200).send("User named " + string + " created");
});

router.post("/neo", async function (req, res, next) {
  let requestObj = req.body;
  let { noun2 } = requestObj;
  let resString;
  if (noun2 == undefined) {
    resString = await neo4j_calls.update_noun_verb_adjective(requestObj);
  } else {
    resString = await neo4j_calls.update_noun_verb_noun(requestObj);
  }
  res.status(200).send("Noun created/merged");
});

module.exports = router;
