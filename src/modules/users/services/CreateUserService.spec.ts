import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    await createUserService.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
