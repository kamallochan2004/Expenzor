package com.project.Expenzor.controller;

import com.project.Expenzor.dto.CategorySumDTO;
import com.project.Expenzor.dto.ExpenseRequestDTO;
import com.project.Expenzor.dto.ExpenseResponseDTO;
import com.project.Expenzor.dto.MonthlySummaryDTO; // Import if you use this DTO
import com.project.Expenzor.service.ExpenseService;
import jakarta.validation.Valid; // For @Valid annotation
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*; // If you decide to return a Map instead of MonthlySummaryDTO list

@RestController
@RequestMapping("/api/expense")
@RequiredArgsConstructor // Lombok for constructor injection
@CrossOrigin(origins = "*") // Allow requests from any origin (for development)
public class ExpenseController { // Renamed to follow Java naming conventions (PascalCase)

    private final ExpenseService expenseService;

    // --- Basic CRUD Operations ---

    // Add Expense (from AddExpense page)
    @PostMapping("/add") // More RESTful endpoint name
    public ResponseEntity<ExpenseResponseDTO> addExpense(@Valid @RequestBody ExpenseRequestDTO expenseRequestDTO) {
        // @Valid triggers validation annotations within ExpenseRequestDTO
        ExpenseResponseDTO savedExpense = expenseService.addExpense(expenseRequestDTO);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }

    // Get All Expenses (for Transactions page)
    @GetMapping("/all") // More RESTful endpoint name
    public ResponseEntity<List<ExpenseResponseDTO>> getAllExpenses() {
        List<ExpenseResponseDTO> expenses = expenseService.getAllExpenses();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // Get Expense by ID
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> getExpenseById(@PathVariable Long id) {
        try {
            ExpenseResponseDTO expense = expenseService.getExpenseById(id);
            return new ResponseEntity<>(expense, HttpStatus.OK);
        } catch (RuntimeException e) { // Catch the RuntimeException thrown by service for "not found"
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update Expense
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponseDTO> updateExpense(@PathVariable Long id,
            @Valid @RequestBody ExpenseRequestDTO expenseRequestDTO) {
        try {
            ExpenseResponseDTO updatedExpense = expenseService.updateExpense(id, expenseRequestDTO);
            return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // If expense with ID not found
        }
    }

    // Delete Expense
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) { // Change type to Long as per entity ID
        try {
            expenseService.deleteExpense(id); // Call service method directly with Long
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content for successful deletion
        } catch (RuntimeException e) { // Catch service-level exceptions (e.g., not found)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) { // General fallback for other errors
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // --- Dashboard & Reporting Requirements ---

    // 1. Get Total Money Spent (overall)
    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getTotalOverallExpense() {
        BigDecimal total = expenseService.getTotalOverallExpense();
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    // 1. Get Total Money Spent for a particular month
    @GetMapping("/total/monthly")
    public ResponseEntity<BigDecimal> getTotalMonthlyExpense(
            @RequestParam(name = "year") int year,
            @RequestParam(name = "month") int month) {
        BigDecimal total = expenseService.getTotalMonthlyExpense(year, month);
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    // Convenience for current month total
    @GetMapping("/total/current-month")
    public ResponseEntity<BigDecimal> getCurrentMonthTotalExpense() {
        BigDecimal total = expenseService.getCurrentMonthTotalExpense();
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    // 2. Get Category-wise Expenditure for current month
    @GetMapping("/category-wise/current-month")
    public ResponseEntity<List<CategorySumDTO>> getCategoryWiseExpenditureForCurrentMonth() {
        List<CategorySumDTO> categorySums = expenseService.getCategoryWiseExpenditureForCurrentMonth();
        return new ResponseEntity<>(categorySums, HttpStatus.OK);
    }

    // You might also want a generic category-wise by month/year
    @GetMapping("/category-wise/monthly")
    public ResponseEntity<List<CategorySumDTO>> getCategoryWiseExpenditureByMonth(
            @RequestParam(name = "year") int year,
            @RequestParam(name = "month") int month) {
        // This line will now correctly call the new method in the service
        List<CategorySumDTO> categorySums = expenseService.getCategoryWiseExpenditureByMonthAndYear(year, month);
        return new ResponseEntity<>(categorySums, HttpStatus.OK);
    }

    // 3. Get Recent Transactions (for Dashboard)
    @GetMapping("/recent")
    public ResponseEntity<List<ExpenseResponseDTO>> getRecentTransactions() {
        List<ExpenseResponseDTO> recentExpenses = expenseService.getRecentTransactions();
        return new ResponseEntity<>(recentExpenses, HttpStatus.OK);
    }

    // 4. Get Total Money Spent in Previous Months (for comparison chart)
    @GetMapping("/comparison/monthly")
    public ResponseEntity<List<MonthlySummaryDTO>> getPreviousMonthsComparison(
            @RequestParam(name = "numMonths", defaultValue = "3") int numMonths) { // Default to 3 months
        List<MonthlySummaryDTO> monthlySummaries = expenseService.getPreviousMonthsComparison(numMonths);
        return new ResponseEntity<>(monthlySummaries, HttpStatus.OK);
    }

    // 5. Get Transactions for a Specific Date (for Calendar click)
    @GetMapping("/by-date")
    public ResponseEntity<List<ExpenseResponseDTO>> getExpensesByDate(
            @RequestParam("date") @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) LocalDate date) {
        // @DateTimeFormat helps Spring parse the date string (e.g., "2025-06-04") into
        // LocalDate
        List<ExpenseResponseDTO> expenses = expenseService.getExpensesByDate(date);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }
}