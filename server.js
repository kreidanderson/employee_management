const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "emp_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    init();
    // connection.end();
});
function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'which',
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "- Exit Program -"]
        }
    ]).then(answers => {
    console.log(answers.which);
    switch (answers.which){
        case "View All Employees":
            viewAll();
            break;
        case "View All Employees By Department":
            viewAllByDep();
            break;
        case "View All Employees By Manager":
            viewAllByManager();
            break;
        case "Add Employee":
           addEmployee();
            break;
        case "Remove Employee":
            //appr. Remove Employee function
            break;
        case "Update Employee Role":
            //appr. Update Employee Role function
            break;
        case "Update Employee Manager":
            //appr. Update Employee Manager function
            break;
        default: "- Exit Program -";
            return quit()
        
        };
    });
};


var currentEmp = `SELECT
first_name,
last_name
FROM employee
ORDER BY last_name`

function viewAll() {
    console.log("You are viewing all employees\n");
    connection.query(currentEmp, function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    init();
    });
}

function viewAllByDep(){
    console.log("You are viewing all employees by department\n");
    connection.query(`SELECT 
    department.name,
    employee.first_name,
    employee.last_name,
    role.title
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
ORDER BY department.id`, function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    //   connection.end();
    init();
    });
}

function viewAllByManager(){
    console.log("You are viewing all employees by department\n");
    connection.query(`SELECT 
    employee.manager_id,
    employee.first_name,
    employee.last_name,
    role.title
FROM employee
INNER JOIN role ON employee.role_id = role.id
ORDER BY employee.manager_id`, function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    //   connection.end();
    init();
    });
}

function addEmployee(){
console.log("Please update their information")
    var addEmp = [
{type: "input",
message: "What is their first name?",
name: "first",
},
{type: "input",
message: "What is their last name?",
name: "last",
},
{type: 'list',
message: "What is the employee's role?",
name: 'role',
choices: ["Junior Engineer", "Chief Engineer", "Junior Accountant", "Senior Accountant", "Sales Coordinator", "Sales Executive", "Front Desk", "Marketing"]
},
// {type: 'list',
// message: `Who is the employee's manager?`,
// name: 'manager',
// choices: [ list out all possible managers]
// }
]

inquirer
.prompt(addEmp)
    .then(function (res) {

console.log(res)
connection.query("INSERT INTO employee SET ?",{
    first_name: res.first,
    last_name: res.last,
    role: res.role,
    // I don't think this is going to work - NEED TO FIX
  });


});

};


function quit() {
    console.log("you exited from the system.")
    
    };


// function deleteEmp(){
//         console.log("Which employee would you like to delete?")
//         connection.query("DELETE FROM employee WHERE id = ?", function(err, result) {
//           if (err) {
//             // If an error occurred, send a generic server failure
//             return res.status(500).end();
//           }
//           else if (result.affectedRows === 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//           }
//           res.status(200).end();
      
//         });
//       });
// }