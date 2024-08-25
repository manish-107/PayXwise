```
npm install
npm run dev
```

```
npm run deploy
```

# Transaction App Database Schema

## Overview

This document describes the database schema for the Transaction App, built using React Native, Hono.js, Cloudflare Workers, Prisma, and PostgreSQL. The schema is designed to manage users, transactions, expenses, and payments efficiently.

## Tables and Relationships

### 1. Users

The `Users` table stores the core user information, including authentication details and financial information.

| Column            | Type      | Description                                   |
| ----------------- | --------- | --------------------------------------------- |
| id                | UUID      | Primary Key, Unique identifier for each user. |
| email             | String    | User's email, must be unique.                 |
| password          | String    | Hashed password for user authentication.      |
| name              | String    | User's full name.                             |
| balance           | Decimal   | Current balance of the user.                  |
| currency          | String    | The currency type (e.g., USD, EUR).           |
| accountNumber     | String    | User's bank account number, must be unique.   |
| bankName          | String    | Name of the user's bank.                      |
| ifscCode          | String    | IFSC code of the user's bank branch.          |
| accountHolderName | String    | Name of the account holder.                   |
| createdAt         | Timestamp | Date when the user account was created.       |
| updatedAt         | Timestamp | Date when the user account was last updated.  |

### 2. Transactions

The `Transactions` table records all financial transactions made by the users.

| Column      | Type      | Description                                                            |
| ----------- | --------- | ---------------------------------------------------------------------- |
| id          | UUID      | Primary Key, Unique identifier for each transaction.                   |
| userId      | UUID      | Foreign Key, References `Users(id)` to link the transaction to a user. |
| amount      | Decimal   | Amount involved in the transaction.                                    |
| type        | String    | Type of transaction (`credit` or `debit`).                             |
| status      | String    | Status of the transaction (`pending`, `completed`, `failed`).          |
| description | String    | Description of the transaction.                                        |
| createdAt   | Timestamp | Date when the transaction was created.                                 |
| updatedAt   | Timestamp | Date when the transaction was last updated.                            |

### 3. Expenses

The `Expenses` table tracks all expenses made by the users.

| Column      | Type      | Description                                                        |
| ----------- | --------- | ------------------------------------------------------------------ |
| id          | UUID      | Primary Key, Unique identifier for each expense.                   |
| userId      | UUID      | Foreign Key, References `Users(id)` to link the expense to a user. |
| category    | String    | Category of the expense (e.g., Food, Transport).                   |
| amount      | Decimal   | Amount spent.                                                      |
| description | String    | Description of the expense.                                        |
| createdAt   | Timestamp | Date when the expense was recorded.                                |
| updatedAt   | Timestamp | Date when the expense was last updated.                            |

### 4. ExpenseCategories

The `ExpenseCategories` table defines the different categories for expenses.

| Column    | Type      | Description                                       |
| --------- | --------- | ------------------------------------------------- |
| id        | UUID      | Primary Key, Unique identifier for each category. |
| name      | String    | Name of the expense category, must be unique.     |
| createdAt | Timestamp | Date when the category was created.               |
| updatedAt | Timestamp | Date when the category was last updated.          |

### 5. Payments

The `Payments` table stores the details of payments associated with transactions.

| Column        | Type      | Description                                                                      |
| ------------- | --------- | -------------------------------------------------------------------------------- |
| id            | UUID      | Primary Key, Unique identifier for each payment.                                 |
| transactionId | UUID      | Foreign Key, References `Transactions(id)` to link the payment to a transaction. |
| provider      | String    | Payment provider (e.g., Razorpay, Stripe).                                       |
| status        | String    | Status of the payment (`pending`, `completed`, `failed`).                        |
| createdAt     | Timestamp | Date when the payment was created.                                               |
| updatedAt     | Timestamp | Date when the payment was last updated.                                          |

## Schema Diagram Overview

This database schema is designed to handle user management, transaction recording, expense tracking, and payment processing efficiently. It includes relationships between users, transactions, expenses, categories, and payments.

### Key Relationships:

- **Users to Transactions**: One-to-Many (A user can have multiple transactions).
- **Users to Expenses**: One-to-Many (A user can have multiple expenses).
- **Transactions to Payments**: One-to-One (A transaction has one payment).
- **Expenses to ExpenseCategories**: One-to-Many (An expense is associated with one category, but a category can have multiple expenses).

## Additional Information

This schema is part of a larger project that includes a React Native frontend and a backend built using Hono.js, Cloudflare Workers, Prisma, and PostgreSQL. The schema is designed to be flexible and scalable, accommodating the needs of a transaction-based application.
