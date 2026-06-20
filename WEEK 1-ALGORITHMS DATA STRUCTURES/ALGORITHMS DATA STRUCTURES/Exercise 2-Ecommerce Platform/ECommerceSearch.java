import java.util.Arrays;
import java.util.Comparator;
class Product {
    int productId;
    String productName;
    String category;
    public Product(int productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }
    @Override
    public String toString() {
        return "Product ID: " + productId +
               ", Name: " + productName +
               ", Category: " + category;
    }
}
public class ECommerceSearch {
    public static Product linearSearch(Product[] products, int targetId) {
        for (Product product : products) {
            if (product.productId == targetId) {
                return product;
            }
        }
        return null;
    }
    public static Product binarySearch(Product[] products, int targetId) {
        int left = 0;
        int right = products.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (products[mid].productId == targetId) {
                return products[mid];
            }
            if (products[mid].productId < targetId) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }
    public static void main(String[] args) {
        Product[] products = {
            new Product(105, "Laptop", "Electronics"),
            new Product(101, "Mobile", "Electronics"),
            new Product(103, "Shoes", "Fashion"),
            new Product(102, "Watch", "Accessories"),
            new Product(104, "Bag", "Fashion")
        };
        int searchId = 103;
        Product linearResult = linearSearch(products, searchId);
        System.out.println("Linear Search Result:");
        if (linearResult != null) {
            System.out.println(linearResult);
        } else {
            System.out.println("Product Not Found");
        }
        Arrays.sort(products, Comparator.comparingInt(p -> p.productId));
        Product binaryResult = binarySearch(products, searchId);
        System.out.println("\nBinary Search Result:");
        if (binaryResult != null) {
            System.out.println(binaryResult);
        } else {
            System.out.println("Product Not Found");
        }
    }
}