public class ProxyPatternExample {
    interface Image {
        void display();
    }
    static class RealImage implements Image {
        private String fileName;
        public RealImage(String fileName) {
            this.fileName = fileName;
            loadImage();
        }
        private void loadImage() {
            System.out.println("Loading image from remote server: " + fileName);
        }
        public void display() {
            System.out.println("Displaying image: " + fileName);
        }
    }
    static class ProxyImage implements Image {
        private String fileName;
        private RealImage realImage;
        public ProxyImage(String fileName) {
            this.fileName = fileName;
        }
        public void display() {
            if (realImage == null) {
                realImage = new RealImage(fileName); // Lazy initialization
            }
            realImage.display(); // Cached object reused
        }
    }
    public static void main(String[] args) {
        Image image = new ProxyImage("Nature.jpg");
        System.out.println("First Display:");
        image.display();
        System.out.println();
        System.out.println("Second Display:");
        image.display();
    }
}