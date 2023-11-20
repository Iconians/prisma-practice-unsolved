import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const allRatings = await prisma.starRating.findMany();
  const allMovies = await prisma.movie.findMany();

  const result = allMovies.filter((movie) => {
    const ratings = allRatings.filter((rating) => rating.movieId === movie.id);
    const average =
      ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length;
    return average > n;
  });

  return result;
};
