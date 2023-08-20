import PushTokenRepository from '../../data/push-token-repository';
import Usecase from '../../../../core/usecase';
import IPushTokenRepository from '../repositories/i-push-token-repository';

interface RegisterPushTokenParam {
  id: number;
  pushToken: string;
}

type RegisterPushTokenSuccess = {
  message: 'REGISTER_PUSH_TOKEN_SUCCESS';
};

type RegisterPushTokenFailure = {
  message: 'REGISTER_PUSH_TOKEN_FAILURE';
};

export type RegisterPushTokenResult =
  | RegisterPushTokenSuccess
  | RegisterPushTokenFailure;

export default class RegisterPushToken
  implements Usecase<RegisterPushTokenParam, RegisterPushTokenResult>
{
  constructor(
    private repository: IPushTokenRepository = new PushTokenRepository()
  ) {}

  async execute(
    input: RegisterPushTokenParam
  ): Promise<RegisterPushTokenResult> {
    const { id, pushToken } = input;

    const queryResult = await this.repository.getTokenByUserId({ id });

    if (queryResult.isSuccess) {
      const updateResult = await this.repository.updateToken({ id, pushToken });

      if (updateResult.isSuccess) {
        return {
          message: 'REGISTER_PUSH_TOKEN_SUCCESS'
        };
      }
    } else {
      const insertResult = await this.repository.saveToken({ id, pushToken });

      if (insertResult.isSuccess) {
        return {
          message: 'REGISTER_PUSH_TOKEN_SUCCESS'
        };
      }
    }

    return {
      message: 'REGISTER_PUSH_TOKEN_SUCCESS'
    };
  }
}
