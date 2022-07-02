export const navigateOutside = (path: string) => {
  window.history.pushState(null, "/", path);
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
};
