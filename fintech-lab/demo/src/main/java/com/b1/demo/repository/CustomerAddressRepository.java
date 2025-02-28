<<<<<<< HEAD:demo/src/main/java/com/b1/demo/repository/CustomerAddressRepository.java
package com.b1.demo.repository;
import com.b1.demo.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
=======
package com.b1.demo.repository;
import com.b1.demo.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
>>>>>>> 48700dbd1c5b15006da0a5aada83cfdd2f3048cc:fintech-lab/demo/src/main/java/com/b1/demo/repository/CustomerAddressRepository.java
public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, Long> {}