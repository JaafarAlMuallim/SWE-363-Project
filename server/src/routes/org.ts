import express from "express";
import {
  getOrgs,
  getOrg,
  getOrgFounders,
  getAllSectors,
  getOrgBySector,
  createOrg,
  updateOrg,
  getSuccessfulOrgs,
  getFailedOrgs,
  getOrgInterviews,
} from "../controllers/org";
const router = express.Router();
router.route("/").get(getOrgs).post(createOrg);
router.route("/successful").get(getSuccessfulOrgs);
router.route("/failed").get(getFailedOrgs);
router.route("/sectors").get(getAllSectors);
router.route("/sector/:sector").get(getOrgBySector);
router.route("/:id").get(getOrg).put(updateOrg);
router.route("/:id/founders").get(getOrgFounders);
router.route("/:id/interviews").get(getOrgInterviews);
export default router;
