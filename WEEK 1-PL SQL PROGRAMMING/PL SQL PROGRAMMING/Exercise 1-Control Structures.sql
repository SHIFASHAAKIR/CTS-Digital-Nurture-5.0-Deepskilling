SET SERVEROUTPUT ON;

INSERT INTO Customers
(CustomerID, Name, DOB, Balance, LastModified, IsVIP)
VALUES
(
3,
'Ramesh',
TO_DATE('1950-01-10','YYYY-MM-DD'),
20000,
SYSDATE,
NULL
);


INSERT INTO Loans
VALUES
(
2,
3,
10000,
8,
SYSDATE,
SYSDATE+20
);

COMMIT;


-- Scenario 1

DECLARE

    age NUMBER;

BEGIN

    FOR c IN (SELECT * FROM Customers) LOOP

        age := TRUNC(MONTHS_BETWEEN(SYSDATE,c.DOB)/12);

        IF age > 60 THEN

            UPDATE Loans
            SET InterestRate = InterestRate - 1
            WHERE CustomerID = c.CustomerID;

            DBMS_OUTPUT.PUT_LINE('Discount Applied to '||c.Name);

        END IF;

    END LOOP;

    COMMIT;

END;
/


-- Scenario 2



BEGIN

    UPDATE Customers
    SET IsVIP='TRUE'
    WHERE Balance>10000;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('VIP Status Updated');

END;
/

-- Display VIP Customers


SELECT CustomerID,
       Name,
       Balance,
       IsVIP
FROM Customers;


-- Scenario 3


BEGIN

    FOR r IN (

        SELECT c.Name,
               l.EndDate
        FROM Customers c
        JOIN Loans l
        ON c.CustomerID=l.CustomerID
        WHERE l.EndDate<=SYSDATE+30

    )

    LOOP

        DBMS_OUTPUT.PUT_LINE(
        'Reminder : '
        ||r.Name||
        ' Loan Due on '
        ||TO_CHAR(r.EndDate,'DD-MON-YYYY'));

    END LOOP;

END;
/


SELECT * FROM Loans;