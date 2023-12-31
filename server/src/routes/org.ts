import express from "express";
import {
  createOrg,
  getAllSectors,
  getFailedOrgs,
  getOrg,
  getOrgArticles,
  getOrgBySector,
  getOrgFounders,
  getOrgs,
  getSuccessfulOrgs,
  updateOrg,
  updateOrgStatus,
} from "../controllers/org";
import { canReview, isAdmin, isLoggedIn } from "../middleware";
import wrapAsync from "../utils";
const router = express.Router();
router
  .route("/")
  .get(getOrgs)
  .post(isLoggedIn, canReview, wrapAsync(createOrg));
router.route("/successful").get(wrapAsync(getSuccessfulOrgs));
router.route("/failed").get(wrapAsync(getFailedOrgs));
router.route("/sectors").get(wrapAsync(getAllSectors));
router.route("/sector/:sector").get(wrapAsync(getOrgBySector));
router
  .route("/:id")
  .get(getOrg)
  .put(isLoggedIn, isAdmin, wrapAsync(updateOrg))
  .patch(isLoggedIn, canReview, wrapAsync(updateOrgStatus));
router.route("/:id/founders").get(wrapAsync(getOrgFounders));
router.route("/:id/articles").get(wrapAsync(getOrgArticles));
export { router as orgRoute };
