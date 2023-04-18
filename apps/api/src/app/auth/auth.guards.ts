import { Strategy } from "passport-local";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { User } from "@example/shared";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  async validate(username: string, password: string): Promise<User> {
    const user = this.auth.login({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  constructor(private auth: AuthService) {
    super();
  }
}


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }  