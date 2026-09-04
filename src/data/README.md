# Public content data

The public website reads these JSON files through `src/lib/data` during the build. Public pages must not fetch the MongoDB APIs or import MongoDB models.

MongoDB, Mongoose, the models, APIs, and admin dashboard are intentionally preserved for future content management. The current admin dashboard does not change the public website until a future synchronization workflow is introduced.
