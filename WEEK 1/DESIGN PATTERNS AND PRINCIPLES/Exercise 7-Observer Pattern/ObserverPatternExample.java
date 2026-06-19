import java.util.ArrayList;
import java.util.List;
public class ObserverPatternExample {
    interface Observer {
        void update(String stockName, double price);
    }
    interface Stock {
        void registerObserver(Observer observer);
        void removeObserver(Observer observer);
        void notifyObservers();
    }
    static class StockMarket implements Stock {
        private List<Observer> observers = new ArrayList<>();
        private String stockName;
        private double price;
        public void setStockPrice(String stockName, double price) {
            this.stockName = stockName;
            this.price = price;
            notifyObservers();
        }
        public void registerObserver(Observer observer) {
            observers.add(observer);
        }
        public void removeObserver(Observer observer) {
            observers.remove(observer);
        }
        public void notifyObservers() {
            for (Observer observer : observers) {
                observer.update(stockName, price);
            }
        }
    }
    static class MobileApp implements Observer {
        public void update(String stockName, double price) {
            System.out.println("Mobile App: " + stockName +
                               " price updated to Rs." + price);
        }
    }
    static class WebApp implements Observer {
        public void update(String stockName, double price) {
            System.out.println("Web App: " + stockName +
                               " price updated to Rs." + price);
        }
    }
    public static void main(String[] args) {
        StockMarket market = new StockMarket();
        Observer mobile = new MobileApp();
        Observer web = new WebApp();
        market.registerObserver(mobile);
        market.registerObserver(web);
        market.setStockPrice("TCS", 3850.50);
    }
}