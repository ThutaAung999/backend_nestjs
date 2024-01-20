import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { HostController } from './host/host.controller';
import { LibSpecificController } from './lib-specific/lib-specific.controller';
import { logger } from './logger-tow/logger-tow.middleware';
import { LoggerMiddleware } from './logger/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot('mongodb://localhost/angular_1st_batch'),
    MovieModule,
  ],
  controllers: [AppController, HostController, LibSpecificController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      //.apply(LoggerMiddleware)
      .apply(logger, LoggerMiddleware)
      .exclude('/todo/query')
      .forRoutes({ path: 'todo', method: RequestMethod.GET });
    //consumer.apply(LoggerMiddleware).forRoutes(TodoController);
  }
}
