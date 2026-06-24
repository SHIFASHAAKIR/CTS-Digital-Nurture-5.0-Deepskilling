package org.example;

import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.*;

public class EmployeeTest {

    private Employee employee;

    @Before
    public void setUp() {
        employee = new Employee();
        System.out.println("Setup");
    }

    @After
    public void tearDown() {
        employee = null;
        System.out.println("Teardown");
    }

    @Test
    public void testRole() {

        // Arrange
        String expected = "Developer";

        // Act
        String actual = employee.getRole();

        // Assert
        assertEquals(expected, actual);
    }
}