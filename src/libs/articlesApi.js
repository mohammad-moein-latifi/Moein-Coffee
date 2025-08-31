export async function getArticles() {
 const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


  const res = await fetch(`${API_URL}/api/articles`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  return res.json();
}
