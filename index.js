const fs = require('fs');
const util = require("util");
const inquirer = require('inquirer');
// const writeFileSync = util.promisify(fs.writeFile);

const appendFile = util.promisify(fs.appendFile);


const employeePrompt = [
    {
        type: 'list',
        name: 'employee',
        mesasge: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'Manager', 'I don\'t wan\'t to add any more team members']
    }
]
const managerQ = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your manager\'s name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your manager\'s ID?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your manager\'s email?'
    },
    {
        type: 'input',
        name: 'office',
        message: 'What is your manager\'s office number?'
    }
];

const internQ = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your intern\'s name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your intern\'s ID?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your intern\'s email?'
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is your intern\'s school?'
    },
];

const engineerQ = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your engineer\'s name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is your engineer\'s ID?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your engineer\'s email?'
    },
    {
        type: 'input',
        name: 'git',
        message: 'What is your engineer\'s GitHub username?'
    },
];


function userPrompt() {
  return inquirer.prompt(employeePrompt).then(function(answers) {
      
    if (answers.employee === 'Engineer') {
        // console.log(answers)
        inquirer.prompt(engineerQ).then(function(response) {
            console.log(response)
            html = generateHTML(answers, response);
            // return writeFileSync("index.html", html);
            return appendFile("index.html", html)
        })
    };
    if (answers.employee === 'Intern') {
        // console.log(answers)
        inquirer.prompt(internQ).then(function(response) {
            console.log(response);
            html = generateHTML(answers, response);
            return writeFileSync("index.html", html);
        })
    };
    if (answers.employee === 'Manager') {
        // console.log(answers)
        inquirer.prompt(managerQ).then(function(response) {
            console.log(response)
            html = generateHTML(answers, response);
            return writeFileSync("index.html", html);
        })
    };
    if (answers.employee === 'I don\'t wan\'t to add any more team members') {
        console.log("fucckkkk")
        return;
    };
    // html = generateHTML(response);
    // return writeFileSync("index.html", html);
  }).catch(function(err) {
    console.log(err);
  });
};

function generateHTML(answers, response) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="jumbotron jumbotron-fluid"> HELLO! </div>

    <div class="card" style="width: 18rem;">
        <div class="card-header">
            <h5>${response.name}</h5>
            <h5>${answers.employee}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${response.id}</li>
          <li class="list-group-item">Email: ${response.email}</li>
          <li class="list-group-item">Git UserName: ${response.git}</li>
          <li class="list-group-item">Office #: ${response.office}</li>
          <li class="list-group-item">School: ${response.school}</li>

        </ul>
    </div>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

</body>
</html>`;
};

userPrompt();