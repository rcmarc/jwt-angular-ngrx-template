import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions, VerifyCallback } from "passport-jwt";
import { Provider } from "@nestjs/common";

import { UserService } from "../../user/user.service";

export class JwatStrategy extends PassportStrategy(Strategy, "jwat") { }
export class JwrtStrategy extends PassportStrategy(Strategy, "jwrt") { }
export class JwrtFromBodyStrategy extends PassportStrategy(Strategy, "jwrtFromBody") { }

export const JwatStrategyProvider: Provider = {
  useFactory: (userService: UserService) => {
    return new JwatStrategy(options({ algorithms: ["HS384"] }), verifyFn(userService))
  },
  inject: [UserService],
  provide: JwatStrategy,
}

export const JwrtStrategyProvider: Provider = {
  useFactory: (userService: UserService) => {
    return new JwrtStrategy(options({ algorithms: ["HS512"] }), verifyFn(userService))
  },
  inject: [UserService],
  provide: JwrtStrategy,
}

const verifyFn = (userService: UserService): VerifyCallback => {
  return async (payload, done) => {
    const user = userService.findOne((user) => user.username === payload.username)
    if (!user) {
      return done(new Error(), false);
    }
    return done(null, user);
  }
}

const options = function (args?: Partial<StrategyOptions>): StrategyOptions {
  return {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ...args
  }
}
