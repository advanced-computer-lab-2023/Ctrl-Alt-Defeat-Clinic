const express = require("express");
const router = express.Router();
const packageController = require("../Controllers/packageController");

router.get("/getPackages",packageController.getAllPackages);
router.post("/addPackage",packageController.createPackage);
router.put("/updatePackage/:name",packageController.updatePackage);
router.delete("/deletePackage/:name",packageController.deletePackage);

module.exports = router;