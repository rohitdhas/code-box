export function getCookieVal(cookie, key) {
  const strs = cookie.split(" ");
  let token = null;
  strs.forEach((item) => {
    if (item.split("=")[0] === key) {
      token = item.split("=")[1];
    }
  });
  return token;
}
