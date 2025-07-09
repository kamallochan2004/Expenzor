package com.project.Expenzor.service;

import com.project.Expenzor.dto.CategorySumDTO;
import com.project.Expenzor.dto.ExpenseRequestDTO;
import com.project.Expenzor.dto.ExpenseResponseDTO;
import com.project.Expenzor.dto.MonthlySummaryDTO; // Import if you use this DTO
import com.project.Expenzor.model.Expense;
import com.project.Expenzor.repository.ExpenseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import for transactional methods

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter; // For formatting month names
import java.util.List;
import java.util.stream.Collectors; // For stream operations

@Service
@RequiredArgsConstructor // Lombok for constructor injection of final fields
public class ExpenseService {

    private final ExpenseRepo expenseRepo;

    // --- CRUD Operations ---

    // Save/Add Expense
    @Transactional // Ensures the whole operation is atomic
    public ExpenseResponseDTO addExpense(ExpenseRequestDTO requestDTO) {
        // Map DTO to Entity
        Expense expense = new Expense();
        expense.setDescription(requestDTO.getDescription());
        expense.setAmount(requestDTO.getAmount());
        expense.setCategory(requestDTO.getCategory());
        expense.setExpenseDate(requestDTO.getExpenseDate());
        // createdAt and updatedAt are handled by @PrePersist

        Expense savedExpense = expenseRepo.save(expense);

        // Map Entity back to Response DTO
        return mapToExpenseResponseDTO(savedExpense);
    }

    // Get All Expenses (potentially for a transactions page, returning DTOs)
    @Transactional(readOnly = true) // Read-only for performance optimization
    public List<ExpenseResponseDTO> getAllExpenses() {
        return expenseRepo.findAll().stream()
                .map(this::mapToExpenseResponseDTO)
                .collect(Collectors.toList());
    }

    // Get Expense by ID
    @Transactional(readOnly = true)
    public ExpenseResponseDTO getExpenseById(Long id) {
        Expense expense = expenseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id)); // Use a more specific
                                                                                              // exception if possible
        return mapToExpenseResponseDTO(expense);
    }

    // Update Expense
    @Transactional
    public ExpenseResponseDTO updateExpense(Long id, ExpenseRequestDTO requestDTO) {
        Expense existingExpense = expenseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));

        // Update fields from DTO
        existingExpense.setDescription(requestDTO.getDescription());
        existingExpense.setAmount(requestDTO.getAmount());
        existingExpense.setCategory(requestDTO.getCategory());
        existingExpense.setExpenseDate(requestDTO.getExpenseDate());
        // updatedAt is handled by @PreUpdate

        Expense updatedExpense = expenseRepo.save(existingExpense);
        return mapToExpenseResponseDTO(updatedExpense);
    }

    // Delete Expense
    @Transactional
    public void deleteExpense(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Expense ID cannot be null");
        }
        if (!expenseRepo.existsById(id)) { // Check if it exists before deleting
            throw new RuntimeException("Expense not found with id: " + id + " for deletion.");
        }
        expenseRepo.deleteById(id);
    }

    // --- Dashboard & Reporting Requirements ---

    // 1. See total money spent for that particular month
    @Transactional(readOnly = true)
    public BigDecimal getTotalMonthlyExpense(int year, int month) {
        BigDecimal total = expenseRepo.sumAmountByMonthAndYear(year, month);
        return total != null ? total : BigDecimal.ZERO; // Handle null if no expenses found
    }

    // Convenience method for current month
    @Transactional(readOnly = true)
    public BigDecimal getCurrentMonthTotalExpense() {
        LocalDate today = LocalDate.now();
        return getTotalMonthlyExpense(today.getYear(), today.getMonthValue());
    }

    // 2. See the category-wise expenditure for current month
    @Transactional(readOnly = true)
    public List<CategorySumDTO> getCategoryWiseExpenditureForCurrentMonth() {
        LocalDate today = LocalDate.now();
        return expenseRepo.findCategoryWiseExpenditureByMonthAndYear(today.getYear(), today.getMonthValue());
    }

    // 3. See the recent transactions that were added to the DB
    @Transactional(readOnly = true)
    public List<ExpenseResponseDTO> getRecentTransactions() {
        // Using findTop5ByOrderByCreatedAtDesc() from repository
        return expenseRepo.findTop5ByOrderByCreatedAtDesc().stream()
                .map(this::mapToExpenseResponseDTO)
                .collect(Collectors.toList());
    }

    // 4. See the total money spent in the previous months (e.g., last 3 months
    // including current)
    @Transactional(readOnly = true)
    public List<MonthlySummaryDTO> getPreviousMonthsComparison(int numberOfMonths) {
        List<MonthlySummaryDTO> monthlySummaries = new java.util.ArrayList<>();
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM yyyy"); // e.g., "Jun 2025"

        for (int i = 0; i < numberOfMonths; i++) {
            LocalDate monthToQuery = currentDate.minusMonths(i);
            int year = monthToQuery.getYear();
            int month = monthToQuery.getMonthValue();
            BigDecimal total = getTotalMonthlyExpense(year, month); // Reuse the existing method

            monthlySummaries.add(new MonthlySummaryDTO(
                    monthToQuery.format(monthFormatter), // Formatted month name
                    total));
        }
        // Reverse the list to show oldest first if desired by frontend, or adjust loop.
        // For dashboard comparison, often current month is last, so might reverse.
        java.util.Collections.reverse(monthlySummaries);
        return monthlySummaries;
    }

    @Transactional(readOnly = true)
    public List<CategorySumDTO> getCategoryWiseExpenditureByMonthAndYear(int year, int month) {
        return expenseRepo.findCategoryWiseExpenditureByMonthAndYear(year, month);
    }

    // 5. Calendar click: Redirect to transaction page for that particular date
    @Transactional(readOnly = true)
    public List<ExpenseResponseDTO> getExpensesByDate(LocalDate date) {
        return expenseRepo.findByExpenseDate(date).stream()
                .map(this::mapToExpenseResponseDTO)
                .collect(Collectors.toList());
    }

    // --- Helper Method for DTO Mapping ---
    private ExpenseResponseDTO mapToExpenseResponseDTO(Expense expense) {
        ExpenseResponseDTO dto = new ExpenseResponseDTO();
        dto.setId(expense.getId());
        dto.setDescription(expense.getDescription());
        dto.setAmount(expense.getAmount());
        dto.setCategory(expense.getCategory());
        dto.setExpenseDate(expense.getExpenseDate());
        dto.setCreatedAt(expense.getCreatedAt());
        dto.setUpdatedAt(expense.getUpdatedAt());
        return dto;
    }

    // You might also need a method to calculate total amount for the dashboard's
    // main display
    @Transactional(readOnly = true)
    public BigDecimal getTotalOverallExpense() {
        BigDecimal total = expenseRepo.sumAllExpenseAmounts();
        return total != null ? total : BigDecimal.ZERO;
    }
}