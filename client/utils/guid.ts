/**
 * functions are modified from Prashant Yadav
 * @https://learnersbucket.com/examples/javascript/unique-id-generator-in-javascript/#:~:text=Javascript%20does%20not%20have%20any,to%20generate%20unique%20random%20ids.
 */

/**
 * @returns unique id -- this exported function does almost the extact
 * same as the react-uuid package but without the additional bundle.
 * For this use case this function will suit this application well
 */

/** @returns random string of 4 chars */
function s4(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

/**
 *
 * @param num amount of substrings of 4 characters
 * @returns unique id
 *
 * example: guid(4) -> 9769-9c3d-2b0f-f736
 */
export default function guid(num: number): string {
  let str: string = "";
  for (let i = 0; i < num; i++) {
    str += s4();
  }
  return str.slice(0, -1);
}
