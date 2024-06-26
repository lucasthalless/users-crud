import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { print } from 'graphql';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import {
  createUserMutation,
  createUserSettings,
  getUser,
  getUserWithoutSettings,
  getUsersWithoutSettings,
  removeUser,
  updateUser,
  updateUserSettings,
} from '../src/graphql/queries';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let access_token = 'Bearer ';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const dataSource = app.get(DataSource);
    await dataSource.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    await dataSource.dropDatabase();
    await dataSource.destroy();
    await app.close();
  });

  describe('getUsers', () => {
    it('should be unauthorized to query getUsers', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getUsersWithoutSettings) })
        .expect((res) => {
          expect(res.body.data.getUsers).toBeNull();
          expect(res.body.errors).not.toBeNull();
          expect(res.body.errors[0].message).toBe('Unauthorized');
        });
    });
  });

  describe('signup', () => {
    it('should be able to post /signup and create a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ name: 'joao', password: '152', email: 'joao@gotmail.com' })
        .expect(200);
    });
  });

  describe('signin', () => {
    it('should be able to post /signin and receive a jwt access token', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({ password: '152', email: 'joao@gotmail.com' })
        .expect(200)
        .expect((res) => {
          expect(typeof res.body.access_token === 'string').toBe(true);
          access_token += res.body.access_token;
        });
    });
  });

  describe('getUsers', () => {
    it('should query getUsers and return 1 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({ query: print(getUsersWithoutSettings) })
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(1);
        });
    });
  });

  describe('createUser', () => {
    it('should create a user using createUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({
          query: print(
            createUserMutation('maria', 'maria@email.com', 'maria123'),
          ),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual({
            id: 2,
            name: 'maria',
            email: 'maria@email.com',
            password: 'maria123',
          });
        });
    });
  });

  describe('getUsers', () => {
    it('should query getUsers and return 2 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({ query: print(getUsersWithoutSettings) })
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(2);
        });
    });
  });

  describe('getUser', () => {
    it('should query getUser and return all data from the user with id 2', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({ query: print(getUserWithoutSettings(2)) })
        .expect((res) => {
          expect(res.body.data.getUser).toEqual({
            id: 2,
            name: 'maria',
            email: 'maria@email.com',
            password: 'maria123',
          });
        });
    });
  });

  describe('createUserSettings', () => {
    it('should create a user setting using createUserSettings mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({
          query: print(createUserSettings(2, true, false)),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUserSettings).toEqual({
            userId: 2,
            receiveEmails: true,
            receiveNotifications: false,
          });
        });
    });
  });

  describe('getUser', () => {
    it('should query getUser and return all data from the user with id 2 including user settings', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({
          query: print(getUser(2)),
        })
        .expect((res) => {
          expect(res.body.data.getUser).toEqual({
            id: 2,
            name: 'maria',
            email: 'maria@email.com',
            password: 'maria123',
            settings: {
              userId: 2,
              receiveEmails: true,
              receiveNotifications: false,
            },
          });
        });
    });
  });

  // TODO: fix test expected return
  describe('updateUserSettings', () => {
    it('should update a user setting using updateUserSettings mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({
          query: print(updateUserSettings(2, false, true)),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.updateUserSettings).toEqual({
            userId: 2,
            receiveEmails: false,
            receiveNotifications: true,
          });
        });
    });
  });

  describe('getUser', () => {
    it('should query getUser and return all data from the user with id 2 including user settings updated', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({
          query: print(getUser(2)),
        })
        .expect((res) => {
          expect(res.body.data.getUser).toEqual({
            id: 2,
            name: 'maria',
            email: 'maria@email.com',
            password: 'maria123',
            settings: {
              userId: 2,
              receiveEmails: false,
              receiveNotifications: true,
            },
          });
        });
    });
  });

  describe('updateUser', () => {
    it('should update a user using updateUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({
          query: print(updateUser(2, 'maria', 'maria@gmail.com', 'm4r14')),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.updateUser).toEqual({
            id: 2,
            name: 'maria',
            email: 'maria@gmail.com',
            password: 'm4r14',
            settings: {
              userId: 2,
              receiveEmails: false,
              receiveNotifications: true,
            },
          });
        });
    });
  });

  describe('removeUser', () => {
    it('should remove a user using removeUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({
          query: print(removeUser(2)),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.removeUser).toEqual(true);
        });
    });
  });

  describe('getUsers', () => {
    it('should query getUsers and return 1 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', access_token)
        .send({ query: print(getUsersWithoutSettings) })
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(1);
        });
    });
  });
});
