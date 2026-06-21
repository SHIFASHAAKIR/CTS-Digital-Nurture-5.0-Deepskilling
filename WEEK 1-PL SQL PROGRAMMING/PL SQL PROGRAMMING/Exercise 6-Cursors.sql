SET SERVEROUTPUT ON;

-- Scenario 1: Generate Monthly Statements

DECLARE

    CURSOR GenerateMonthlyStatements IS
    SELECT TransactionID,
           AccountID,
           Amount,
           TransactionType
    FROM Transactions
    WHERE EXTRACT(MONTH FROM TransactionDate)=EXTRACT(MONTH FROM SYSDATE)
      AND EXTRACT(YEAR FROM TransactionDate)=EXTRACT(YEAR FROM SYSDATE);

    t GenerateMonthlyStatements%ROWTYPE;

BEGIN

    OPEN GenerateMonthlyStatements;

    LOOP

        FETCH GenerateMonthlyStatements INTO t;

        EXIT WHEN GenerateMonthlyStatements%NOTFOUND;

        DBMS_OUTPUT.PUT_LINE(
        'Transaction ID : '||t.TransactionID||
        ' Account : '||t.AccountID||
        ' Amount : '||t.Amount||
        ' Type : '||t.TransactionType);

    END LOOP;

    CLOSE GenerateMonthlyStatements;

END;
/

-- Scenario 2: Apply Annual Fee

DECLARE

    CURSOR ApplyAnnualFee IS
    SELECT AccountID
    FROM Accounts;

BEGIN

    FOR acc IN ApplyAnnualFee LOOP

        UPDATE Accounts
        SET Balance = Balance - 100
        WHERE AccountID = acc.AccountID;

    END LOOP;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Annual Fee Applied');

END;
/

SELECT * FROM Accounts;

-- Scenario 3: Update Loan Interest Rates

DECLARE

    CURSOR UpdateLoanInterestRates IS
    SELECT LoanID
    FROM Loans;

BEGIN

    FOR loan IN UpdateLoanInterestRates LOOP

        UPDATE Loans
        SET InterestRate = InterestRate + 0.5
        WHERE LoanID = loan.LoanID;

    END LOOP;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Loan Interest Rates Updated');

END;
/

SELECT * FROM Loans;