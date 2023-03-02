// Take the authors array and construct a readable string with spaces, commas and an ampersand.
export default function constructAuthors(arr) {
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
