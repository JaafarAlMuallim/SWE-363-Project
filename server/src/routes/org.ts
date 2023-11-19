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
router.route("/").get();
