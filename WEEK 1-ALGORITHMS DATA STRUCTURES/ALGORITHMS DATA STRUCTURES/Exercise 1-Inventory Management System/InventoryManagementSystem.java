import java.util.HashMap;
import java.util.Map;
class Product {
    private int productId;
    private String productName;
    private int quantity;
    private double price;
    public Product(int productId, String productName, int quantity, double price) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }
    public int getProductId() {
        return productId;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    @Override
    public String toString() {
        return "Product ID: " + productId +
               ", Name: " + productName +
               ", Quantity: " + quantity +
               ", Price: ₹" + price;
    }
}
public class InventoryManagementSystem {
    private Map<Integer, Product> inventory;
    public InventoryManagementSystem() {
        inventory = new HashMap<>();
    }
    public void addProduct(Product product) {
        inventory.put(product.getProductId(), product);
        System.out.println("Product Added Successfully.");
    }
    public void updateProduct(int productId, String name, int quantity, double price) {
        Product product = inventory.get(productId);
        if (product != null) {
            product.setProductName(name);
            product.setQuantity(quantity);
            product.setPrice(price);
            System.out.println("Product Updated Successfully.");
        } else {
            System.out.println("Product Not Found.");
        }
    }
    public void deleteProduct(int productId) {
        if (inventory.remove(productId) != null) {
            System.out.println("Product Deleted Successfully.");
        } else {
            System.out.println("Product Not Found.");
        }
    }
    public void displayProducts() {
        System.out.println("\nInventory Details:");
        for (Product product : inventory.values()) {
            System.out.println(product);
        }
    }
    public static void main(String[] args) {
        InventoryManagementSystem ims = new InventoryManagementSystem();
        ims.addProduct(new Product(101, "Laptop", 15, 50000));
        ims.addProduct(new Product(102, "Mouse", 50, 500));
        ims.addProduct(new Product(103, "Keyboard", 30, 1200));
        ims.displayProducts();
        ims.updateProduct(102, "Wireless Mouse", 45, 800);
        ims.deleteProduct(103);
        ims.displayProducts();
    }
}