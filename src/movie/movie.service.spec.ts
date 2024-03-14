import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from '../schemas/movie.schema';

describe('MovieService', () => {
  let service: MovieService;
  let mockModel: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getModelToken(Movie.name),
          useValue: {
            new: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    mockModel = module.get<Model<any>>(getModelToken(Movie.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const createMovieDto: CreateMovieDto = { /* provide DTO data */ };
      const expectedResult = { /* mock the expected result */ };

      jest.spyOn(mockModel.prototype, 'save').mockImplementation(() => Promise.resolve(expectedResult));

      //jest.spyOn(mockModel, 'save').mockResolvedValue(expectedResult);

      expect(await service.create(createMovieDto)).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should find all movies', async () => {
      const expectedResult = [/* mock the expected result array */];



      jest.spyOn(mockModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(expectedResult),
      } as any); // Use 'as any' to bypass type checking


      expect(await service.findAll()).toEqual(expectedResult);
    });
  });

  // Add similar tests for other methods (findOne, update, remove) following the same pattern
});
