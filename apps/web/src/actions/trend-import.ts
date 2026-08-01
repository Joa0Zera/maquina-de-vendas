"use server";

import { db, trends } from "@maquina/database";
import { RedditPost } from "@maquina/shared";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { fetchHotPosts, INITIAL_SUBREDDITS } from "@/lib/reddit";
import { scoreRedditPost, sortByScore } from "@/lib/trend-scoring";
import { requireOrganization } from "@/lib/session";

export interface ImportResult {
  imported: number;
  skipped: number;
  errors: string[];
  credentialError?: string;
}

export async function importTrendsAction(): Promise<ImportResult> {
  const { organizationId } = await requireOrganization();

  const result: ImportResult = {
    imported: 0,
    skipped: 0,
    errors: [],
  };

  try {
    // Check for credential errors before fetching
    try {
      await fetchHotPosts(INITIAL_SUBREDDITS[0] || "entrepreneur", 1);
    } catch (error) {
      if (error instanceof Error && error.message === "Reddit credentials not configured") {
        result.credentialError = "Reddit credentials are not configured. Please add REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET to your environment variables.";
        return result;
      }
    }

    // Fetch posts from all initial subreddits
    const allPosts: RedditPost[] = [];

    for (const subreddit of INITIAL_SUBREDDITS) {
      try {
        const posts = await fetchHotPosts(subreddit, 25);
        allPosts.push(...posts);
      } catch (error) {
        result.errors.push(`Failed to fetch from r/${subreddit}: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }

    // Score and sort posts
    const scoredPosts = sortByScore(allPosts);

    // Import posts with score >= 50
    for (const post of scoredPosts) {
      const { score } = scoreRedditPost(post);

      if (score < 50) {
        continue;
      }

      // Check for duplicates by external_id
      const existing = await db
        .select()
        .from(trends)
        .where(eq(trends.externalId, post.id))
        .limit(1);

      if (existing.length > 0) {
        result.skipped++;
        continue;
      }

      // Create trend
      await db.insert(trends).values({
        organizationId,
        source: "reddit",
        externalId: post.id,
        title: post.title,
        summary: post.selftext || null,
        opportunityScore: score,
        metadata: {
          subreddit: post.subreddit,
          author: post.author,
          url: post.url,
          permalink: post.permalink,
          upvotes: post.ups,
          comments: post.num_comments,
          upvoteRatio: post.upvote_ratio,
        },
        discoveredAt: new Date(post.created_utc * 1000),
      });

      result.imported++;
    }

    // Revalidate paths
    revalidatePath("/trends");
    revalidatePath("/");

    return result;
  } catch (error) {
    result.errors.push(`Import failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    return result;
  }
}
