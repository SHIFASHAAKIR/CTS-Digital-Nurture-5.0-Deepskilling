class Task {
    int taskId;
    String taskName;
    String status;
    public Task(int taskId, String taskName, String status) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.status = status;
    }
    @Override
    public String toString() {
        return "Task ID: " + taskId +
                ", Task Name: " + taskName +
                ", Status: " + status;
    }
}
class Node {
    Task task;
    Node next;
    public Node(Task task) {
        this.task = task;
        this.next = null;
    }
}
public class TaskManagementSystem {
    private Node head;
    public void addTask(Task task) {
        Node newNode = new Node(task);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        System.out.println("Task Added Successfully.");
    }
    public Task searchTask(int taskId) {
        Node current = head;
        while (current != null) {
            if (current.task.taskId == taskId) {
                return current.task;
            }
            current = current.next;
        }
        return null;
    }
    public void displayTasks() {
        System.out.println("\nTask List:");
        Node current = head;
        while (current != null) {
            System.out.println(current.task);
            current = current.next;
        }
    }
    public void deleteTask(int taskId) {
        if (head == null) {
            System.out.println("Task List is Empty.");
            return;
        }
        if (head.task.taskId == taskId) {
            head = head.next;
            System.out.println("Task Deleted Successfully.");
            return;
        }
        Node current = head;
        while (current.next != null &&
               current.next.task.taskId != taskId) {
            current = current.next;
        }
        if (current.next == null) {
            System.out.println("Task Not Found.");
        } else {
            current.next = current.next.next;
            System.out.println("Task Deleted Successfully.");
        }
    }
    public static void main(String[] args) {
        TaskManagementSystem system = new TaskManagementSystem();
        system.addTask(new Task(101, "Design UI", "Pending"));
        system.addTask(new Task(102, "Develop Backend", "In Progress"));
        system.addTask(new Task(103, "Testing", "Pending"));
        system.displayTasks();
        System.out.println("\nSearching Task ID 102:");
        Task task = system.searchTask(102);
        if (task != null) {
            System.out.println(task);
        } else {
            System.out.println("Task Not Found.");
        }
        system.deleteTask(102);
        system.displayTasks();
    }
}