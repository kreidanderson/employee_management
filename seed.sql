
USE emp_db;


-- Employee table and employee data

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Katie","Reid-Anderson", 1 , 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe","Smith", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Isabelle", "Byrd", 3 , 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan","Clarkson", 4, 4);

SELECT * FROM employee;

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Manager", 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Manager", 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Engineer", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 70000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Front Desk", 40000, 4);

SELECT * FROM role;

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO department (name)
VALUES ("Business Affairs");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Human Resources");

SELECT * FROM department;