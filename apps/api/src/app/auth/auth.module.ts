import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { LocalStrategy } from "./auth.guards";
import { AuthController } from "./auth.controller";
import { JwatStrategyProvider, JwrtStrategyProvider } from "./jwt";
import { JwtServiceWrapper } from "./jwt/jwt.service";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtServiceWrapper,
    JwatStrategyProvider,
    JwrtStrategyProvider,
  ],
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }), UserModule],
})
export class AuthModule { }