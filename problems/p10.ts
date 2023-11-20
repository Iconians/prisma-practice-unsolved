import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well

export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const users = await prisma.user.findMany();
  const usersToDelete = users.filter((user) => user.age < n);
  await prisma.starRating.deleteMany({
    where: {
      userId: {
        in: usersToDelete.map((user) => user.id),
      },
    },
  });

  await prisma.user.deleteMany({
    where: {
      age: {
        lt: n,
      },
    },
  });
};
