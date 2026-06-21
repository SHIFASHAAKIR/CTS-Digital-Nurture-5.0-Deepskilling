SET SERVEROUTPUT ON;

-- Scenario 1: Customer Management Package

CREATE OR REPLACE PACKAGE CustomerManagement AS

    PROCEDURE AddCustomer(
        cid NUMBER,
        cname VARCHAR2,
        dob DATE,
        bal NUMBER
    );

    PROCEDURE UpdateCustomer(
        cid NUMBER,
        newBalance NUMBER
    );

    FUNCTION GetBalance(
        cid NUMBER
    ) RETURN NUMBER;

END CustomerManagement;
/

CREATE OR REPLACE PACKAGE BODY CustomerManagement AS

    PROCEDURE AddCustomer(
        cid NUMBER,
        cname VARCHAR2,
        dob DATE,
        bal NUMBER
    )
    IS
    BEGIN
        INSERT INTO Customers
        (CustomerID,Name,DOB,Balance,LastModified,IsVIP)
        VALUES
        (cid,cname,dob,bal,SYSDATE,NULL);

        COMMIT;
    END;

    PROCEDURE UpdateCustomer(
        cid NUMBER,
        newBalance NUMBER
    )
    IS
    BEGIN
        UPDATE Customers
        SET Balance = newBalance
        WHERE CustomerID = cid;

        COMMIT;
    END;

    FUNCTION GetBalance(
        cid NUMBER
    )
    RETURN NUMBER
    IS
        bal NUMBER;
    BEGIN

        SELECT Balance
        INTO bal
        FROM Customers
        WHERE CustomerID = cid;

        RETURN bal;

    END;

END CustomerManagement;
/

BEGIN
    CustomerManagement.AddCustomer(
        5,
        'Arun',
        TO_DATE('1999-05-10','YYYY-MM-DD'),
        5000
    );

    CustomerManagement.UpdateCustomer(5,8000);
END;
/

SELECT CustomerManagement.GetBalance(5) AS Balance
FROM Dual;


-- Scenario 2: Employee Management Package

CREATE OR REPLACE PACKAGE EmployeeManagement AS

    PROCEDURE HireEmployee(
        id NUMBER,
        name VARCHAR2,
        pos VARCHAR2,
        sal NUMBER,
        dept VARCHAR2
    );

    PROCEDURE UpdateEmployee(
        id NUMBER,
        newsalary NUMBER
    );

    FUNCTION AnnualSalary(
        id NUMBER
    ) RETURN NUMBER;

END EmployeeManagement;
/

CREATE OR REPLACE PACKAGE BODY EmployeeManagement AS

    PROCEDURE HireEmployee(
        id NUMBER,
        name VARCHAR2,
        pos VARCHAR2,
        sal NUMBER,
        dept VARCHAR2
    )
    IS
    BEGIN

        INSERT INTO Employees
        VALUES(
        id,
        name,
        pos,
        sal,
        dept,
        SYSDATE);

        COMMIT;

    END;

    PROCEDURE UpdateEmployee(
        id NUMBER,
        newsalary NUMBER
    )
    IS
    BEGIN

        UPDATE Employees
        SET Salary = newsalary
        WHERE EmployeeID=id;

        COMMIT;

    END;

    FUNCTION AnnualSalary(
        id NUMBER
    )
    RETURN NUMBER
    IS
        sal NUMBER;
    BEGIN

        SELECT Salary
        INTO sal
        FROM Employees
        WHERE EmployeeID=id;

        RETURN sal*12;

    END;

END EmployeeManagement;
/

BEGIN

    EmployeeManagement.HireEmployee(
    3,
    'David',
    'Tester',
    40000,
    'IT');

    EmployeeManagement.UpdateEmployee(3,45000);

END;
/

SELECT EmployeeManagement.AnnualSalary(3)
AS AnnualSalary
FROM Dual;


-- Scenario 3: Account Operations Package

CREATE OR REPLACE PACKAGE AccountOperations AS

    PROCEDURE OpenAccount(
        aid NUMBER,
        cid NUMBER,
        type VARCHAR2,
        bal NUMBER
    );

    PROCEDURE CloseAccount(
        aid NUMBER
    );

    FUNCTION TotalBalance(
        cid NUMBER
    ) RETURN NUMBER;

END AccountOperations;
/

CREATE OR REPLACE PACKAGE BODY AccountOperations AS

    PROCEDURE OpenAccount(
        aid NUMBER,
        cid NUMBER,
        type VARCHAR2,
        bal NUMBER
    )
    IS
    BEGIN

        INSERT INTO Accounts
        VALUES(
        aid,
        cid,
        type,
        bal,
        SYSDATE);

        COMMIT;

    END;

    PROCEDURE CloseAccount(
        aid NUMBER
    )
    IS
    BEGIN

        DELETE FROM Accounts
        WHERE AccountID=aid;

        COMMIT;

    END;

    FUNCTION TotalBalance(
        cid NUMBER
    )
    RETURN NUMBER
    IS
        total NUMBER;
    BEGIN

        SELECT SUM(Balance)
        INTO total
        FROM Accounts
        WHERE CustomerID=cid;

        RETURN total;

    END;

END AccountOperations;
/

BEGIN

    AccountOperations.OpenAccount(
    5,
    1,
    'Savings',
    3000);

END;
/

SELECT AccountOperations.TotalBalance(1)
AS TotalBalance
FROM Dual;

BEGIN

    AccountOperations.CloseAccount(5);

END;
/

SELECT * FROM Accounts;