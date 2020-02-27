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
            // inquirer.prompt(engineerQ).then(function(response) {
            //     console.log(response)
            //     html = generateHTML(answers, response);
            //     employeePrompt();
            // });
        }

        // else if select Intern, call intern prompt
        else if (answers.employee === 'Intern') {
            addIntern();

            // inquirer.prompt(internQ).then(function(response) {
            //     console.log(response);
            //     html = generateHTML(answers, response);
            // })
        }
        
        // else 
        else if (answers.employee === 'I don\'t wan\'t to add any more team members') {
            generateHTML();
        }
    
        // if (answers.employee != 'Engineer', 'Intern', 'I don\'t wan\'t to add any more team members') {
        //     listPrompt();
        // }
    });
}

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
// ===================================================
// call manager prompt
addManager();
// class list prompt
    // if select Engingeer, call Eningeer prompt
    // else if select Intern, call intern prompt
    // else generate html
// inquirer Engineer - name, id, email, git ? . then() call list prompt
// inquirer Intern - name, id, email, school ? . then() call list prompt
// inquirer Manager - name, id, email, office ? . then() call list prompt
// inquirer Engineer - name, id, email, git ? . then() call list prompt
// anyone else on the team?
// inquirer list [engineer, intern, no one else]
// ===================================================



// const writeFileSync = util.promisify(fs.writeFile);
// const appendFile = util.promisify(fs.appendFile);
// let html = [];


// Manager prompt:
// function managerPrompt() {
//     return inquirer.prompt(managerQ).then(function(answers) {
//         html = generateHTML(answers);

//         // html.push(answers);
//         listPrompt();
//     });
// }



// const managerEMP = new Manager();
// console.log(managerEMP.name);


// function userPrompt() {
//   return inquirer.prompt(employeePrompt).then(function(answers) {
      
//     if (answers.employee === 'Engineer') {
//         inquirer.prompt(engineerQ).then(function(response) {
//             console.log(response)
//             html = generateHTML(answers, response);
//             // return writeFileSync("index.html", html);
//             return appendFile("index.html", html)
//         })
//     };
//     if (answers.employee === 'Intern') {
//         inquirer.prompt(internQ).then(function(response) {
//             console.log(response);
//             html = generateHTML(answers, response);
//             return appendFile("index.html", html)
//         })
//     };
//     if (answers.employee === 'Manager') {
//         inquirer.prompt(managerQ).then(function(response) {
//             console.log(response)
//             html = generateHTML(answers, response);
//             return appendFile("index.html", html)
//         })
//     };
//     if (answers.employee === 'I don\'t wan\'t to add any more team members') {
//         console.log("fucckkkk")
//         return;
//     };
//     // html = generateHTML(response);
//     // return writeFileSync("index.html", html);
//   }).catch(function(err) {
//     console.log(err);
//   });
// };

// function generateHTML(answers, response, stringHTML) {
//     if (answers.employee === 'Engineer') {
//         return `
//             <div class="col-sm-4">
//             <div class="card" style="width: 18rem;">
//                 <div class="card-header">
//                     <h5>${response.name}</h5>
//                     <h5><i class="fas fa-glasses"></i>${answers.employee}</h5>
//                 </div>
//                     <ul class="list-group list-group-flush">
//                         <li class="list-group-item">ID: ${response.id}</li>
//                         <li class="list-group-item">Email: ${response.email}</li>
//                         <li class="list-group-item">Git UserName: ${response.git}</li>
//                     </ul>
//             </div>
//             </div>
//             `;
//     }
//     if (answers.employee === 'Intern') {
//         return `
//         <div class="col-sm-4">
//           <div class="card" style="width: 18rem;">
//               <div class="card-header">
//                 <h5>${response.name}</h5>
//                 <h5><i class="fas fa-user-graduate"></i>${answers.employee}</h5>
//               </div>
//                 <ul class="list-group list-group-flush">
//                   <li class="list-group-item">ID: ${response.id}</li>
//                   <li class="list-group-item">Email: ${response.email}</li>
//                   <li class="list-group-item">School: ${response.school}</li>
//                 </ul>
//           </div>
//         </div>
//         `;
//     }
//     if (answers.employee === 'Manager') {
//         return `
//         <div class="col-sm-4">
//           <div class="card" style="width: 18rem;">
//               <div class="card-header">
//                 <h5>${response.name}</h5>
//                 <h5><i class="fas fa-mug-hot"></i>${answers.employee}</h5>
//               </div>
//                 <ul class="list-group list-group-flush">
//                   <li class="list-group-item">ID: ${response.id}</li>
//                   <li class="list-group-item">Email: ${response.email}</li>
//                   <li class="list-group-item">Office #: ${response.office}</li>
//                 </ul>
//           </div>
//         </div>
//         `;
//     }
// };

// userPrompt();

// call Manager Prompt:
// managerPrompt();

// call list prompt:
// listPrompt();


// call manager prompt
// call list prompt (witout manager, can only have one manager on team)
//      if select Engineer, [.(then)] call Engineer prompt
//      else/if select Intern, call Intern prompt
//      else select "no one else on team", generate HTML

// in .then of each inquirer(engineer, intern), call list prompt AND create objects for that inquirer so that you can inject that object into the generateHTML() function