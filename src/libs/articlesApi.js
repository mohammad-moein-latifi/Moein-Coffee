export async function getArticles() {
  const res = await fetch('http://localhost:3000/api/articles', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  return res.json();
}
