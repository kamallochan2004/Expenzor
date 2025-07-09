package com.project.Expenzor.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ExpenseResponseDTO {
    private Long id;
    private String description;
    private BigDecimal amount;
    private String category;
    private LocalDate expenseDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}