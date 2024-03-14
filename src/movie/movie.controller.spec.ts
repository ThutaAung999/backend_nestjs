import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie, MovieDocument } from '../schemas/movie.schema';
import { Model } from 'mongoose';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

describe('MovieController', () => {
  let controller: MovieController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const createMovieDto: CreateMovieDto = { /* provide DTO data */ };
      const expectedResult = { /* mock the expected result */ };

      jest.spyOn(movieService, 'create').mockResolvedValue(expectedResult);

      expect(await controller.create(createMovieDto)).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should find all movies', async () => {
      const expectedResult = [/* mock the expected result array */];

      jest.spyOn(movieService, 'findAll').mockResolvedValue(expectedResult);

      expect(await controller.findAll()).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should find a movie by ID', async () => {
      const id = 'mocked_id';
      const expectedResult = { /* mock the expected result */ };

      jest.spyOn(movieService, 'findOne').mockResolvedValue(expectedResult);

      expect(await controller.findOne(id)).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a movie by ID', async () => {
      const id = 'mocked_id';
      const updateMovieDto: UpdateMovieDto = { /* provide DTO data */ };
      const expectedResult = { /* mock the expected result */ };

      jest.spyOn(movieService, 'update').mockResolvedValue(expectedResult);

      expect(await controller.update(id, updateMovieDto)).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove a movie by ID', async () => {
      const id = 'mocked_id';
      const expectedResult = { /* mock the expected result */ };

      jest.spyOn(movieService, 'remove').mockResolvedValue(expectedResult);

      expect(await controller.remove(id)).toEqual(expectedResult);
    });
  });
});
