import { stocks } from '../data/stocks'
import { cryptos } from '../data/cryptos'
import { INotification } from '../services/notification'
import { IAccount } from './account'

interface IStock {
  company: string
  price: number
  purchasedPrice: number
  amount: number
  profit?: number
}

interface ICrypto {
  name: string
  price: number
  purchasedPrice: number
  amount: number
  profit?: number
}

interface ISaving {
  savingName: string
  balance: number
  description?: string
  goal?: number
}

export interface IPortfolio {
  stocks: IStock[]
  savings: ISaving[]
  cryptos: ICrypto[]
}

export class Portfolio implements IPortfolio {
  stocks: IStock[] = []
  cryptos: ICrypto[] = []
  savings: ISaving[] = []

  constructor(public account: IAccount, private notification: INotification) {}

  // shares

  private flutuateInvestments(): void {
    for (const share of this.stocks) {
      const fluctuationPercentage = (Math.random() * 20 - 10) / 100
      share.price = Math.round(share.price * (1 + fluctuationPercentage) * 100) / 100
      const profit =
        Math.round((share.price * share.amount - share.purchasedPrice * share.amount) * 100) / 100
      share.profit = profit
    }
  }

  private doesShareExists(company: string): { company: string; price: number } | null {
    for (const share of stocks) {
      if (share.company === company) return { ...share }
    }

    return null
  }

  private createNewShare(share: { company: string; price: number }, amount: number): IStock {
    return { ...share, purchasedPrice: share.price, amount }
  }

  availableShares(): void {
    console.log('Available Shares: ')
    console.table(stocks)
  }

  buyShare(company: string, amount: number): void {
    const share = this.doesShareExists(company)
    if (!share) return this.notification.sendErrorMessage('Share not found!')

    const totalSpent = share.price * amount

    if (!this.account.hasEnoughBalance(totalSpent))
      return this.notification.sendErrorMessage('Insufficient balance!')

    const newShare = this.createNewShare(share, amount)

    this.stocks.push(newShare)
    this.account.balance -= totalSpent

    this.notification.sendSuccessMessage(`${share.company} shares bought successfully!`)
  }

  sellShare(company: string, amount: number): void {
    this.stocks.some((share) => {
      if (share.company === company) {
        this.account.balance += amount * share.price

        if (share.amount >= amount) share.amount -= amount

        return this.notification.sendSuccessMessage(
          `Shares sold successfully! You sold ${amount} shares and your profit was ${
            share.price * amount
          }`,
        )
      }

      return this.notification.sendErrorMessage('Share not found!')
    })
  }

  getOwnedShares(): void {
    this.notification.sendInformationalMessage('Your owned shares: ')
    this.flutuateInvestments()
    console.table(this.stocks)
  }

  // savings

  createSaving(savingName: string, balance?: number, description?: string, goal?: number): void {
    if (balance) {
      if (this.account.balance < balance)
        return this.notification.sendErrorMessage('Insufficient balance! Try again latter.')
    }

    const newSaving: ISaving = { savingName, balance: balance || 0, description, goal }

    this.savings.push(newSaving)

    this.notification.sendSuccessMessage(
      `New saving created succesfully! ${console.table(newSaving)} `,
    )
  }

  addToSaving(savingName: string, value: number): void {
    if (this.account.balance < value)
      return this.notification.sendErrorMessage('Insufficient balance! Try again latter.')

    this.savings.some((saving) => {
      if (saving.savingName === savingName) {
        saving.balance += value

        return this.notification.sendSuccessMessage(
          `${value} added to your saving ${savingName} successfully! ${console.table(
            this.savings,
          )}`,
        )
      }
      return this.notification.sendErrorMessage('Saving not found! Try again latter.')
    })
  }

  deleteSaving(savingName: string): void {
    this.savings.some((saving) => {
      if (saving.savingName === savingName) {
        this.account.balance += saving.balance
        this.savings.filter((item) => item.savingName !== savingName)
        return this.notification.sendSuccessMessage(
          `Saving ${savingName} delete successfully! The money is back in your account.`,
        )
      }
      return this.notification.sendErrorMessage('Saving not found! Try again latter.')
    })
  }

  getMySavings(): void {
    this.notification.sendInformationalMessage('Your savings: ')
    this.notification.sendInformationalMessage('')
    this.notification.sendErrorMessage(`${console.log(this.savings)}`)
  }

  // crypto

  private isSufficientBalance(value: number): boolean {
    return this.account.balance >= value
  }

  private cryptoExists(name: string): boolean {
    return cryptos.some((crypto) => (crypto.name = name))
  }

  private flutuateCryptoValue(): void {
    for (const crypto of this.cryptos) {
      const fluctuationPercentage = (Math.random() * 20 - 10) / 100
      crypto.price = Math.round(crypto.price * (1 + fluctuationPercentage) * 100) / 100
      const profit =
        Math.round((crypto.price * crypto.amount - crypto.purchasedPrice * crypto.amount) * 100) /
        100
      crypto.profit = profit
    }
  }

  buyCrypto(name: string, amount: number): void {
    if (!this.cryptoExists(name))
      return this.notification.sendErrorMessage(`Crypto not found! Try again latter`)

    cryptos.some((crypto) => {
      if (crypto.name === name) {
        const balance = this.isSufficientBalance(crypto.price)

        if (!balance)
          return this.notification.sendErrorMessage(
            `Unable to make purchase now, insufficient balance!`,
          )

        const newCrypto: ICrypto = {
          name: crypto.name,
          amount,
          price: crypto.price,
          purchasedPrice: crypto.price,
        }

        this.cryptos.push(newCrypto)

        this.notification.sendSuccessMessage(
          `Purchase of ${amount} ${name} cryptocurrencies made successfully!`,
        )
      }
    })
  }

  availableCryptos(): void {
    console.log('Available cryptos: ')
    console.table(cryptos)
  }

  sellCrypto(name: string, amount: number): void {
    this.cryptos.some((crypto) => {
      if (crypto.name === name && amount <= crypto.amount) {
        const value = crypto.price * amount
        this.account.balance += value
        if (crypto.amount >= amount) crypto.amount -= amount

        this.notification.sendSuccessMessage(`Successful sale of ${amount} ${name}s!`)
      }
      this.notification.sendErrorMessage(`Crypto not found or insufficient amount!`)
    })
  }

  getOwnedCryptos(): void {
    this.notification.sendInformationalMessage('Your owned cryptos: ')
    this.flutuateCryptoValue()
    console.table(this.cryptos)
  }
}
