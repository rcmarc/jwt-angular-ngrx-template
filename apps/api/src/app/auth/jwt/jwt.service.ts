import { User } from "@example/shared";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtServiceWrapper {

  sign(user: User): Jwts {
    const accessToken = this.jwtService.sign(
      { username: user.username },
      { algorithm: 'HS384', expiresIn: "15m", subject: user.username }
    );
    const refreshToken = this.jwtService.sign(
      { username: user.username },
      { algorithm: 'HS512', expiresIn: "7d", subject: user.username }
    );

    return { accessToken, refreshToken }
  }

  constructor(private jwtService: JwtService) { }
}

export interface Jwts {
  accessToken: string
  refreshToken: string
}