const fs = require('fs');
const util = require("util");
const inquirer = require('inquirer');
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");
const render = require("./lib/htmlRenderer");
const ManagerHTML = require("./templates/manager");
const EngineerHTML = require("./templates/engineer");
const InternHTML = require("./templates/intern");
const mainHtml = require("./templates/main");

let team = [];

// Employee Questions
const employeeQ = [
    {
        type: 'list',
        name: 'employee',
        mesasge: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'I don\'t wan\'t to add any more team members']
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

// Manager Prompt
function addManager() {
    inquirer.prompt(managerQ).then(function(answers) {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.office);
        team.push(manager);
        employeePrompt();
    }) 
 }

 // Engineer Prompt
 function addEngineer() {
    inquirer.prompt(engineerQ).then(function(answers) {
        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.git);
        team.push(engineer);
        employeePrompt();
    })
 }

// Intern Prompt
 function addIntern() {
    inquirer.prompt(internQ).then(function(answers) {
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        team.push(intern);
        employeePrompt();
    })
 }

// choose employee
function employeePrompt() {
    return inquirer.prompt(employeeQ).then(function(answers) {
        // if select Engingeer, call Eningeer prompt
        if (answers.employee === 'Engineer') {
            addEngineer();
        }

        // else if select Intern, call intern prompt
        else if (answers.employee === 'Intern') {
            addIntern();
        }
        
        // else 
        else if (answers.employee === 'I don\'t wan\'t to add any more team members') {
            generateHTML();
        }
    });
}

// run through team array to generate html based on who exactly is on the team
function generateHTML() {
    console.log(team)
    let html = "";

    for (let i = 0; i < team.length; i++) {
        if (team[i].getRole() === 'Manager') {
            html += ManagerHTML(team[i]);
        }
        if (team[i].getRole() === 'Engineer') {
            html += EngineerHTML(team[i]);
        }
        if (team[i].getRole() === 'Intern') {
            html += InternHTML(team[i]);
        }
        fs.writeFile("./templates/main.html", mainHtml(html), function (err) {
            if (err) {
                console.log(err);
            } 
            console.log("Successfully written to file!");
        })
    }
}

addManager();