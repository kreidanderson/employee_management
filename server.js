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
            removeEmp();
            break;
        case "Update Employee Role":
            updateEmp();
            break;
        case "Update Employee Manager":
            updateManager();
            break;
        default: "- Exit Program -";
            return quit();
        
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
    console.log("You are viewing all employees by manager\n");
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
      console.table
    //   connection.end();
    init();
    });
}


function addEmployee(first_name, last_name, role_id, manager_id) {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.id, role.title FROM employee INNER JOIN role ON employee.role_id = role.id ORDER BY last_name`, function(err,res){
        if (err) throw err;

       
        var roleArray = res.map(record => {
           return { name: record.title, value: record.role_id }
        })
        var employeeArray = res.map(record2 =>  {
            return { name: record2.first_name + " " + record2.last_name, value: record2.id }
        }) // [{}, {}, {}, {}]
    
    
    // findRolesAsArray().then((roleList) => {
       
        console.log("Please add their information:");
        var addEmp = [
            {
                type: "input",
                message: "What is their first name?",
                name: "first",
            },
            {
                type: "input",
                message: "What is their last name?",
                name: "last",
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'role',
                choices: roleArray
            },
            {
                type: 'list',
                message: `Who is the employee's manager?`,
                name: 'manager',
                choices: employeeArray
            }
        ]
    
        inquirer
            .prompt(addEmp)
            .then(function (res) {

                console.log(res)
            

                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.first}', '${res.last}', '${res.role}', '${res.manager}')`
                
                , function (err, res) {
                    if (err) console.log(err);
                    
                })

                init()
            });
    });


};


function updateEmp(first_name, last_name, role_id, manager_id){
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.id, role.title FROM employee INNER JOIN role ON employee.role_id = role.id ORDER BY last_name`, function(err,res){
        if (err) throw err;

        console.table(res)
        var roleArray = res.map(record => {
           return { name: record.title, value: record.role_id }
        })
        var employeeArray = res.map(record2 =>  {
            return { name: record2.first_name + " " + record2.last_name, value: record2.id }
        })

        console.log("Please update their information")
        var updateEmp = [
    {type: "list",
    message: "Which employee would you like to update?",
    name: "name",
    choices: employeeArray
    },
    {type: 'list',
    message: "What is their new job?",
    name: 'role',
    choices: roleArray
    },
    ]
    
    inquirer
    .prompt(updateEmp)
    .then(function (res) {

    
        connection.query(`UPDATE employee SET role_id = '${res.role}' WHERE id = ${res.name}`,function (err, res) {
            if (err) console.log(err);
            
            init();
        })
        
            });
    
    })


};



function quit() {
    console.log("you exited from the system.")
    
    };


function removeEmp() {
    connection.query("SELECT id, first_name, last_name FROM employee ORDER BY last_name", function (err, employeesResult) {
        // employeeArray = [{name: "John Smith", value: 1}, {}]
            // res.map(record => record.first_name)
           
            var employeeArray = employeesResult.map(record =>  {
                return { name: record.first_name + " " + record.last_name, value: record.id }
            }) // [{}, {}, {}, {}]
    


        inquirer
            .prompt([
                {
                    type: 'list',
                    message: "What is the employee's name that you would like to remove?",
                    name: 'employeeId',
                    choices: employeeArray
                }
            ]).then(function (res) {
                
                var id = res.employeeId
                // this is where i need the array of all employees so i can push it through inquirer
                connection.query(`DELETE FROM employee WHERE id = ${id}`, function (err, result) {
                    
                    if (err) {
                        // If an error occurred, send a generic server failure
                        return res.status(500).end();
                    }
                    else if (result.affectedRows === 0) {
                        // If no rows were changed, then the ID must not exist, so 404
                        return res.status(404).end();
                    }
                    

                });
            
            });
        
    });
    init();
};

function updateManager() {
    connection.query("SELECT id, first_name, last_name, manager_id FROM employee ORDER BY last_name", function (err, employeesResult) {

        // get all employees and make an array of choices
        var employeeArray = employeesResult.map(record => {
            return { name: record.first_name + " " + record.last_name, value: record.id }
        })

        // prompt user to select one employee to update
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: "Choose who's manager you would like to update?",
                    name: 'employeeId',
                    choices: employeeArray
                },

            ])
            .then(function (res1) {
                // prompt user to select the new manager for the employee
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            message: "Who is their new manager?",
                            name: 'newManager',
                            choices: employeeArray
                        },

                    ])
                    .then(function(res2) {
                        // update the selected exployee(res1)'s manager to the new manager (res2)
                        connection.query(`UPDATE employee SET manager_id = ${res2.newManager} WHERE id = ${res1.employeeId}`, function (err, res) {
                            if (err) throw err;
                            // console.table(res);

                            init();


                            // connection.query...
                        });
                    });
            });

    });
}
