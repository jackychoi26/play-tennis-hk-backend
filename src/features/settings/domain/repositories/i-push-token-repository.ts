import Result from '../../../../core/result';

// We might have a getAllTokensByUserId for multiple devices
export default interface IPushTokenRepository {
  getTokenByUserId({ id }: { id: number }): Promise<Result<string>>;

  saveToken({
    pushToken,
    id
  }: {
    pushToken: string;
    id: number;
  }): Promise<Result<void>>;

  updateToken({
    pushToken,
    id
  }: {
    pushToken: string;
    id: number;
  }): Promise<Result<void>>;
}
