import { DataSource } from 'typeorm';
import { JokeEntity } from '../infrastructure/reppositories/joke/entities/joke.entity';

export async function seedJokes(
  dataSource: DataSource,
  userId: string,
  jokes: string[],
) {
  const userRepo = dataSource.getRepository(JokeEntity);

  for (const joke of jokes) {
    const exists = await userRepo.findOneBy({ content: joke });
    if (!exists) {
      await userRepo.save({ content: joke, userId: userId });
    }
  }
}
