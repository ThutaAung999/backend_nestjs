//import { SetMetadata } from '@nestjs/common';
//export const Todo = (...args: string[]) => SetMetadata('todo', args);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TodoDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    console.log('requst body: ' + JSON.stringify(request.headers));

    return request.headers;
  },
);
