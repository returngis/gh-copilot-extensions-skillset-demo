const express = require('express');
const morgan = require('morgan');
const app = express();
const azdev = require('azure-devops-node-api');
require('dotenv').config();

app.use(morgan('combined'));
app.use(express.json());

const PORT = process.env.PORT || 3000;



/*
* Inference Description:
This API retrieves Dragon Ball characters from an external API and returns the data in JSON format. 
Input: a JSON object with an optional parameter: howManyCharacters. 
Output: a JSON array with the details of the requested characters.
*/

/* JSON schema
{ 
  "type": "object",
  "properties": {
    "howManyCharacters": {
     "type": "number",     
      "description": "The number of Dragon Ball characters to retrieve"
    }
  }
}
*/

app.post('/dragonball', async (req, res) => {

  console.log('Request body: ', req.body);

  const params = {
    howManyCharacters: req.body.howManyCharacters || 5,
  };

  let result = await fetch(`https://dragonball-api.com/api/characters?limit=${params.howManyCharacters}`);

  result = await result.json();

  res.json(result);

});


/*
* Inference Description:
This API retrieves Star Wars characters from an external API and returns the data in JSON format.
Input: a JSON object with an optional parameter: howManyCharacters.
Output: a JSON array with the details of the requested characters.
*/

/* JSON schema
{ 
  "type": "object",
  "properties": {
    "howManyCharacters": {
     "type": "number",     
      "description": "The number of Star wars characters to retrieve"
    }
  }
}
*/
app.post('/starwars', async (req, res) => {
  console.log('Request body: ', req.body);

  let characters = [];
  let page = 1; //10 characters per page

  const params = {
    howManyCharacters: req.body.howManyCharacters || 5,
  };

  while (characters.length < params.howManyCharacters) {
    let result = await fetch(`https://swapi.py4e.com/api/people/?page=${page}`);
    result = await result.json();
    characters = characters.concat(result.results);

    if (!result.next)
      page++;

    if (characters.length > params.howManyCharacters)
      characters = characters.slice(0, params.howManyCharacters);
  }

  res.json(characters);

});

/*
Retrieves the work items from Azure DevOps for a given project. Pass the GitHub handle as input, and the output will be the name of the work item, its state, 
the assignee, and a URL in this format: https://dev.azure.com/returngisorg/{project_name}/_workitems/edit/{work_item_id}/
*/

/* JSON schema
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "description": "GitHub handle"
    },
    "projectName": {
      "type": "string",
      "description": "The name of the project on Azure DevOps"
    }
  }
}
*/
app.post('/ado', async (req, res) => {

  console.log('Request body: ', req.body);
  console.log('Request headers: ', req.headers);

  const params = {
    project: req.body.projectName,
    username: req.body.username,

  };


  const orgUrl = `https://dev.azure.com/${process.env.ADO_ORG}`;

  let authHandler = azdev.getPersonalAccessTokenHandler(process.env.ADO_PAT);

  let connection = new azdev.WebApi(orgUrl, authHandler);

  const witApi = await connection.getWorkItemTrackingApi();

  const projectApi = await connection.getCoreApi();

  projectApi.getProject(params.project).then((project) => {
    console.log(project);
  });


  let query;

  // WIQL to obtain work items
  if (params.username) {

    console.log('The user asked for work items assigned to: ', params.username);

    const username_without_slug = params.username.replace(process.env.GITHUB_ENTERPRISE_SLUG, '');
    console.log(' ** username_without_slug: ', username_without_slug);

    query = {
      query: `SELECT [System.Id], [System.Title], [System.State] FROM WorkItems WHERE [System.TeamProject] = '${params.project}' AND [System.AssignedTo] CONTAINS '${username_without_slug}'`,
    };
  }
  else {

    console.log('The user asked for all work items');

    query = {
      query: `SELECT [System.Id], [System.Title], [System.State] FROM WorkItems WHERE [System.TeamProject] = '${params.project}'`,
    };
  }

  console.log('The query is: ', query);

  // Execute query
  const queryResult = await witApi.queryByWiql(query, { project: params.project });

  // Get work item ids
  const workItemIds = queryResult.workItems.map(item => item.id);

  // Get work items
  const workItems = await witApi.getWorkItems(workItemIds);

  // Return work items
  res.json(workItems);

});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} 🚀`);
});

