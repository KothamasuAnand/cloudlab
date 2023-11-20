import express from 'express';
import bodyParser from 'body-parser';
import {TextAnalyticsClient} from "@azure/ai-text-analytics";
import {AzureKeyCredential} from "@azure/ai-text-analytics";

const app = express();
const port = 3000;

const key = '4db47c1cdd1a448494fe6ce08f2daeda';
const endpoint = 'https://cloudlab.cognitiveservices.azure.com/';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('C:/Users/hp/Desktop/Pro/index.html');
});

app.post('/',async (req, res) => {
    
    const documents = [{
    text: req.body.userInput,
    id: "0",
    language: "en"
  }];

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

  const results = await client.analyzeSentiment(documents);
  console.log(results[0].sentiment);
  res.send(results);    
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
