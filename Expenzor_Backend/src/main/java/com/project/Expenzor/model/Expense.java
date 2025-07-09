package com.project.Expenzor.model;

import java.math.BigDecimal; 
import java.time.LocalDate; 
import java.time.LocalDateTime;
import jakarta.persistence.*; 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "expenses")
@AllArgsConstructor
@NoArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") 
    private Long id; 
    @Column(name = "description", length = 255) 
    private String description; 
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount; 
    @Column(name = "category", nullable = false, length = 50) 
    private String category;
    @Column(name = "expense_date", nullable = false) 
    private LocalDate expenseDate; 
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now(); 
    }
}