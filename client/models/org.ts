import { OrgFounder } from "./org_founders";

export default interface Organization {
  org_id?: number;
  name: string;
  description: string;
  hq_location?: string;
  website?: string;
  main_sector?: string;
  founding_date?: string;
  org_image?: string;
  org_status?: string;
  org_founders?: OrgFounder[];
}
