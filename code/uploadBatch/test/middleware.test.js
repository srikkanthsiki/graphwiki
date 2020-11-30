let nlp = require("./../middleware/nlp");
let nlpGenerator = require("./../middleware/nlpGenerator");

test('nlpprocesstokenizer', () => {
    let req.body={ "$name": "abstract",
    "$text":
     "Anthropology is scientific Anthropology with human behavior, human biology, and societies, in both the present and past, Anthropology past human species. Social Anthropology is studies_patterns_of_behaviour, Anthropology cultural Anthropology studies Anthropology meaning, including norms and values."
  }
    expect(nlp.nlpprocesstokenizer(req, res, next).then(req.tagger)).toBe({
        taggedWords: [
          {
            token: "Anthropology",
            tag: "NNP",
          },
          {
            token: "is",
            tag: "VBZ",
          },
          {
            token: "scientific",
            tag: "JJ",
          },
          {
            token: "Anthropology",
            tag: "NNP",
          },
          {
            token: "with",
            tag: "IN",
          },
          {
            token: "human",
            tag: "JJ",
          },
          {
            token: "behavior",
            tag: "NN",
          },
          {
            token: "human",
            tag: "JJ",
          },
          {
            token: "biology",
            tag: "NN",
          },
          {
            token: "and",
            tag: "CC",
          },
          {
            token: "societies",
            tag: "NNS",
          },
          {
            token: "in",
            tag: "IN",
          },
          {
            token: "both",
            tag: "N",
          },
          {
            token: "the",
            tag: "DT",
          },
          {
            token: "present",
            tag: "JJ",
          },
          {
            token: "and",
            tag: "CC",
          },
          {
            token: "past",
            tag: "JJ",
          },
          {
            token: "Anthropology",
            tag: "NNP",
          },
          {
            token: "past",
            tag: "JJ",
          },
          {
            token: "human",
            tag: "JJ",
          },
          {
            token: "species",
            tag: "NN",
          },
          {
            token: "Social",
            tag: "NNP",
          },
          {
            token: "Anthropology",
            tag: "NNP",
          },
          {
            token: "is",
            tag: "VBZ",
          },
          {
            token: "studies_patterns_of_behaviour",
            tag: "N",
          },
          {
            token: "Anthropology",
            tag: "NNP",
          },
          {
            token: "cultural",
            tag: "JJ",
          },
          {
            token: "Anthropology",
            tag: "NNP",
          },
          {
            token: "studies",
            tag: "NNS",
          },
          {
            token: "Anthropology",
            tag: "NNP",
          },
          {
            token: "meaning",
            tag: "VBG",
          },
          {
            token: "including",
            tag: "VBG",
          },
          {
            token: "norms",
            tag: "NNS",
          },
          {
            token: "and",
            tag: "CC",
          },
          {
            token: "values",
            tag: "NNS",
          },
        ],
      });
  });


  test('nlpGenerator', () => {
    let req.body={ "$name": "abstract",
    "$text":
     "Anthropology is scientific Anthropology with human behavior, human biology, and societies, in both the present and past, Anthropology past human species. Social Anthropology is studies_patterns_of_behaviour, Anthropology cultural Anthropology studies Anthropology meaning, including norms and values."
  }
    expect(nlpGenerator.patterGenerator(req, res, next){
     
        expect(filterdata).toBe([
            {
              token: "Anthropology",
              tag: "NN",
            },
            {
              token: "is",
              tag: "VB",
            },
            {
              token: "scientific_Anthropology",
              tag: "NN",
            },
            {
              token: "with",
              tag: "IN",
            },
            {
              token: "human_behavior",
              tag: "NN",
            },
            {
              token: "human_biology",
              tag: "NN",
            },
            {
              token: "and",
              tag: "IN",
            },
            {
              token: "societies",
              tag: "NN",
            },
            {
              token: "in",
              tag: "IN",
            },
            {
              token: "both",
              tag: "NN",
            },
            {
              token: "the",
              tag: "DT",
            },
            {
              token: "and",
              tag: "IN",
            },
            {
              token: "past_Anthropology",
              tag: "NN",
            },
            {
              token: "past_human_species_Social",
              tag: "NN",
            },
            {
              token: "past_human_species_Social_Anthropology",
              tag: "NN",
            },
            {
              token: "past_human_species_Social_Anthropology",
              tag: "NN",
            },
            {
              token: "is",
              tag: "VB",
            },
            {
              token: "studies_patterns_of_behaviour_Anthropology",
              tag: "NN",
            },
            {
              token: "studies_patterns_of_behaviour_Anthropology",
              tag: "NN",
            },
            {
              token: "cultural_Anthropology_studies",
              tag: "NN",
            },
            {
              token: "cultural_Anthropology_studies_Anthropology",
              tag: "NN",
            },
            {
              token: "cultural_Anthropology_studies_Anthropology",
              tag: "NN",
            },
            {
              token: "meaning",
              tag: "VBG",
            },
            {
              token: "including",
              tag: "VBG",
            },
            {
              token: "norms",
              tag: "NN",
            },
            {
              token: "and",
              tag: "IN",
            },
            {
              token: "values",
              tag: "NN",
            },
          ])

    }
       
  });