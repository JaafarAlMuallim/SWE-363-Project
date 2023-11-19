import { Request, Response, NextFunction } from "express";
import db from "../db";
import {
  orgs,
  org_founders,
  Org,
  OrgFounders,
  article,
  interviews,
} from "../schema";
import { eq } from "drizzle-orm";
type OrgData = Omit<Org, "org_id">;

export async function getOrgs(req: Request, res: Response, next: NextFunction) {
  try {
    const orgs = await db.query.orgs.findMany({
      with: { org_founders: true },
    });
    res.send(orgs);
  } catch (e) {
    next(e);
  }
}

export async function getOrg(req: Request, res: Response, next: NextFunction) {
  try {
    const org = await db.query.orgs.findFirst({
      with: { org_founders: true },
      where: eq(orgs.org_id, req.params.id),
    });
    res.send(org);
  } catch (e) {
    next(e);
  }
}

export async function getOrgFounders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const founders = await db.query.org_founders.findMany({
      where: eq(orgs.org_id, req.params.id),
    });
    res.send(founders);
  } catch (e) {
    next(e);
  }
}

export async function getAllSectors(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const sectors = await db
      .selectDistinct({
        main_sector: orgs.main_sector,
      })
      .from(orgs);
    res.send(sectors);
  } catch (e) {
    next(e);
  }
}

export async function getOrgBySector(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orgsBySector = await db.query.orgs.findMany({
      with: { org_founders: true },
      where: eq(orgs.main_sector, req.params.sector),
    });
    res.send(orgsBySector);
  } catch (e) {
    next(e);
  }
}

export async function createOrg(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orgData: OrgData = {
      name: req.body.name,
      founding_date: req.body.founding_date,
      main_sector: req.body.main_sector,
      description: req.body.description,
      website: req.body.website,
      org_image: req.body.org_image,
      hq_location: req.body.hq_location,
      org_status: req.body.org_status,
    };
    const newOrg = await db.insert(orgs).values([orgData]).returning();
    for (const founder of req.body.founders) {
      const newFounder = await db
        .insert(org_founders)
        .values([{ org_id: newOrg[0].org_id, founder: founder }]);
    }
    res.send(newOrg);
  } catch (e) {
    next(e);
  }
}

export async function updateOrg(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orgData: OrgData = {
      name: req.body.name,
      founding_date: req.body.founding_date,
      main_sector: req.body.main_sector,
      description: req.body.description,
      website: req.body.website,
      org_image: req.body.org_image,
      hq_location: req.body.hq_location,
      org_status: req.body.org_status,
    };
    const updatedOrg = await db
      .update(orgs)
      .set(orgData)
      .where(eq(orgs.org_id, req.params.id))
      .returning();
    res.send(updatedOrg);
  } catch (e) {
    next(e);
  }
}

export async function getSuccessfulOrgs(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const successfulOrgs = await db.query.orgs.findMany({
      with: { org_founders: true },
      where: eq(orgs.org_status, "success"),
    });
    res.send(orgs);
  } catch (e) {
    next(e);
  }
}

export async function getFailedOrgs(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const failedOrgs = await db.query.orgs.findMany({
      with: { org_founders: true },
      where: eq(orgs.org_status, "failure"),
    });
    res.send(orgs);
  } catch (e) {
    next(e);
  }
}

export async function getOrgInterviews(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const interviews = await db.query.interviews.findMany({
      with: { org: true, user: true },
      where: eq(orgs.org_id, req.params.id),
    });
    res.send(interviews);
  } catch (e) {
    next(e);
  }
}

export async function getOrgArticles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const articles = await db.query.article.findMany({
      with: {
        article_tags: true,
      },
      where: eq(orgs.org_id, req.params.id),
    });
    res.send(articles);
  } catch (e) {
    next(e);
  }
}

export async function getOrgInterviewsBySector(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const interviews = await db.query.interviews.findMany({
      with: { org: true, user: true },
      where: eq(orgs.main_sector, req.params.sector),
    });
    res.send(interviews);
  } catch (e) {
    next(e);
  }
}
