
USE emp_db;


-- Employee table and employee data

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Katie","Reid-Anderson", 1 , 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe","Smith", 2, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Isabelle", "Byrd", 3 , 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan","Clarkson", 4, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cynthia","Sommer", 5 , 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill","Jones", 6, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Hale", 7 , 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sonia","Peters", 8, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelly","Scott", 9, 8);



INSERT INTO role (title, salary, department_id)
VALUES ("Junior Engineer", 60000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Chief Engineer", 150000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Accountant", 60000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Accountant", 120000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Coordinator", 70000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Executive", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Front Desk", 40000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 250000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Lead", 90000, 1);



INSERT INTO department (name) VALUES ("Marketing"); 
INSERT INTO department (name) VALUES ("Executive");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Engineering");

SELECT role_id FROM employee INNER JOIN role ON employee.role_id = role.id;

delete from employee;
delete from role;
delete from department;
