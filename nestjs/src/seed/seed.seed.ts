import { DataSource } from 'typeorm';
import { seedUsers } from './users.seed';

const users = [
  {
    username: 'testuser1',
    passwordHash:
      '$2a$12$qmf.Kle8.eAvQghiIiuTWOH2ohiKqDVvZYHthmKwGKGYuwfiy2/I6',
    jokes: [
      'What do you call corn that joins the army? Kernel.',
      'Did you know Albert Einstein was a real person? All this time, I thought he was just a theoretical physicist!',
    ],
  },
  {
    username: 'solidsnake',
    passwordHash:
      '$2a$12$jjR8JMIWph6sTsnpZ7CPyu48C1ODiH6c/zqt1dOJPKBekTdBOV7c6',
    jokes: [
      'What was a more important invention than the first telephone? The second one.',
      "Ben & Jerry's really need to improve their operation. The only way to get there is down a rocky road.",
    ],
  },
];

export async function runSeed(dataSource: DataSource) {
  await seedUsers(dataSource, users);
}
