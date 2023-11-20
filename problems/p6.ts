import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const allRatings = await prisma.starRating.findMany({
    where: { userId },
  });
  const allMovies = await prisma.movie.findMany();

  const result = allMovies.filter((movie) => {
    const ratings = allRatings.filter((rating) => rating.movieId === movie.id);
    return ratings.length > 0;
  });

  return result;
};
