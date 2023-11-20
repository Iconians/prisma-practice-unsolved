import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const ratings = await prisma.starRating.findMany({
    where: {
      userId,
    },
  });

  const averageScore = ratings.reduce((acc, rating) => {
    return acc + rating.score;
  }, 0);
  return averageScore / ratings.length;
};
