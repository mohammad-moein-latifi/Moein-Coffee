export async function getArticles() {
  const API_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/articles`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  return res.json();
}
