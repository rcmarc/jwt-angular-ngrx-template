
import { Controller, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Request } from "express";

import { User } from "@example/shared"
import { AuthGuard } from "@nestjs/passport";

import { SignUserInterceptor } from "./auth.interceptors";
import { JwrtGuard } from "./jwt";

@Controller("auth")
export class AuthController {

  @UseGuards(AuthGuard('local'))
  @UseInterceptors(SignUserInterceptor)
  @Post("login")
  login(@Req() req: AuthRequest) {
    return req.user;
  }

  @UseGuards(JwrtGuard)
  @UseInterceptors(SignUserInterceptor)
  @Post("refresh")
  async refresh(@Req() req: AuthRequest) {

    return req.user;
  }
}

export interface AuthRequest extends Request {
  user: User
}