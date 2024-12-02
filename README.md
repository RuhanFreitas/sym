# Banking & Investment Simulator

A command-line application built with **TypeScript** that simulates a banking and investment environment. It allows users to manage accounts, buy and sell stocks, trade cryptocurrencies, and maintain savings, providing a dynamic and interactive experience.

<img src="cover.png" alt="Cover">

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **User Registration**: Register users with personal details.
- **Account Operations**:
  - View balance.
  - Deposit money.
  - Withdraw money.
  - Transfer funds to other users.
- **Stock Market**:
  - View available shares.
  - Buy and sell stocks.
  - Check owned stocks and their fluctuating profits.
- **Cryptocurrency Trading**:
  - View available cryptocurrencies.
  - Buy and sell cryptocurrencies.
  - Check owned cryptocurrencies and profits.
- **Savings Management**:
  - Create savings accounts with optional goals.
  - Add funds to savings accounts.
  - Delete savings accounts.
- **Notifications**: Real-time feedback for user actions via success, error, and informational messages.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/banking-investment-simulator.git
   cd banking-investment-simulator
   ```

2. **Install dependencies**:
   Make sure you have **Node.js** and **npm** installed. Then run:

   ```bash
   npm install
   ```

3. **Run the application**:
   Use the `start` script to launch the app:
   ```bash
   npm start
   ```

## Usage

- Launch the application using the terminal.
- Follow the prompts to register and access the main menu.
- Navigate through various features like account operations, stock trading, crypto management, and savings by choosing the respective menu options.

## Technologies Used

- **TypeScript**: Ensures type safety and better code management.
- **Prompt-sync**: For user input handling in the command line.
- **Node.js**: Provides the runtime environment.

## Project Structure

```plaintext
├── src/
│   ├── models/             # Core data models (User, Account, Portfolio)
│   ├── services/           # Service classes (Notification)
│   ├── utils/              # Utility classes (Formatter)
│   ├── data/               # Mock data for stocks and cryptocurrencies
│   └── app.ts              # Main application logic
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Documentation
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
