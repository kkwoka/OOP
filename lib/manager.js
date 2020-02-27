const Employee = require("./Employee.js");
// const render = require("./htmlRenderer.js")


class Manager extends Employee {
    constructor(name, id, email, office) {
        super(name, id, email);
        this.office = office;
        // this.role = this.getRole();
    }

    getOffice() {
        return this.office;
    }

    getRole() {
        return "Manager";
    }
}

// const mngr = new Manager(name, id, email);

module.exports = Manager;