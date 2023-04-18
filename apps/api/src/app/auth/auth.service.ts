import { Injectable } from "@nestjs/common";
import { LoginCredentials } from "@example/shared";

import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {

  login(credentials: LoginCredentials) {
    return this.userService.findOne((user) => {
      return user.username === credentials.username &&
        user.password === credentials.password
    });
  }


  constructor(private userService: UserService) { }
}
