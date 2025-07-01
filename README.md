# YNAB Register CSV Splitter

A simple Node.js script to split large YNAB (You Need A Budget) register CSV exports into smaller, BB (Beyond Budget) import-friendly files. This helps you prepare your data for import into Beyond Budget and similar budgeting tools.

---

## Features
- Splits large CSV files into smaller chunks (default: 500 records per file)
- Output files are saved in a dedicated directory
- Easy to use from the command line
- Includes guidance for preparing your data for best results

---

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your system
- Your YNAB register exported as a CSV file
- (Recommended) Microsoft Excel for data preparation

---

## Usage

1. **Prepare your sanitized CSV file** (see below for instructions)
2. **Run the script from your terminal:**
   ```sh
   node split_transactions.js <input_file.csv> [output_dir]
   ```
   - `<input_file.csv>`: Path to your sanitized CSV file
   - `[output_dir]` (optional): Directory to save output files (default: `output`)

   **Example:**
   ```sh
   node split_transactions.js "Monthly Budget as of 2025-07-01 15-36 - Register.csv"
   ```

3. **Check the output directory** for your split files.

---

## Input Preparation

> **Before you begin:**
> Make sure your Beyond Budget (BB) App already has the same Accounts and Categories set up as in your YNAB register. This will ensure a smooth import and accurate matching of your transactions.

Before running the script, convert your original YNAB register export to the following sanitized format for best results. Use Excel for easy conversion.

### Original YNAB Register Columns
```
Account,Flag,Date RAW,Date,Payee,Category Group/Category,Category Group,Category RAW,Category,Memo,Outflow,Inflow,Amount
```

### Sanitized Register Columns (BB Friendly Format)
```
Account,Date,Payee,Category,Notes,Amount
```

### Steps in Excel
1. **Open your YNAB register CSV in Excel.**
2. **Create new columns for the sanitized format:**
   - **Account**: Copy from `Account`. If it contains an emoji (e.g., `🏠 Savings`), use the formula below to remove it.
   - **Date**: Use the `Date` column, format as `YYYY-MM-DD` using the formula below.
   - **Payee**: Copy from `Payee`.
   - **Category**: Copy from `Category`. If it contains an emoji (e.g., `💪🏻 Gym`), use the formula below to remove it.
   - **Notes**: Copy from `Memo`.
   - **Amount**: Calculate as `Inflow - Outflow` using the formula below.
3. **Save the new sheet as a CSV file.**

### Excel Formulas
- **Format Date as YYYY-MM-DD:**
  ```excel
  =TEXT(A1, "YYYY-MM-DD")
  ```
  Replace `A1` with the cell containing the Date.

- **Remove Emoji from Category or Account:**
  ```excel
  =MID(A1, FIND(" ", A1)+1, LEN(A1))
  ```
  Replace `A1` with the cell containing the Category/Account.

- **Get Total of Outflow and Inflow Columns:**
  ```excel
  =IFERROR(A1-B2, "")
  ```
  Replace `A1` with Inflow cell reference and `B2` with Outflow cell reference.

---

## Example

**Original YNAB Register Row:**

| Account           | Flag | Date      | Payee | Category Group/Category | Category Group | Category | Memo | Outflow | Inflow | Amount |
|-------------------|------|-----------|-------|------------------------|----------------|----------|------|---------|--------|--------|
| UB Platinum 2191  |      | 8/1/2025  |       | Subscriptions: 💪🏻 Gym | Subscriptions  | Gym      |      | 4505    | 0      | -4505  |

**Sanitized Register Row:**

| Account           | Date       | Payee | Category | Notes | Amount |
|-------------------|------------|-------|----------|-------|--------|
| UB Platinum 2191  | 2025-08-01 |       | Gym      |       | -4505  |

---

## Output
- Output files will be saved in the specified output directory (default: `output`)
- Each file will contain up to 500 records (customizable in the script)
- Files are named `(1) Monthly Budget.csv`, `(2) Monthly Budget.csv`, etc.

---

## Reference: Handling Account Transfers & BB Import Limits
For more information on handling account transfers and Beyond Budget (BB) import limits, see the official documentation:
- [Beyond Budget: Import Transactions, OFX, QIF, and OFC](https://www.beyondbudgetapp.com/import-transactions/ofx-qif-and-ofc)

Key points:
- Ensure your file is correctly formatted to avoid errors
- BB supports OFX, QIF, OFC, and CSV formats (CSV may require careful formatting)
- For account transfers, select the appropriate destination account during reconciliation
- Import limits: Each file can handle only a few hundred transactions and the time period for imported transactions is limited to 12 months. For larger datasets, split them into smaller files before importing

---

## License
MIT 
