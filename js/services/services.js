async function getJsonFromUrl(url) {
  // Get запрос на сервер и получение данный в виде JSON

  let response = await fetch(url);

  return await response.json();
  
}

export { getJsonFromUrl };
