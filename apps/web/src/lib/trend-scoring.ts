import { RedditPost } from "@maquina/shared";

export interface TrendScoreInput {
  upvotes: number;
  comments: number;
  createdAt: number; // Unix timestamp in seconds
  upvoteRatio: number;
}

export interface TrendScoreResult {
  score: number;
  breakdown: {
    upvoteScore: number;
    commentScore: number;
    recencyScore: number;
    engagementScore: number;
  };
}

/**
 * Calculate an opportunity score (0-100) for a Reddit post.
 * 
 * Scoring factors:
 * - Upvotes: Higher upvotes indicate more interest
 * - Comments: Higher comments indicate more engagement/discussion
 * - Recency: More recent posts are more relevant
 * - Engagement ratio: Higher ratio indicates better quality content
 */
export function calculateOpportunityScore(input: TrendScoreInput): TrendScoreResult {
  const { upvotes, comments, createdAt, upvoteRatio } = input;

  // Calculate age in hours
  const now = Math.floor(Date.now() / 1000);
  const ageInHours = (now - createdAt) / 3600;

  // Upvote score (0-25 points)
  // Logarithmic scale to avoid skew from viral posts
  const upvoteScore = Math.min(25, Math.log10(upvotes + 1) * 8);

  // Comment score (0-25 points)
  // Logarithmic scale for comments
  const commentScore = Math.min(25, Math.log10(comments + 1) * 10);

  // Recency score (0-25 points)
  // Posts within 24 hours get full score, decays over 7 days
  const ageInDays = ageInHours / 24;
  let recencyScore = 0;
  if (ageInDays <= 1) {
    recencyScore = 25;
  } else if (ageInDays <= 7) {
    recencyScore = 25 * (1 - (ageInDays - 1) / 6);
  }

  // Engagement ratio score (0-25 points)
  // Higher upvote ratio indicates better quality
  const engagementScore = upvoteRatio * 25;

  // Total score (0-100)
  const totalScore = Math.round(
    upvoteScore + commentScore + recencyScore + engagementScore
  );

  return {
    score: Math.min(100, Math.max(0, totalScore)),
    breakdown: {
      upvoteScore: Math.round(upvoteScore),
      commentScore: Math.round(commentScore),
      recencyScore: Math.round(recencyScore),
      engagementScore: Math.round(engagementScore),
    },
  };
}

/**
 * Calculate opportunity score from a Reddit post.
 */
export function scoreRedditPost(post: RedditPost): TrendScoreResult {
  return calculateOpportunityScore({
    upvotes: post.ups,
    comments: post.num_comments,
    createdAt: post.created_utc,
    upvoteRatio: post.upvote_ratio,
  });
}

/**
 * Filter posts by minimum score threshold.
 */
export function filterByScore(posts: RedditPost[], minScore: number = 50): RedditPost[] {
  return posts.filter((post) => {
    const { score } = scoreRedditPost(post);
    return score >= minScore;
  });
}

/**
 * Sort posts by opportunity score (descending).
 */
export function sortByScore(posts: RedditPost[]): RedditPost[] {
  return [...posts].sort((a, b) => {
    const scoreA = scoreRedditPost(a).score;
    const scoreB = scoreRedditPost(b).score;
    return scoreB - scoreA;
  });
}
