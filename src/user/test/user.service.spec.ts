import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from '../../mocks/users.mock';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  const leftJoinAndSelectSpy = jest.fn().mockReturnThis();
  const whereSpy = jest.fn().mockReturnThis();
  const orderBySpy = jest.fn().mockReturnThis();
  const offsetSpy = jest.fn().mockReturnThis();
  const limitSpy = jest.fn().mockReturnThis();
  const getManySpy = jest.fn().mockReturnValue(users);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
              leftJoinAndSelect: leftJoinAndSelectSpy,
              where: whereSpy,
              orderBy: orderBySpy,
              offset: offsetSpy,
              limit: limitSpy,
              getMany: getManySpy,
            })),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('userRepository', () => {
    it('should be defined', () => {
      expect(userRepository).toBeDefined();
    });
  });

  describe('createUser', () => {
    it('should call userRepository.create with correct params', async () => {
      await service.create({
        name: 'maria',
        email: 'maria@email.com',
        password: 'maria123',
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        name: 'maria',
        email: 'maria@email.com',
        password: 'maria123',
      });
    });

    it('should call userRepository.save with correct params', async () => {
      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id: 1,
        name: 'maria',
        email: 'maria@email.com',
        password: 'maria123',
      });
      await service.create({
        name: 'maria',
        email: 'maria@email.com',
        password: 'maria123',
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        name: 'maria',
        email: 'maria@email.com',
        password: 'maria123',
      });
    });
  });

  describe('findAll', () => {
    it('should get all users', async () => {
      const queryBuilderMock = userRepository.createQueryBuilder();
      await service.findAll();
      expect(queryBuilderMock.getMany).toHaveBeenCalled();
      expect(queryBuilderMock.getMany).toHaveReturnedWith(users);
    });

    it('should be able to paginate', async () => {
      await service.findAll({ per_page: 2, page: 0 });
      expect(offsetSpy).toHaveBeenCalledWith(0);
      expect(limitSpy).toHaveBeenCalledWith(2);
    });

    it('should be able to sort', async () => {
      await service.findAll(null, {
        id: 'ASC',
        name: 'ASC',
        email: 'ASC',
        password: 'ASC',
      });
      expect(orderBySpy).toHaveBeenCalledWith({
        id: 'ASC',
        name: 'ASC',
        email: 'ASC',
        password: 'ASC',
      });
    });

    it('should be able to filter', async () => {
      const queryBuilderMock = userRepository.createQueryBuilder();
      await service.findAll(null, null, {
        whereFactory: (queryBuilderMock) => queryBuilderMock,
        '@instanceof': Symbol('id'),
      });
      expect(whereSpy).toHaveBeenCalled();
      expect(queryBuilderMock.where).toHaveBeenCalled();
    });
  });
});
