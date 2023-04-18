import { AuthGuard } from "@nestjs/passport";

export class JwatGuard extends AuthGuard("jwat") {}
export class JwrtGuard extends AuthGuard("jwrt") {}
export class JwrtFromBodyGuard extends AuthGuard("jwrtFromBody") {}