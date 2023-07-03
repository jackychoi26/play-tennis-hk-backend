var bcrypt = require('bcryptjs');

export default class User {
  public readonly id: String;
  public readonly username: String;
  public readonly email: String;
  public readonly password: String;
  public readonly createdAt: String;
  public readonly imageUrl: String;
  public readonly ustaLevel: String;
  public readonly description?: String;
  public readonly telegram?: String;
  public readonly whatsapp?: String;
  public readonly signal?: String;

  private constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  static create(data: Partial<User>): User {
    return new User(data);
  }

  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.getSaltSync(10));
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  static stub(
    data: Partial<User> = {
      id: 'abcd-1234',
      username: 'jones',
      email: 'jones@gmail.com',
      password: 'abcd1234',
      createdAt: 'abcd',
      imageUrl: 'qwer',
      ustaLevel: '1234',
      description: 'description',
      telegram: 'clo',
      whatsapp: '1234567',
      signal: '7654321'
    }
  ): User {
    return User.create(data);
  }
}
