import { db } from "@/server/db";

async function main() {
  await db.tier.create({
    data: {
      id: "free",
      name: "Free",
      maxProjects: 1,
      maxTextReviews: 25,
      maxVideoReviews: 1,
      isCustom: false,
    },
  });
}

try {
  main();
} catch (error) {
  console.log(error);
}
