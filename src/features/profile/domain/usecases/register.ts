import UseCase from '../../../../core/usecase';

interface RegisterParam {
  username: string;
  email: string;
  password: string;
  ustaLevel: string;
  imageUrl: string;
  description?: string;
  telegram?: string;
  whatsapp?: string;
  signal?: string;
}

type RegisterSuccess = {
  type: 'REGISTER_SUCCESS';
  token: string;
};

type UsernameAlreadyExsitedFailure = {
  type: 'USERNAME_ALREADY_EXISTED_FAILURE';
};

type EmailAlreadyExistedFailure = {
  type: 'EMAIL_ALREADY_EXISTED_FAILURE';
};

type RegisterResult =
  | RegisterSuccess
  | UsernameAlreadyExsitedFailure
  | EmailAlreadyExistedFailure;

export default class Register
  implements UseCase<RegisterParam, RegisterResult>
{
  execute(input: RegisterParam): Promise<RegisterResult> {
    return Promise.resolve({
      type: 'REGISTER_SUCCESS',
      token: ''
    });
  }
}
