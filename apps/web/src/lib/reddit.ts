import { RedditPost, RedditSort } from "@maquina/shared";

const REDDIT_BASE_URL = "https://www.reddit.com";

export interface RedditConfig {
  clientId: string;
  clientSecret: string;
  userAgent: string;
}

export interface RedditAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface RedditListingResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
    after: string | null;
    before: string | null;
  };
}

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function getAccessToken(config: RedditConfig): Promise<string> {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": config.userAgent,
      Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`Reddit authentication failed: ${response.statusText}`);
  }

  const data: RedditAuthResponse = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000 - 60000; // Expire 1 minute early

  return accessToken;
}

export async function fetchRedditPosts(
  subreddit: string,
  sort: RedditSort = "hot",
  limit: number = 25
): Promise<RedditPost[]> {
  const config: RedditConfig = {
    clientId: process.env.REDDIT_CLIENT_ID || "",
    clientSecret: process.env.REDDIT_CLIENT_SECRET || "",
    userAgent: process.env.REDDIT_USER_AGENT || "MaquinaDeVendas/1.0",
  };

  if (!config.clientId || !config.clientSecret) {
    throw new Error("Reddit credentials not configured");
  }

  const token = await getAccessToken(config);

  const sortParam = sort === "rising" ? "rising" : sort === "top" ? "top" : "hot";
  const response = await fetch(
    `${REDDIT_BASE_URL}/r/${subreddit}/${sortParam}.json?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": config.userAgent,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Reddit API error: ${response.statusText}`);
  }

  const data: RedditListingResponse = await response.json();
  return data.data.children.map((child) => child.data);
}

export async function fetchHotPosts(subreddit: string, limit: number = 25): Promise<RedditPost[]> {
  return fetchRedditPosts(subreddit, "hot", limit);
}

export async function fetchRisingPosts(subreddit: string, limit: number = 25): Promise<RedditPost[]> {
  return fetchRedditPosts(subreddit, "rising", limit);
}

export async function fetchTopPosts(subreddit: string, limit: number = 25): Promise<RedditPost[]> {
  return fetchRedditPosts(subreddit, "top", limit);
}

export const INITIAL_SUBREDDITS = [
  "entrepreneur",
  "sidehustle",
  "smallbusiness",
  "marketing",
  "saas",
  "passive_income",
];
