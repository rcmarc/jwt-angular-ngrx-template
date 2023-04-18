import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

import { User } from "@example/shared";

import { JwtServiceWrapper, Jwts } from "./jwt/jwt.service";

@Injectable()
export class SignUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<User>): Observable<Jwts> {
    return next.handle().pipe(
      map((user) => this.jwt.sign(user)),
    )
  }

  constructor(private jwt: JwtServiceWrapper) { }
}