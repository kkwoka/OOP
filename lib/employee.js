// const render = require("./htmlRenderer.js")

// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        // this.role = getRole();
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }
    
    getRole() {
        console.log("employee")
        return "Employee";
    }
}

module.exports = Employee;