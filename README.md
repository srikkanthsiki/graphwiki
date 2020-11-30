# wikigraphknowledge

Constains code and documents and video sales force Graph knowledge

## How to Present:

please have a look into working application with in Demo folder. please go in the same order as the number

## Sample queries :

```
MATCH (p:Person { name: 'Mani' })-[r]->(n2)  RETURN r,n2
MATCH p=()-[r:is_brother_of]->() RETURN p LIMIT 25
MATCH (n:Person) RETURN n LIMIT 25
MATCH (n) WHERE EXISTS(n.since) RETURN DISTINCT "node" as entity, n.since AS since LIMIT 25 UNION ALL MATCH ()-[r]-() WHERE EXISTS(r.since) RETURN DISTINCT "relationship" AS entity, r.since AS since LIMIT 25
delete all records
MATCH (n)
DETACH DELETE n
```

Merge (j:Noun {name: 'Corvus'})-[rel:isKnown]-(m:Noun {name: 'crows'})

## LocalSetup:

There are 4 seperate mini applications for this Project viz
this is done to modularize and scaling if deployed in Kubernates

- uploadBatch
- API
- UI
- DB/Neo4j

### setup of uploadBatch

prepared video for local setup please have a view -- DB is mandatory befor u start this app

- please clone latest code
- navigate to uploadBatch folder
- npm install ..
- npm start

### setup of API

prepared video for local setup please have a view -- DB is mandatory befor u start this app

- please clone latest code
- navigate to API folder
- npm install ..
- npm run dev (this one is nodeman integrated)

### setup of UI (React--Material)

- navigate to UI folder
- npm install ..
- npm start (this one is powered by Nx)

## Neo4j local setup-community version (Windows 10)

- please take the neo4j docker image before link here https://hub.docker.com/_/neo4j/
- https://neo4j.com/developer/docker-run-neo4j/#neo4j-docker
- start the docker
- defaut user pass ( neo4j/neo4j)
- verification if neo4j is up and running http://localhost:7474/browser/

## Node packages :

https://www.npmjs.com/package/xml-flow -- xml parsing
https://www.npmjs.com/package/natural#pos-tagger -- Natural language processsing

## Reference :

ref: https://www.analyticsvidhya.com/blog/2019/10/how-to-build-knowledge-graph-text-using-spacy/
ref:https://towardsdatascience.com/movie-recommendations-powered-by-knowledge-graphs-and-neo4j-33603a212ad0
ref: inserting data into https://neo4j.com/developer/javascript/
ref :https://neo4j.com/download-v2/?ref=developer-neo4j-desktop
ref:https://www.oodlestechnologies.com/blogs/how-to-perform-crud-operation-in-nodejs-with-neo4j/
ref:https://graphaware.com/neo4j/2013/10/11/neo4j-bidirectional-relationships.html
## Testing:
* Post Man is used for functional testing
* jest is used for unit testing
## TODO and GOOD TO HAVE :
1) more unit test will be add in susequent commits  
2) functional testing done via postman
