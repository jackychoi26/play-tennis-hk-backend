import Register from '../register';

describe('Register with unique username or email', () => {
  it('return register success when user inputs information correctly', async () => {
    const register = new Register();

    const result = await register.execute({
      username: 'tennisking',
      email: 'jones@gmail.com',
      ustaLevel: '3.5',
      password: 'abcd1234',
      imageUrl: 'abcd1234'
    });

    expect(result.type).toBe('REGISTER_SUCCESS');

    if (result.type === 'REGISTER_SUCCESS') {
      expect(result.type).toBeDefined();
    }
  });
});

describe('Register using occupied identifier', () => {
  it('return register failure when user inputs an existing username', async () => {
    const register = new Register();

    const result = await register.execute({
      username: 'tennisking',
      email: 'jones@gmail.com',
      ustaLevel: '3.5',
      password: 'abcd1234',
      imageUrl: 'abcd1234'
    });

    expect(result.type).toBe('USERNAME_ALREADY_EXISTED_FAILURE');
  });

  it('return register failure when user inputs an existing email', async () => {
    const register = new Register();

    const result = await register.execute({
      username: 'tennisking',
      email: 'jones@gmail.com',
      ustaLevel: '3.5',
      password: 'abcd1234',
      imageUrl: 'abcd1234'
    });

    expect(result.type).toBe('EMAIL_ALREADY_EXISTED_FAILURE');
  });
});
