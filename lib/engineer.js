const Employee = require("./Employee.js");
// const render = require("./htmlRenderer.js")

class Engineer extends Employee {
    constructor(name, id, email, git) {
        super(name, id, email);
        this.git = git;
        // this.role = this.getRole();
    }

    getGit() {
        return this.git;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;