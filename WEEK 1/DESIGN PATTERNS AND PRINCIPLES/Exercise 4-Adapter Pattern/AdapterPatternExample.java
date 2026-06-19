public class AdapterPatternExample {
    interface PaymentProcessor {
        void processPayment(double amount);
    }
    static class PayPalGateway {
        void sendPayment(double amount) {
            System.out.println("Payment of Rs." + amount + " processed using PayPal");
        }
    }
    static class StripeGateway {
        void makeTransaction(double amount) {
            System.out.println("Payment of Rs." + amount + " processed using Stripe");
        }
    }
    static class PayPalAdapter implements PaymentProcessor {
        private PayPalGateway paypal;

        public PayPalAdapter(PayPalGateway paypal) {
            this.paypal = paypal;
        }
        public void processPayment(double amount) {
            paypal.sendPayment(amount);
        }
    }
    static class StripeAdapter implements PaymentProcessor {
        private StripeGateway stripe;
        public StripeAdapter(StripeGateway stripe) {
            this.stripe = stripe;
        }
        public void processPayment(double amount) {
            stripe.makeTransaction(amount);
        }
    }
    public static void main(String[] args) {
        PaymentProcessor payment1 =
                new PayPalAdapter(new PayPalGateway());
        PaymentProcessor payment2 =
                new StripeAdapter(new StripeGateway());
        payment1.processPayment(1000);
        payment2.processPayment(2500);
    }
}