import { Controller, Get, Req, UseGuards } from "@nestjs/common";

import { AuthRequest } from "../auth/auth.controller";
import { JwatGuard } from "../auth/jwt";

@Controller("user")
export class UserController {

  @UseGuards(JwatGuard)
  @Get()
  user(@Req() req: AuthRequest) {
    return req.user;
  }
}