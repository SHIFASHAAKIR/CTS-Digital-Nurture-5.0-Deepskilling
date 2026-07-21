SET SERVEROUTPUT ON;
------------------------------------------------------------
-- Scenario 1
-- Process Monthly Interest (1% for Savings Accounts)
------------------------------------------------------------
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
IS
BEGIN
    UPDATE Accounts
    SET Balance = Balance + (Balance * 0.01)
    WHERE AccountType = 'Savings';
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Monthly Interest Applied Successfully');
END;
/
-- Test Scenario 1
BEGIN
    ProcessMonthlyInterest;
END;
/

SELECT * FROM Accounts;
-- Scenario 2
-- Update Employee Bonus

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    dept VARCHAR2,
    bonus NUMBER
)
IS
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * bonus / 100)
    WHERE Department = dept;
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Bonus Updated Successfully');
END;
/
-- Test Scenario 2

BEGIN

    UpdateEmployeeBonus('IT',10);

END;
/

SELECT * FROM Employees;
-- Scenario 3
-- Transfer Funds

CREATE OR REPLACE PROCEDURE TransferFunds(fromAccount NUMBER,toAccount NUMBER,amount NUMBER)
IS
    balance NUMBER;
BEGIN
    SELECT Balance
    INTO balance
    FROM Accounts
    WHERE AccountID = fromAccount;
    IF balance >= amount THEN
        UPDATE Accounts
        SET Balance = Balance - amount
        WHERE AccountID = fromAccount;

        UPDATE Accounts
        SET Balance = Balance + amount
        WHERE AccountID = toAccount;

        COMMIT;

        DBMS_OUTPUT.PUT_LINE('Amount Transferred Successfully');

    ELSE
        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');
    END IF;

END;
/
-- Test Scenario 3
BEGIN

    TransferFunds(1,2,200);

END;
/
SELECT * FROM Accounts;