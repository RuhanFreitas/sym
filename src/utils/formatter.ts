export interface IFormatter {
  formatCurrency(value: number): string
}

export class Formatter {
  formatCurrency(value: number): string {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }
}
