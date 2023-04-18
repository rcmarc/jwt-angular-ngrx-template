import { User } from "@example/shared";
import { Injectable } from "@nestjs/common";

const USERS: UserPassword[] = [
  { username: "local", fullName: "Some Full Name", password: "local" }
]

@Injectable()
export class UserService {
  findOne(predicate: FindOneUserPredicate): UserPassword | undefined {
    return USERS.find(predicate);
  }
}

export type FindOneUserPredicate = (user: UserPassword) => boolean;

interface UserPassword extends User {
  password: string
}