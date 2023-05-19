insert into departments (name) values ('Sales'
), ('Engineering'
), ('Finance'
), ('Legal'
);

insert into roles (title, salary, department_id) values ('Sales Lead', 100000, 1
), ('Salesperson', 80000, 1
), ('Lead Engineer', 150000, 2
), ('Software Engineer', 120000, 2
), ('Accountant', 125000, 3
), ('Legal Team Lead', 250000, 4
), ('Lawyer', 190000, 4
);

insert into employees (first_name, last_name, role_id, manager_id) values ('John', 'Doe', 1, NULL
), ('Mike', 'Chan', 2, 1
), ('Ashley', 'Rodriguez', 3, NULL
), ('Kevin', 'Tupik', 4, 3
), ('Malia', 'Brown', 5, NULL
), ('Sarah', 'Lourd', 6, 5
), ('Tom', 'Allen', 7, 5
);

