import { groupBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const allRatings = await prisma.starRating.findMany();
  const allUsers = await prisma.user.findMany();

  const groupedRatings = groupBy(allRatings, (rating) => rating.userId);

  const averages = Object.entries(groupedRatings).map(([userId, ratings]) => {
    const average =
      ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length;
    return {
      userId: parseInt(userId, 10),
      average,
    };
  });

  const grumpiest = averages.reduce((acc, average) => {
    if (average.average < acc.average) {
      return average;
    }
    return acc;
  });

  const grumpiestUser = allUsers.find((user) => user.id === grumpiest.userId);

  return grumpiestUser?.id;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const allRatings = await prisma.starRating.findMany();
  const allUsers = await prisma.user.findMany();

  const groupedRatings = groupBy(allRatings, (rating) => rating.userId);

  const averages = Object.entries(groupedRatings).map(([userId, ratings]) => {
    const average =
      ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length;
    return {
      userId: parseInt(userId, 10),
      average,
    };
  });

  const nicest = averages.reduce((acc, average) => {
    if (average.average > acc.average) {
      return average;
    }
    return acc;
  });

  const nicestUser = allUsers.find((user) => user.id === nicest.userId);

  return nicestUser?.id;
};
