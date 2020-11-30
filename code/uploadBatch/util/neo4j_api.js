let neo4j = require('neo4j-driver');
let {
    creds
} = require("./../config/credentials");
let driver = neo4j.driver("bolt://0.0.0.0:7687", neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));


exports.create_noun = async function (name) {
    let session = driver.session();
    let user = "No User Was Created";
    try {
        user = await session.run('MERGE (n:user {name: $id}) RETURN n', {
            id: name
        });
    } catch (err) {
        console.error(err);
        return user;
    }
    return user.records[0].get(0).properties.name;
}


exports.update_noun_verb_noun = async function (req) {
    let session = driver.session();
    let user = "No User Was Created";
    console.log(req)
    try {
        user = await session.run(`Merge (j:Noun {name: $noun})-[rel:${req.verb}]-(m:Noun {name: $noun2})`, {
            noun: req.noun,
            noun2: req.noun2
        });
    } catch (err) {
        console.error(err);
    }

}



exports.update_noun_verb_adjective = async function (req) {
    let session = driver.session();
    let user = "No User Was Created";
    console.log(req)
    try {
        user = await session.run(`Merge (j:Noun {name: $noun})-[rel:${req.verb}]->(m:Adjective {name: $adj})`, {
            noun: req.noun,
            adj: req.adj
        });
    } catch (err) {
        console.error(err);
    }

}