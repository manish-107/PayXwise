# API Documentation

## 1. Sign In

### **URL:** `http://127.0.0.1:8787/api/v1/users/signin`

- **Method:** `POST`
- **Description:** Allows a user to sign in to their account.

#### Request Body:

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword"
}
```

## 2. Sign Up

### **URL:** `http://127.0.0.1:8787/api/v1/users/signup`

- **Method:** `POST`
- **Description:** Allows a user to sign in to their account.

#### Request Body:

```json
{
  "fullName": "John Doe",
  "email": "user@example.com",
  "phoneNumber": "1234567890",
  "password": "password123",
  "gender": "male",
  "securityQ": "What is your pet's name?",
  "securityA": "Fluffy"
}
```

## 3. Transfer Money

### **URL:** `https://your-api-url.com/signin`

- **Method:** `POST`
- **Description:** Allows a user to sign in to their account.

#### Request Body:

```json
{
  "from_id": "userId1",
  "to_id": "userId2",
  "amount": 500.0,
  "description": "Payment for services"
}
```

3. Transfer Money
   URL: https://your-api-url.com/transferMoney
   Method: POST
   Description: Allows a user to transfer money to another user.
   Request Body:
   json
   Copy code
   {
   "from_id": "userId1",
   "to_id": "userId2",
   "amount": 500.0,
   "description": "Payment for services"
   }

4. Get Last 5 Transactions
   URL: https://your-api-url.com/transactionHistory/:userId
   Method: GET
   Description: Retrieves the last 5 transactions made by a user.
   URL Parameters:
   userId: The ID of the user whose transactions you want to retrieve.
   Example URL:
   https://your-api-url.com/transactionHistory/12345

5. Search Users by Name
   URL: https://your-api-url.com/search/:query
   Method: GET
   Description: Searches for users by their name, showing partial matches with exact matches first.
   URL Parameters:
   query: The string to search in the users' full names.
   Example URL:
   https://your-api-url.com/search/john
