package com.project.Expenzor.dto; // Common practice to put DTOs in a 'dto' package

import java.math.BigDecimal;
import lombok.AllArgsConstructor; // For the constructor
import lombok.Data;              // For getters/setters/toString etc.
import lombok.NoArgsConstructor; // For default constructor

@Data // Provides getters, setters, equals, hashCode, toString
@AllArgsConstructor // Generates a constructor with all fields
@NoArgsConstructor  // Generates a no-argument constructor
public class CategorySumDTO {
    private String category;
    private BigDecimal totalAmount; // This field will hold the SUM(e.amount)
}