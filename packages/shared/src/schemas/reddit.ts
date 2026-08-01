import { z } from "zod";

export const redditPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  selftext: z.string().nullable(),
  subreddit: z.string(),
  author: z.string(),
  ups: z.number(),
  upvote_ratio: z.number(),
  num_comments: z.number(),
  created_utc: z.number(),
  url: z.string(),
  permalink: z.string(),
  over_18: z.boolean().optional(),
});

export type RedditPost = z.infer<typeof redditPostSchema>;

export const redditConfigSchema = z.object({
  clientId: z.string().min(1),
  clientSecret: z.string().min(1),
  userAgent: z.string().min(1),
});

export type RedditConfig = z.infer<typeof redditConfigSchema>;

export const redditSortSchema = z.enum(["hot", "rising", "top"]);

export type RedditSort = z.infer<typeof redditSortSchema>;
