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
            //appr. function
            break;
        case "View All Employees By Manager":
            //appr. function
            break;
        case "Add Employee":
            //appr. function
            break;
        case "Remove Employee":
            //appr. function
            break;
        case "Update Employee Role":
            //appr. function
            break;
        case "Update Employee Manager":
            //appr. function
            break;
        default: "- Exit Program -";
            return quit()
 
        };
    });
};


function viewAll() {
    console.log("You are viewing all employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
}


function quit(){
// stop the program

}