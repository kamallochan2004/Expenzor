package com.project.Expenzor.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlySummaryDTO {
    private String monthLabel; // Could be "June", "May", or "2025-06"
    private BigDecimal totalAmount;
}