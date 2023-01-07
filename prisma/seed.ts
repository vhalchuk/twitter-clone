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

  const createTweets = faker.helpers
    .shuffle(tweets)
    .map((tweet) => prisma.tweet.create({ data: tweet }));

  const createdTweets = await prisma.$transaction(createTweets);

  const likesData: { tweetId: string; userId: string }[] = [];

  users.forEach((user) => {
    // Get a random number of tweets to like (in percentage from 20% to 80%)
    const likesCoverage = faker.datatype.number({ min: 20, max: 80 }) * 0.01;
    const amountOfLikes = Math.floor(createdTweets.length * likesCoverage);
    const tweetsToLike = faker.helpers
      .shuffle(createdTweets)
      .slice(0, amountOfLikes);

    tweetsToLike.forEach((tweet) => {
      likesData.push({
        tweetId: tweet.id,
        userId: user.id,
      });
    });
  });

  const createLikes = likesData.map((like) =>
    prisma.like.create({
      data: {
        tweet: {
          connect: {
            id: like.tweetId,
          },
        },
        author: {
          connect: {
            id: like.userId,
          },
        },
      },
    })
  );

  await prisma.$transaction(createLikes);

  await prisma.$disconnect();
}

run();
