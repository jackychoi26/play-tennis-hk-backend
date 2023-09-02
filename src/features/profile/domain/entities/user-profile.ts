import { District } from '../../../../domain/district';
import Nullable from '../../../../core/nullable';

export default class UserProfile {
  public readonly id: number;
  public readonly username: string;
  public email: Nullable<string>;
  public readonly imageUrl: Nullable<string>;
  public readonly ntrpLevel: number;
  public readonly districts: District[];
  public readonly age: Nullable<number>;
  public readonly isProfilePublic: boolean;
  public readonly description: Nullable<string>;
  public readonly telegram: Nullable<string>;
  public readonly whatsapp: Nullable<string>;
  public readonly signal: Nullable<string>;
  public readonly notifyBadWeather: boolean;

  constructor(data: Partial<UserProfile>, withEmail: boolean = false) {
    this.id = data.id as number;
    this.username = data.username as string;

    if (withEmail) {
      this.email = data.email as Nullable<string>;
    }

    this.imageUrl = data.imageUrl as Nullable<string>;
    this.ntrpLevel = data.ntrpLevel as number;
    this.districts = data.districts as District[];
    this.age = data.age as Nullable<number>;
    this.isProfilePublic = data.isProfilePublic as boolean;
    this.description = data.description as Nullable<string>;
    this.telegram = data.telegram as Nullable<string>;
    this.whatsapp = data.whatsapp as Nullable<string>;
    this.signal = data.signal as Nullable<string>;
    this.notifyBadWeather = data.notifyBadWeather as boolean;
  }
}
