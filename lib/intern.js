const Employee = require("./Employee.js");
// const render = require("./htmlRenderer.js")

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        // this.role = this.getRole();
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;