import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const USERS_TO_CREATE = 20;
const TWEETS_MIN = 1;
const TWEETS_MAX = 20;

async function run() {
  const userData = Array(USERS_TO_CREATE)
    .fill(null)
    .map(() => {
      return {
        name: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLocaleLowerCase(),
        image: faker.image.avatar(),
      };
    });

  const createUsers = userData.map((user) =>
    prisma.user.create({ data: user })
  );

  const users = await prisma.$transaction(createUsers);

  const tweets: {
    text: string;
    author: { connect: { id: string } };
  }[] = [];

  users.forEach((user) => {
    const amount = faker.datatype.number({ min: TWEETS_MIN, max: TWEETS_MAX });

    for (let i = 0; i < amount; i++) {
      tweets.push({
        text: faker.lorem.sentence(),
        author: {
          connect: {
            id: user.id,
          },
        },
      });
    }
  });

  const createTweets = tweets.map((tweet) =>
    prisma.tweet.create({ data: tweet })
  );

  await prisma.$transaction(createTweets);

  await prisma.$disconnect();
}

run();
