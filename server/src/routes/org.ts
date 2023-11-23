import express from "express";
import {
  createOrg,
  getAllSectors,
  getFailedOrgs,
  getOrg,
  getOrgArticles,
  getOrgBySector,
  getOrgFounders,
  getOrgInterviews,
  getOrgs,
  getSuccessfulOrgs,
  updateOrg,
} from "../controllers/org";
import { isLoggedIn } from "../middleware";
import wrapAsync from "../utils";
const router = express.Router();
router.route("/").get(getOrgs).post(isLoggedIn, wrapAsync(createOrg));
router.route("/successful").get(getSuccessfulOrgs);
router.route("/failed").get(getFailedOrgs);
router.route("/sectors").get(getAllSectors);
router.route("/sector/:sector").get(getOrgBySector);
router.route("/:id").get(getOrg).put(updateOrg);
router.route("/:id/founders").get(getOrgFounders);
router.route("/:id/interviews").get(getOrgInterviews);
router.route("/:id/articles").get(getOrgArticles);
export { router as orgRoute };
