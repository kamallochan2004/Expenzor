package com.project.Expenzor.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.validation.constraints.DecimalMin; // For validation (optional but recommended)
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExpenseRequestDTO {
    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotBlank(message = "Category cannot be empty")
    private String category;

    @NotNull(message = "Expense date is required")
    private LocalDate expenseDate;
}