const url = "http://192.168.8.108:3333/";

// Get all
async function getBooks(stopLoading) {
  try {
    const response = await fetch(url + "books/");
    const json = await response.json();

    //console.log(json);

    return json;
  } catch (err) {
    console.error(err);
  } finally {
    stopLoading();
  }
}

module.exports = { getBooks, scrapeBook };
