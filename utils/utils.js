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

function constructAuthors(arr) {
  if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr.join(" & ");
  } else {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length - 2) {
        result += arr[i] + " & " + arr[i + 1];
        break;
      } else if (i === arr.length - 1) {
        result += arr[i];
      } else {
        result += arr[i] + ", ";
      }
    }
    return result + ".";
  }
}

module.exports = { getBooks, constructAuthors };
