import * as bcrypt from 'bcrypt';

export class BcriptSchenario {
  public async hashSchenario(password: string) {
    const saltOrRound = 10;
    return await bcrypt.hash(password, saltOrRound);
  }

  public async compareSchenario(plainPassword: string, hashPassword: string) {
    return await bcrypt.compare(plainPassword, hashPassword);
  }
}
