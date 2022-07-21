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

export function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function storeUser(user) {
  localStorage.setItem("codebox-user", JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem("codebox-user");
  if (user) return JSON.parse(user);
  return null;
}
