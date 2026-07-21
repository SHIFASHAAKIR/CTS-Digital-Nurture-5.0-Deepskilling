public class StrategyPatternExample {
    interface PaymentStrategy {
        void pay(double amount);
    }
    static class CreditCardPayment implements PaymentStrategy {
        public void pay(double amount) {
            System.out.println("Paid Rs." + amount + " using Credit Card");
        }
    }
    static class PayPalPayment implements PaymentStrategy {
        public void pay(double amount) {
            System.out.println("Paid Rs." + amount + " using PayPal");
        }
    }
    static class PaymentContext {
        private PaymentStrategy strategy;

        public void setPaymentStrategy(PaymentStrategy strategy) {
            this.strategy = strategy;
        }

        public void makePayment(double amount) {
            strategy.pay(amount);
        }
    }
    public static void main(String[] args) {

        PaymentContext context = new PaymentContext();

        context.setPaymentStrategy(new CreditCardPayment());
        context.makePayment(5000);

        context.setPaymentStrategy(new PayPalPayment());
        context.makePayment(2500);
    }
}