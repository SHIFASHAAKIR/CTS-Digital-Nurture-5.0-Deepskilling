class Order {
    int orderId;
    String customerName;
    double totalPrice;
    public Order(int orderId, String customerName, double totalPrice) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.totalPrice = totalPrice;
    }
    @Override
    public String toString() {
        return "Order ID: " + orderId +
               ", Customer: " + customerName +
               ", Total Price: ₹" + totalPrice;
    }
}
public class OrderSortingSystem {
    public static void bubbleSort(Order[] orders) {
        int n = orders.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {

                if (orders[j].totalPrice > orders[j + 1].totalPrice) {
                    Order temp = orders[j];
                    orders[j] = orders[j + 1];
                    orders[j + 1] = temp;
                }
            }
        }
    }
    public static void quickSort(Order[] orders, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(orders, low, high);
            quickSort(orders, low, pivotIndex - 1);
            quickSort(orders, pivotIndex + 1, high);
        }
    }
    public static int partition(Order[] orders, int low, int high) {
        double pivot = orders[high].totalPrice;
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (orders[j].totalPrice <= pivot) {
                i++;
                Order temp = orders[i];
                orders[i] = orders[j];
                orders[j] = temp;
            }
        }
        Order temp = orders[i + 1];
        orders[i + 1] = orders[high];
        orders[high] = temp;
        return i + 1;
    }
    public static void displayOrders(Order[] orders) {
        for (Order order : orders) {
            System.out.println(order);
        }
    }
    public static void main(String[] args) {
        Order[] orders1 = {
            new Order(101, "Janani", 2500),
            new Order(102, "Shifa", 1200),
            new Order(103, "Geko", 4500),
            new Order(104, "Bommi", 1800),
            new Order(105, "Anusha", 3200)
        };
        Order[] orders2 = {
            new Order(101, "Janani", 2500),
            new Order(102, "Shifa", 1200),
            new Order(103, "Geko", 4500),
            new Order(104, "Bommi", 1800),
            new Order(105, "Anusha", 3200)
        };
        System.out.println("Orders Sorted Using Bubble Sort:");
        bubbleSort(orders1);
        displayOrders(orders1);
        System.out.println("\nOrders Sorted Using Quick Sort:");
        quickSort(orders2, 0, orders2.length - 1);
        displayOrders(orders2);
    }
}