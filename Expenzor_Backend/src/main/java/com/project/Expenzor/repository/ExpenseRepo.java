package com.project.Expenzor.repository;

import com.project.Expenzor.model.Expense;
import com.project.Expenzor.dto.CategorySumDTO; // Assuming you put DTOs in a 'dto' package
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, Long> {

    // 1. See total money spent for that particular month
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE YEAR(e.expenseDate) = :year AND MONTH(e.expenseDate) = :month")
    BigDecimal sumAmountByMonthAndYear(int year, int month);

    // 2. See the category-wise expenditure for the current month
    // Ensure the DTO path is correct (e.g., com.project.Expenzor.dto.CategorySumDTO)
    @Query("SELECT new com.project.Expenzor.dto.CategorySumDTO(e.category, SUM(e.amount)) " +
           "FROM Expense e WHERE YEAR(e.expenseDate) = :year AND MONTH(e.expenseDate) = :month " +
           "GROUP BY e.category")
    List<CategorySumDTO> findCategoryWiseExpenditureByMonthAndYear(int year, int month);

    // 3. See the recent transactions that were added to the DB
    List<Expense> findTop5ByOrderByCreatedAtDesc(); // Example for top 5 recent transactions

    // 5. Calendar click: Redirect to transaction page for that particular date
    List<Expense> findByExpenseDate(LocalDate date);

    // Optional: For the "Total Money" (sum of all expenses on dashboard)
    @Query("SELECT SUM(e.amount) FROM Expense e")
    BigDecimal sumAllExpenseAmounts();
}