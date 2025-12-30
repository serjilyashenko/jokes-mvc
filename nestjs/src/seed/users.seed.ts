import { DataSource } from 'typeorm';
import { UserEntity } from '../domain/user/entities/user.entity';
import { seedJokes } from './jokes.seed';

type UserSeed = {
  username: string;
  passwordHash: string;
  jokes: string[];
};

export async function seedUsers(dataSource: DataSource, users: UserSeed[]) {
  const userRepo = dataSource.getRepository(UserEntity);

  for (const user of users) {
    const userEntity =
      (await userRepo.findOneBy({ username: user.username })) ||
      (await userRepo.save(user));

    await seedJokes(dataSource, userEntity.id, user.jokes);
  }

  console.log(`Seeded ${users.length} users`);
}
