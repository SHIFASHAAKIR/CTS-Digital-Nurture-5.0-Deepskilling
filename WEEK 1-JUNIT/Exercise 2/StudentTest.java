package org.example;

import org.junit.Test;
import static org.junit.Assert.*;

public class StudentTest {

    @Test
    public void testName() {
        Student s = new Student();
        assertEquals("Shifa", s.getName());
    }

    @Test
    public void testMarks() {
        Student s = new Student();
        assertEquals(90, s.getMarks());
    }
}