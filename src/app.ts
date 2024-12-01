import promptSync from 'prompt-sync'
import { User } from './models/user'
import { Account } from './models/account'
import { Portfolio } from './models/portfolio'
import { Notification } from './services/notification'
import { Formatter } from './utils/formatter'

const prompt = promptSync()

const formatter = new Formatter()
const notification = new Notification()

function registerUser(): User {
  console.log('=== Register New User ===')
  const name = prompt('Enter your first name: ')
  const lastname = prompt('Enter your last name: ')
  const birthday = prompt('Enter your birthday (YYYY-MM-DD): ')
  const phoneNumber = prompt('Enter your phone number: ')
  const country = prompt('Enter your country: ')
  const id = Math.floor(Math.random() * 1000)

  console.log('Registration successful! Welcome to the app!')
  return new User(id, name, lastname, birthday, phoneNumber, country)
}

function displayMainMenu() {
  console.log(`
  ==== Welcome to the Banking & Investment App ====
  1. Account Operations
  2. Stocks
  3. Cryptos
  4. Savings
  5. Exit
  `)
}

function displayAccountMenu() {
  console.log(`
  ==== Account Operations ====
  1. View Balance
  2. Deposit Money
  3. Withdraw Money
  4. Transfer Money
  5. Back to Main Menu
  `)
}

function displayStocksMenu() {
  console.log(`
  ==== Stock Operations ====
  1. View Available Shares
  2. Buy Shares
  3. Sell Shares
  4. View Owned Shares
  5. Back to Main Menu
  `)
}

function displayCryptoMenu() {
  console.log(`
  ==== Crypto Operations ====
  1. View Available Cryptos
  2. Buy Cryptos
  3. Sell Cryptos
  4. View Owned Cryptos
  5. Back to Main Menu
  `)
}

function displaySavingsMenu() {
  console.log(`
  ==== Savings Operations ====
  1. Create New Saving
  2. Add to Saving
  3. Delete Saving
  4. View Savings
  5. Back to Main Menu
  `)
}

function main() {
  const user = registerUser()
  const account = new Account(user, notification, formatter)
  const portfolio = new Portfolio(account, notification)

  while (true) {
    displayMainMenu()
    const choice = prompt('Choose an option: ')

    switch (choice) {
      case '1':
        while (true) {
          displayAccountMenu()
          const accountChoice = prompt('Choose an option: ')

          if (accountChoice === '1') account.getAccount()
          else if (accountChoice === '2') {
            const value = parseFloat(prompt('Enter deposit amount: '))
            account.deposit(value)
          } else if (accountChoice === '3') {
            const value = parseFloat(prompt('Enter withdrawal amount: '))
            account.withdraw(value)
          } else if (accountChoice === '4') {
            const value = parseFloat(prompt('Enter transfer amount: '))
            const receiver = prompt('Enter receiver ID: ')

            console.log('Transfer logic would go here.')
          } else if (accountChoice === '5') break
          else notification.sendErrorMessage('Invalid option!')
        }
        break

      case '2':
        while (true) {
          displayStocksMenu()
          const stockChoice = prompt('Choose an option: ')

          if (stockChoice === '1') portfolio.availableShares()
          else if (stockChoice === '2') {
            const company = prompt('Enter company name: ')
            const amount = parseInt(prompt('Enter number of shares: '))
            portfolio.buyShare(company, amount)
          } else if (stockChoice === '3') {
            const company = prompt('Enter company name: ')
            const amount = parseInt(prompt('Enter number of shares: '))
            portfolio.sellShare(company, amount)
          } else if (stockChoice === '4') portfolio.getOwnedShares()
          else if (stockChoice === '5') break
          else notification.sendErrorMessage('Invalid option!')
        }
        break

      case '3':
        while (true) {
          displayCryptoMenu()
          const cryptoChoice = prompt('Choose an option: ')

          if (cryptoChoice === '1') portfolio.availableCryptos()
          else if (cryptoChoice === '2') {
            const name = prompt('Enter crypto name: ')
            const amount = parseFloat(prompt('Enter amount: '))
            portfolio.buyCrypto(name, amount)
          } else if (cryptoChoice === '3') {
            const name = prompt('Enter crypto name: ')
            const amount = parseFloat(prompt('Enter amount: '))
            portfolio.sellCrypto(name, amount)
          } else if (cryptoChoice === '4') portfolio.getOwnedCryptos()
          else if (cryptoChoice === '5') break
          else notification.sendErrorMessage('Invalid option!')
        }
        break

      case '4':
        while (true) {
          displaySavingsMenu()
          const savingChoice = prompt('Choose an option: ')

          if (savingChoice === '1') {
            const name = prompt('Enter saving name: ')
            const balance = parseFloat(prompt('Enter initial balance (optional): ')) || 0
            portfolio.createSaving(name, balance)
          } else if (savingChoice === '2') {
            const name = prompt('Enter saving name: ')
            const value = parseFloat(prompt('Enter value to add: '))
            portfolio.addToSaving(name, value)
          } else if (savingChoice === '3') {
            const name = prompt('Enter saving name: ')
            portfolio.deleteSaving(name)
          } else if (savingChoice === '4') portfolio.getMySavings()
          else if (savingChoice === '5') break
          else notification.sendErrorMessage('Invalid option!')
        }
        break

      case '5':
        console.log('Thank you for using the app! Goodbye!')
        process.exit()

      default:
        notification.sendErrorMessage('Invalid option!')
    }
  }
}

main()
