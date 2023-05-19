const { connect } = require("http2");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employee_tracker_db",
    password: "cookies",
});
connection.connect();
function getEmployees() {
    return new Promise((resolve)  => {
        let choices = [];
        connection.query("SELECT first_name FROM employees", (err, res) => {
            
            for(let i=0; i < res.length; i++){
                choices.push(res[i].first_name)
            }
            resolve(choices)
        })
    })
} 

function init() {inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit the application"],
            name: "toDo"
        }
    ])
    .then( (data) => {
    if (data.toDo === "view all departments") {
        connection.query("SELECT * FROM departments AS departments", (err, res) => {
            if (err) throw err;
            console.log(res);
            init();
        });
    } else if (data.toDo === "view all roles") {
        connection.query("SELECT title, id, department_id, salary FROM roles", (err, res) => {
            if (err) throw err;
            console.log(res);
            init();
        });
    } else if (data.toDo === "view all employees") {
        connection.query("SELECT * FROM employees AS employees", (err, res) => {
            if (err) throw err;
            console.log(res);
            init();
        });
    } else if (data.toDo === "add a department") {
        const department = inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the department you would like to add?",
                name: "departmentName"
            }
        ]).then( (toDo) => {
            connection.query("INSERT INTO departments (name) VALUES (?)", [toDo.departmentName], (err, res) => {
                if (err) throw err;
                console.log(`${toDo.departmentName} has been added to the database.`);
                init()
            });
        });
    } else if (data.toDo === "add a role") {
        inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the role you would like to add?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary of the role you would like to add?",
                name: "roleSalary"
            },
            {
                type: "input",
                message: "What is the department ID of the role you would like to add?",
                name: "roleDepartment",
            }
        ]).then( (toDo) => {
            toDo.roleDepartment = parseInt(toDo.roleDepartment);
            connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [toDo.roleName, toDo.roleSalary, toDo.roleDepartment], (err, res) => {
                if (err) throw err;
                console.log(`${toDo.roleName} has been added to the database.`);
                init()
            });
        });
    } else if (data.toDo === "add an employee") {
        inquirer
        .prompt([
            {
                type: "input",
                message: "What is the first name of the employee you would like to add?",
                name: "employeeFirst"
            },
            {
                type: "input",
                message: "What is the last name of the employee you would like to add?",
                name: "employeeLast"
            },
            {
                type: "input",
                message: "What is the role ID of the employee you would like to add?",
                name: "employeeRole"
            }
        ]).then( (toDo) => {
            connection.query("INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)", [toDo.employeeFirst, toDo.employeeLast, toDo.employeeRole], (err, res) => {
                if (err) throw err;
                console.log(`${toDo.employeeFirst} has been added to the database.`);
                init()
            });
        });
    } else if (data.toDo === "update an employee role") {
        inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee's role you would like to update?",
                name: "employeeName",
                choices: getEmployees
            },
            {
                type: "input",
                message: "What is the id of the role you would like to update the employee to?",
                name: "roleId"
            }
        ]).then( (toDo) => {
            connection.query("UPDATE employees SET role_id = ? WHERE first_name = ?", [toDo.roleId, toDo.employeeName], (err, res) => {
                if (err) throw err;
                console.log(`${toDo.employeeName}'s role has been updated to ${toDo.roleId}.`);
                init()
            });
        });
        
    }
    else if(data.toDo === "exit the application"){
        console.log("Thank you for updating the database, goodbye!")
        connection.end();
    }
})
};

init();