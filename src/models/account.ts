import { INotification } from '../services/notification'
import { IFormatter } from '../utils/formatter'
import { IUser } from './user'

export interface IAccount {
  owner: IUser
  balance: number
  hasEnoughBalance(value: number): boolean
  validation(birthday: string): void
}

export class Account implements IAccount {
  balance: number = 0
  constructor(
    public owner: IUser,
    private notification: INotification,
    private formatter: IFormatter,
  ) {}

  validation(birthday: string): void {
    if (birthday !== this.owner.birthday)
      return this.notification.sendErrorMessage(
        'Unable to take action. We are unable to confirm that you are the owner of this account.',
      )
  }

  hasEnoughBalance(value: number): boolean {
    if (this.balance < value) return false
    return true
  }

  transfer(account: IAccount, value: number): void {
    if (!this.hasEnoughBalance(value))
      return this.notification.sendErrorMessage('Transfer denied! Insufficient balance.')

    account.balance += value
    this.balance -= value

    this.notification.sendSuccessMessage(
      `Transfer worth ${this.formatter.formatCurrency(value)} completed successfully!`,
    )
  }

  deposit(value: number) {
    this.balance += value
    this.notification.sendSuccessMessage(
      `Deposit worth ${this.formatter.formatCurrency(value)} completed successfully!`,
    )
  }

  withdraw(value: number) {
    if (!this.hasEnoughBalance(value))
      return this.notification.sendErrorMessage('Withdraw denied! Insufficent balance.')

    this.balance -= value
    this.notification.sendSuccessMessage(
      `Withdraw worth ${this.formatter.formatCurrency(value)} completed successfully!`,
    )
  }

  getAccount() {
    return console.table(this)
  }
}
