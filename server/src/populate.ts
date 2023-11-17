import { v4 } from "uuid";
import {
  users,
  article,
  article_tags,
  comment,
  interviews,
  interview_questions,
  org_founders,
  orgs,
  prefs,
  user_prefs,
  User,
  Article,
  Comment,
  UserPrefs,
  Pref,
  Org,
  OrgFounders,
  Interview,
  InterviewQuestions,
  ArticleTags,
} from "./schema";

import db from "./db";
export async function populateUsers() {
  const user1: User = {
    user_id: v4(),
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@gmail.com",
    password: "password",
    role: "user",
    verified: true,
    x_account: "",
    linkdin_account: "",
    website: "",
    user_image: "",
  };
  const user2: User = {
    user_id: v4(),
    name: "Jane Doe",
    username: "janedoe",
    email: "janedoe@gmail.com",
    password: "password",
    role: "reviewer",
    verified: true,
    x_account: "",
    linkdin_account: "",
    website: "",
    user_image: "",
  };
  const insertedValues = db.insert(users).values([user1, user2]);
  return insertedValues;
}
export async function populateUserPrefs() {
  const userPrefs1: UserPrefs = {
    id: v4(),
    user_id: "8222c401-a4ac-4ac3-b34b-e6fff9fda349",
    pref_id: "b8fdb1bc-b87d-4e15-859e-4cbf27d442a5",
  };
  const userPrefs2: UserPrefs = {
    id: v4(),
    user_id: "02f7533d-3124-49fb-bc2b-d43cf7c0dbeb",
    pref_id: "b8fdb1bc-b87d-4e15-859e-4cbf27d442a5",
  };
  const insertedValues = db.insert(user_prefs).values([userPrefs1, userPrefs2]);
  return insertedValues;
}
export async function populateOrgs() {
  const org1: Org = {
    org_id: v4(),
    name: "Google",
    founding_date: "1998",
    description:
      "Google is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.",
    website: "https://www.google.com/",
    org_image: "",
    hq_location: "Mountain View, California, United States",
    org_status: "success",
  };
  const org2: Org = {
    org_id: v4(),
    name: "Facebook",
    founding_date: "2004",
    description:
      "Facebook is an American online social media and social networking service based in Menlo Park, California, and a flagship service of the namesake company Facebook, Inc.",
    website: "https://www.facebook.com/",
    org_image: "",
    hq_location: "Menlo Park, California, United States",
    org_status: "success",
  };
  const insertedValues = db.insert(orgs).values([org1, org2]);
  return insertedValues;
}
export async function populateOrgFounders() {
  const orgFounders1: OrgFounders = {
    founder_id: v4(),
    org_id: "2491ce88-199e-4fbb-be33-9f5f5b2feb13",
    founder: "Larry Page",
  };
  const orgFounders2: OrgFounders = {
    founder_id: v4(),
    org_id: "2491ce88-199e-4fbb-be33-9f5f5b2feb13",
    founder: "Sergey Brin",
  };
  const insertedValues = db
    .insert(org_founders)
    .values([orgFounders1, orgFounders2]);
  return insertedValues;
}
export async function populateInterviews() {
  const interview1: Interview = {
    interview_id: v4(),
    user_id: "8222c401-a4ac-4ac3-b34b-e6fff9fda349",
    org_id: "2491ce88-199e-4fbb-be33-9f5f5b2feb13",
    interview_date: "November 2022",
  };
  const interview2: Interview = {
    interview_id: v4(),
    user_id: "8222c401-a4ac-4ac3-b34b-e6fff9fda349",
    org_id: "3de543eb-3313-425e-9a07-47c4429f3f38",
    interview_date: "July 2020",
  };
  const insertedValues = db.insert(interviews).values([interview1, interview2]);

  return insertedValues;
}
export async function populateInterviewQuestions() {
  const interviewQuestions1: InterviewQuestions = {
    question_id: v4(),
    interview_id: "11cf59f9-9625-4c42-9a8e-61534d79743b",
    question: "What is your favorite color?",
    answer: "Blue",
  };
  const interviewQuestions2: InterviewQuestions = {
    question_id: v4(),
    interview_id: "11cf59f9-9625-4c42-9a8e-61534d79743b",
    question: "What is your favorite food?",
    answer: "Pizza",
  };
  const insertedValues = db
    .insert(interview_questions)
    .values([interviewQuestions1, interviewQuestions2]);
  return insertedValues;
}
export async function populateArticleTags() {
  const articleTags1: ArticleTags = {
    tag_id: v4(),
    article_id: "24c1d82e-7bc7-4ca8-a1d3-f5c3786e7a2d",
    tag: "tag1",
  };
  const articleTags2: ArticleTags = {
    tag_id: v4(),
    article_id: "24c1d82e-7bc7-4ca8-a1d3-f5c3786e7a2d",
    tag: "tag2",
  };
  const insertedValues = db
    .insert(article_tags)
    .values([articleTags1, articleTags2]);
  return insertedValues;
}
export async function populatePrefs() {
  const pref1: Pref = {
    pref_id: v4(),
    pref: "pref1",
  };
  const pref2: Pref = {
    pref_id: v4(),
    pref: "pref2",
  };
  const insertedValues = db.insert(prefs).values([pref1, pref2]);
  return insertedValues;
}
export async function populateComments() {
  const comment1: Comment = {
    comment_id: v4(),
    user_id: "8222c401-a4ac-4ac3-b34b-e6fff9fda349",
    article_id: "3ef54ff6-8d63-4554-a677-163dde05d502",
    content: "This is a comment",
    date: "November 2022",
    comment_likes: 0,
  };
  const comment2: Comment = {
    comment_id: v4(),
    user_id: "8222c401-a4ac-4ac3-b34b-e6fff9fda349",
    article_id: "3ef54ff6-8d63-4554-a677-163dde05d502",
    content: "This is another comment",
    date: "November 2022",
    comment_likes: 0,
  };
  const insertedValues = db.insert(comment).values([comment1, comment2]);
  return insertedValues;
}

export async function populateArticles() {
  const article1: Article = {
    article_id: v4(),
    user_id: "8222c401-a4ac-4ac3-b34b-e6fff9fda349",
    org_id: "2491ce88-199e-4fbb-be33-9f5f5b2feb13",
    title: "How to get a job at Google",
    subtitle: "Subtitle",
    content: "Content",
    article_image: "",
    date: "November 2022",
    article_status: "published",
    views: 0,
    bookmarks: 0,
    likes: 0,
  };
  const article2: Article = {
    article_id: v4(),
    user_id: "8222c401-a4ac-4ac3-b34b-e6fff9fda349",
    org_id: "3de543eb-3313-425e-9a07-47c4429f3f38",
    title: "How to get a job at Facebook",
    subtitle: "Subtitle",
    content: "Content",
    article_image: "",
    date: "July 2020",
    article_status: "draft",
    views: 0,
    bookmarks: 0,
    likes: 0,
  };
  const insertedValues = db.insert(article).values([article1, article2]);
  return insertedValues;
}
