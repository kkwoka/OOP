const Employee = require("./Employee.js");

class Engineer extends Employee {
    constructor(name, id, email, git) {
        super(name, id, email);
        this.git = git;
    }

    getGit() {
        return this.git;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;