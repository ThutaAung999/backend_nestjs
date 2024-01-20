import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('Request :', request.headers);
    //  return validateRequest(request);
    return this.validateRequest(request);
  }
  validateRequest(request: Request): boolean {
    const authorization = request.headers['authorization'];
    if (!authorization) {
      return false;
    }
    return true;
  }
}