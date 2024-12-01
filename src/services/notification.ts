export interface INotification {
  sendSuccessMessage(message: string): void
  sendErrorMessage(message: string): void
  sendInformationalMessage(message: string): void
}

export class Notification implements INotification {
  sendSuccessMessage(message: string): void {
    console.log('\x1b[32m%s\x1b[0m', 'Success: ' + message)
  }

  sendErrorMessage(message: string): void {
    console.log('\x1b[33m%s\x1b[0m', 'Error: ' + message)
  }

  sendInformationalMessage(message: string): void {
    console.log('Info: ' + message)
  }
}
