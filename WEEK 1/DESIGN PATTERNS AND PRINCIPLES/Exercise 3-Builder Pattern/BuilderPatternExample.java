public class BuilderPatternExample {
    static class Computer {
        private String cpu;
        private int ram;
        private int storage;
        private Computer(Builder builder) {
            this.cpu = builder.cpu;
            this.ram = builder.ram;
            this.storage = builder.storage;
        }
        static class Builder {
            private String cpu;
            private int ram;
            private int storage;
            public Builder setCpu(String cpu) {
                this.cpu = cpu;
                return this;
            }
            public Builder setRam(int ram) {
                this.ram = ram;
                return this;
            }
            public Builder setStorage(int storage) {
                this.storage = storage;
                return this;
            }
            public Computer build() {
                return new Computer(this);
            }
        }
        public void display() {
            System.out.println("CPU: " + cpu);
            System.out.println("RAM: " + ram + " GB");
            System.out.println("Storage: " + storage + " GB");
            System.out.println();
        }
    }
    public static void main(String[] args) {
        Computer computer1 = new Computer.Builder()
                .setCpu("Intel i5")
                .setRam(8)
                .setStorage(512)
                .build();
        Computer computer2 = new Computer.Builder()
                .setCpu("Intel i7")
                .setRam(16)
                .setStorage(1024)
                .build();
        System.out.println("Computer 1:");
        computer1.display();
        System.out.println("Computer 2:");
        computer2.display();
    }
}