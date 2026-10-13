import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'thomasveit89'
const MAX_COMMITS = 3
// Look at a few more push events than we need, so merge commits or
// private/deleted repos can be skipped without leaving empty slots.
const MAX_PUSH_EVENTS = 6

// Optional. Unauthenticated requests are limited to 60 per hour per IP,
// which can be tight on shared hosting IPs.
const GITHUB_HEADERS: HeadersInit = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
}

export type CommitData = {
  sha: string
  message: string
  repo: string
  repoShort: string
  repoUrl: string
  date: string
}

type PushEvent = {
  type: string
  created_at: string
  repo: { name: string }
  // GitHub no longer includes `commits` in push event payloads,
  // so only the head sha of the push is available.
  payload: { head?: string }
}

type CommitResponse = {
  commit: { message: string }
}

async function fetchCommit(event: PushEvent): Promise<CommitData | null> {
  const repoName = event.repo.name
  const head = event.payload.head
  if (!head) return null

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repoName}/commits/${head}`,
      // A commit never changes, so it can be cached for a long time.
      { next: { revalidate: 86400 }, headers: GITHUB_HEADERS }
    )
    if (!res.ok) return null

    const data: CommitResponse = await res.json()
    const message = data.commit.message.split('\n')[0]
    if (message.startsWith('Merge')) return null

    return {
      sha: head.slice(0, 7),
      message,
      repo: repoName,
      repoShort: repoName.split('/')[1] ?? repoName,
      repoUrl: `https://github.com/${repoName}`,
      date: event.created_at,
    }
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const eventsRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      { next: { revalidate: 300 }, headers: GITHUB_HEADERS }
    )

    if (!eventsRes.ok) {
      return NextResponse.json({ commits: [] })
    }

    const events: PushEvent[] = await eventsRes.json()

    const pushEvents = events
      .filter((e) => e.type === 'PushEvent' && e.payload.head)
      .slice(0, MAX_PUSH_EVENTS)

    const results = await Promise.all(pushEvents.map(fetchCommit))

    // Events are newest first; Promise.all keeps that order.
    const seen = new Set<string>()
    const commits: CommitData[] = []
    for (const commit of results) {
      if (!commit || seen.has(commit.sha)) continue
      seen.add(commit.sha)
      commits.push(commit)
      if (commits.length >= MAX_COMMITS) break
    }

    return NextResponse.json({ commits })
  } catch {
    return NextResponse.json({ commits: [] })
  }
}
