import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Movie, MovieSchema } from '../schemas/movie.schema';
import { Actor, ActorSchema } from '../schemas/actor.schema';
import { ActorService } from './actor.service';
import { ActorController } from './actor/actor.controller';
import { Director, DirectorSchema } from '../schemas/director.schema';
import { DirectorController } from './director/director.controller';
import { DirectorService } from './director/director.service';

@Module({
  controllers: [MovieController, ActorController, DirectorController],
  providers: [MovieService, ActorService, DirectorService],
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }]),
    MongooseModule.forFeature([
      { name: Director.name, schema: DirectorSchema },
    ]),
  ],
})
export class MovieModule {}
