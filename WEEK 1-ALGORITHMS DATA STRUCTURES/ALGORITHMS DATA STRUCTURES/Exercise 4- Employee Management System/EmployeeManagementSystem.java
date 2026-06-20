class Employee {
    int employeeId;
    String name;
    String position;
    double salary;
    public Employee(int employeeId, String name, String position, double salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }
    @Override
    public String toString() {
        return "Employee ID: " + employeeId +
                ", Name: " + name +
                ", Position: " + position +
                ", Salary: ₹" + salary;
    }
}
public class EmployeeManagementSystem {
    private Employee[] employees;
    private int count;
    public EmployeeManagementSystem(int size) {
        employees = new Employee[size];
        count = 0;
    }
    public void addEmployee(Employee employee) {
        if (count < employees.length) {
            employees[count] = employee;
            count++;
            System.out.println("Employee Added Successfully.");
        } else {
            System.out.println("Employee Array is Full.");
        }
    }
    public Employee searchEmployee(int employeeId) {
        for (int i = 0; i < count; i++) {
            if (employees[i].employeeId == employeeId) {
                return employees[i];
            }
        }
        return null;
    }
    public void displayEmployees() {
        System.out.println("\nEmployee Records:");
        for (int i = 0; i < count; i++) {
            System.out.println(employees[i]);
        }
    }
    public void deleteEmployee(int employeeId) {
        int index = -1;
        for (int i = 0; i < count; i++) {
            if (employees[i].employeeId == employeeId) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            System.out.println("Employee Not Found.");
            return;
        }
        for (int i = index; i < count - 1; i++) {
            employees[i] = employees[i + 1];
        }
        employees[count - 1] = null;
        count--;
        System.out.println("Employee Deleted Successfully.");
    }
    public static void main(String[] args) {
        EmployeeManagementSystem system =
                new EmployeeManagementSystem(10);
        system.addEmployee(
                new Employee(101, "Janani", "Developer", 50000));
        system.addEmployee(
                new Employee(102, "Rahul", "Tester", 40000));
        system.addEmployee(
                new Employee(103, "Priya", "Manager", 70000));
        system.displayEmployees();
        System.out.println("\nSearching Employee ID 102:");
        Employee emp = system.searchEmployee(102);
        if (emp != null) {
            System.out.println(emp);
        } else {
            System.out.println("Employee Not Found.");
        }
        system.deleteEmployee(102);
        system.displayEmployees();
    }
}