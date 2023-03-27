package labshopcompensation.external;

import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    /**
     * Fallback
     */
    public Order getOrder(Long id) {
        Order order = new Order();
        return order;
    }
}
