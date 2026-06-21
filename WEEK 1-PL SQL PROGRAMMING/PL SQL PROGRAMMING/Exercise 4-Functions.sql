SET SERVEROUTPUT ON;

------------------------------------------------------------
-- Scenario 1
-- Function to Calculate Customer Age
------------------------------------------------------------

CREATE OR REPLACE FUNCTION CalculateAge(
    dob DATE
)
RETURN NUMBER
IS
    age NUMBER;
BEGIN

    age := TRUNC(MONTHS_BETWEEN(SYSDATE, dob) / 12);

    RETURN age;

END;
/

------------------------------------------------------------
-- Test Scenario 1
------------------------------------------------------------

SELECT Name,
       CalculateAge(DOB) AS Age
FROM Customers;

------------------------------------------------------------
-- Scenario 2
-- Function to Calculate Monthly Installment
------------------------------------------------------------

CREATE OR REPLACE FUNCTION CalculateMonthlyInstallment(

    loanAmount NUMBER,
    interestRate NUMBER,
    years NUMBER

)
RETURN NUMBER
IS

    monthlyInstallment NUMBER;

BEGIN

    monthlyInstallment :=
    (loanAmount + (loanAmount * interestRate * years /100))
    /(years*12);

    RETURN monthlyInstallment;

END;
/

------------------------------------------------------------
-- Test Scenario 2
------------------------------------------------------------

SELECT LoanID,
       CalculateMonthlyInstallment(LoanAmount,InterestRate,5)
       AS Monthly_Installment
FROM Loans;

------------------------------------------------------------
-- Scenario 3
-- Function to Check Sufficient Balance
------------------------------------------------------------

CREATE OR REPLACE FUNCTION HasSufficientBalance(

    accId NUMBER,
    amount NUMBER

)
RETURN BOOLEAN
IS

    balance NUMBER;

BEGIN

    SELECT Balance
    INTO balance
    FROM Accounts
    WHERE AccountID = accId;

    IF balance >= amount THEN

        RETURN TRUE;

    ELSE

        RETURN FALSE;

    END IF;

END;
/

------------------------------------------------------------
-- Test Scenario 3
------------------------------------------------------------

DECLARE

    result BOOLEAN;

BEGIN

    result := HasSufficientBalance(1,500);

    IF result THEN

        DBMS_OUTPUT.PUT_LINE('Sufficient Balance');

    ELSE

        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');

    END IF;

END;
/