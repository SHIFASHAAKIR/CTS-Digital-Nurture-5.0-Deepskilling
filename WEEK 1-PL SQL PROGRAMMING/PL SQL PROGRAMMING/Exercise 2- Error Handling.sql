SET SERVEROUTPUT ON;
-- Scenario 1
-- Safe Transfer Funds
CREATE OR REPLACE PROCEDURE SafeTransferFunds(
    fromAcc NUMBER,
    toAcc NUMBER,
    amount NUMBER
)
IS
    balance NUMBER;
BEGIN
    SELECT Balance
    INTO balance
    FROM Accounts
    WHERE AccountID = fromAcc;
    IF balance < amount THEN
        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');
        ROLLBACK;
    ELSE
        UPDATE Accounts
        SET Balance = Balance - amount
        WHERE AccountID = fromAcc;
        UPDATE Accounts
        SET Balance = Balance + amount
        WHERE AccountID = toAcc;
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Amount Transferred Successfully');
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error : ' || SQLERRM);

END;
/
-- Test Scenario 1
BEGIN
    SafeTransferFunds(1,2,500);
END;
/
SELECT * FROM Accounts;
-- Scenario 2
-- Update Employee Salary
CREATE OR REPLACE PROCEDURE UpdateSalary(
    empId NUMBER,
    percent NUMBER
)
IS
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * percent / 100)
    WHERE EmployeeID = empId;
    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('Employee Not Found');
    ELSE
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Salary Updated Successfully');
    END IF;
END;
/
------------------------------------------------------------
-- Test Scenario 2
------------------------------------------------------------

BEGIN
    UpdateSalary(1,10);
END;
/
SELECT * FROM Employees;
-- Scenario 3
-- Add New Customer
CREATE OR REPLACE PROCEDURE AddNewCustomer(
    cid NUMBER,
    cname VARCHAR2,
    dob DATE,
    bal NUMBER
)
IS
BEGIN

    INSERT INTO Customers(CustomerID, Name, DOB, Balance, LastModified, IsVIP)VALUES(cid, cname, dob, bal, SYSDATE,  NULL);
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Customer Added Successfully');
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Customer ID Already Exists');
END;
/
-- Test Scenario 3
BEGIN

    AddNewCustomer(
        4,
        'Rahul',
        TO_DATE('1998-06-10','YYYY-MM-DD'),
        12000
    );

END;
/
-- Check Customers
SELECT * FROM Customers;