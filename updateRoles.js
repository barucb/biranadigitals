// updateRoles.js

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function updateAuthorRolesToUser() {
  try {
    // Find users with the 'AUTHOR' role and update their role to 'USER'
    await prisma.user.updateMany({
      where: {
        role: {
          in: ["USER", "ADMIN"],
        },
      },
      data: { role: "ADMIN" },
    });

    console.log("Roles updated successfully");
  } catch (error) {
    console.error("Error updating roles:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAuthorRolesToUser();
