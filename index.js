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
];

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
        inquirer.prompt(engineerQ).then(function(response) {
            console.log(response)
            html = generateHTML(answers, response);
            // return writeFileSync("index.html", html);
            return appendFile("index.html", html)
        })
    };
    if (answers.employee === 'Intern') {
        inquirer.prompt(internQ).then(function(response) {
            console.log(response);
            html = generateHTML(answers, response);
            return appendFile("index.html", html)
        })
    };
    if (answers.employee === 'Manager') {
        inquirer.prompt(managerQ).then(function(response) {
            console.log(response)
            html = generateHTML(answers, response);
            return appendFile("index.html", html)
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
    if (answers.employee === 'Engineer') {
        return `
            <div class="col-sm-4">
            <div class="card" style="width: 18rem;">
                <div class="card-header">
                    <h5>${response.name}</h5>
                    <h5>${answers.employee}</h5>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${response.id}</li>
                        <li class="list-group-item">Email: ${response.email}</li>
                        <li class="list-group-item">Git UserName: ${response.git}</li>
                    </ul>
            </div>
            </div>
            `;
    }
    if (answers.employee === 'Intern') {
        return `
        <div class="col-sm-4">
          <div class="card" style="width: 18rem;">
              <div class="card-header">
                <h5>${response.name}</h5>
                <h5>${answers.employee}</h5>
              </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${response.id}</li>
                  <li class="list-group-item">Email: ${response.email}</li>
                  <li class="list-group-item">School: ${response.school}</li>
                </ul>
          </div>
        </div>
        `;
    }
    if (answers.employee === 'Manager') {
        return `
        <div class="col-sm-4">
          <div class="card" style="width: 18rem;">
              <div class="card-header">
                <h5>${response.name}</h5>
                <h5>${answers.employee}</h5>
              </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${response.id}</li>
                  <li class="list-group-item">Email: ${response.email}</li>
                  <li class="list-group-item">Office #: ${response.office}</li>
                </ul>
          </div>
        </div>
        `;
    }
};

userPrompt();