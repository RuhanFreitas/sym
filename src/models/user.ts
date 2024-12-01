export interface IUser {
  id: number
  name: string
  lastname: string
  birthday: string
  phoneNumber: string
  country: string
}

export class User implements IUser {
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public birthday: string,
    public phoneNumber: string,
    public country: string,
  ) {}

  getMe(): void {}
}
