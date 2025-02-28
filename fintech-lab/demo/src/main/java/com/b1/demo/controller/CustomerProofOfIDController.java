<<<<<<< HEAD:demo/src/main/java/com/b1/demo/controller/CustomerProofOfIDController.java
package com.b1.demo.controller;
import com.b1.demo.entity.*;
import com.b1.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/customer-proof")
public class CustomerProofOfIDController {
    @Autowired
    private CustomerProofOfIDService customerProofOfIDService;

    @PostMapping("/add")
    public CustomerProofOfID addCustomerProofOfID(@RequestBody CustomerProofOfID customerProofOfID) {
        return customerProofOfIDService.saveCustomerProofOfID(customerProofOfID);
    }

    @GetMapping("/all")
    public List<CustomerProofOfID> getAllCustomerProofs() {
        return customerProofOfIDService.getAllCustomerProofs();
    }
=======
package com.b1.demo.controller;
import com.b1.demo.entity.*;
import com.b1.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/customer-proof")
public class CustomerProofOfIDController {
    @Autowired
    private CustomerProofOfIDService customerProofOfIDService;

    @PostMapping("/add")
    public CustomerProofOfID addCustomerProofOfID(@RequestBody CustomerProofOfID customerProofOfID) {
        return customerProofOfIDService.saveCustomerProofOfID(customerProofOfID);
    }

    @GetMapping("/all")
    public List<CustomerProofOfID> getAllCustomerProofs() {
        return customerProofOfIDService.getAllCustomerProofs();
    }
>>>>>>> 48700dbd1c5b15006da0a5aada83cfdd2f3048cc:fintech-lab/demo/src/main/java/com/b1/demo/controller/CustomerProofOfIDController.java
}