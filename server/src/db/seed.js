import { db } from "./index.js";
import { classes } from "./schema.js";
import { classesData } from "./classes.data.js";

// BrewHaus uses randomUUID() because their product id is text.
// Our classes.id is serial (auto number), so Postgres creates the id for us.
async function seed() {
  console.log("Seeding classes...");

  // wipe old rows so running seed twice doesn't create duplicates
  await db.delete(classes);
  await db.insert(classes).values(classesData);

  console.log(`Done — seeded ${classesData.length} classes.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
