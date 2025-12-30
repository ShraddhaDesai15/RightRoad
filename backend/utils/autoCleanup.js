const Response = require('../models/Response');

async function autoCleanupIfNeeded() {
  try {
    const stats = await Response.collection.stats();
    const usedMB = stats.storageSize / (1024 * 1024);

    console.log("📦 Current Response Collection Size:", usedMB.toFixed(2), "MB");

    if (usedMB > 450) {
      const oldest = await Response.find().sort({ createdAt: 1 }).limit(50);
      const idsToDelete = oldest.map(doc => doc._id);
      await Response.deleteMany({ _id: { $in: idsToDelete } });
      console.log(`🗑 Deleted ${idsToDelete.length} oldest responses.`);
    }
  } catch (err) {
    console.error("❌ Cleanup error:", err.message);
  }
}

module.exports = autoCleanupIfNeeded;
// const Response = require("./models/Response");

// async function autoCleanupIfNeeded() {
//   try {
//     const stats = await Response.collection.stats();
//     const usedMB = stats.storageSize / (1024 * 1024);

//     console.log("📦 Current Response Collection Size:", usedMB.toFixed(2), "MB");

//     if (usedMB > 450) {
//       const oldest = await Response.find().sort({ createdAt: 1 }).limit(50);
//       const idsToDelete = oldest.map(doc => doc._id);
//       await Response.deleteMany({ _id: { $in: idsToDelete } });
//       console.log(`🗑 Deleted ${idsToDelete.length} oldest responses to free space.`);
//     } else {
//       console.log("✅ Storage within safe limit. No deletion needed.");
//     }
//   } catch (err) {
//     console.error("❌ Cleanup error:", err.message);
//   }
// }

// module.exports = autoCleanupIfNeeded;