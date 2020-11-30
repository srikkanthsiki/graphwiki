let neo4j = require("neo4j-driver");
let { creds } = require("./../config/credentials");
let driver = neo4j.driver(
  "bolt://0.0.0.0:7687",
  neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw)
);
let _ = require("lodash");
var axios = require("axios");

exports.get_num_nodes = async function () {
  let session = driver.session();
  const num_nodes = await session.run("MATCH (n) RETURN n", {});
  session.close();
  console.log("RESULT", !num_nodes ? 0 : num_nodes.records.length);
  return !num_nodes ? 0 : num_nodes.records.length;
};

exports.get_Noun_Relations = async function (noun) {
  let session = driver.session();
  const num_nodes = await session.run(
    "MATCH (n1:Noun { name: $noun })-[r]-(n2)  RETURN {c1:n1.name,c2:type(r),c3:n2.name}",
    {
      noun: noun,
    }
  );
  session.close();
  console.log("RESULT", num_nodes, !num_nodes ? 0 : num_nodes.records.length);
  return _.map(_.get(num_nodes, "records"), (x) => x._fields[0]);
};

exports.get_Verb_Relations = async function (verb) {
  let session = driver.session();
  const num_nodes = await session.run(
    `MATCH (n1)-[r:${verb}]-(n2)  RETURN {c1:n1.name,c2:type(r),c3:n2.name}`,
    {
      verb: verb,
    }
  );
  session.close();
  return _.map(_.get(num_nodes, "records"), (x) => x._fields[0]);
};

exports.create_noun = async function (name) {
  let session = driver.session();
  let user = "No User Was Created";
  try {
    user = await session.run("MERGE (n:user {name: $id}) RETURN n", {
      id: name,
    });
  } catch (err) {
    console.error(err);
    return user;
  }
  return user.records[0].get(0).properties.name;
};

exports.update_noun_verb_noun = async function (req) {
  let session = driver.session();
  let user = "No User Was Created";
  console.log(req);
  try {
    user = await session.run(
      `Merge (j:Noun {name: $noun})-[rel:${req.verb}]-(m:Noun {name: $noun2})`,
      {
        noun: req.noun,
        noun2: req.noun2,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

exports.update_noun_verb_adjective = async function (req) {
  let session = driver.session();
  let user = "No User Was Created";
  console.log(req);
  try {
    user = await session.run(
      `Merge (j:Noun {name: $noun})-[rel:${req.verb}]->(m:Adjective {name: $adj})`,
      {
        noun: req.noun,
        adj: req.adj,
      }
    );
  } catch (err) {
    console.error(err);
  }
};
