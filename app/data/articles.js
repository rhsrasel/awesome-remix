export const getArticles = async (id) => {
  let apiUrl = "https://jsonplaceholder.typicode.com/posts";
  if (id && id != "") {
    apiUrl = `https://jsonplaceholder.typicode.com/posts?id=${id}`;
  }
  const res = await fetch(apiUrl);
  const data = await res.json();

  const prunedData = data.map((record) => {
    return {
      id: record.id,
      title: record.title,
      body: record.body,
      authorId: record.userId,
    };
  });
  return prunedData;
};
