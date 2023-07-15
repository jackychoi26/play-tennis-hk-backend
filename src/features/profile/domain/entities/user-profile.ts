import { District } from '../../../../domain/district';
import Nullable from '../../../../core/nullable';

export default class UserProfile {
  public readonly username: string;
  public readonly email: string;
  public readonly imageUrl: string;
  public readonly ntrpLevel: number;
  public readonly age?: number;
  public readonly districts: District[];
  public readonly description: Nullable<string>;
  public readonly telegram: Nullable<string>;
  public readonly whatsapp: Nullable<string>;
  public readonly signal: Nullable<string>;

  constructor(data: Partial<UserProfile>) {
    Object.assign(this, data);
  }
}
