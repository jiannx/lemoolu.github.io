export function loadCss(url: string, id: string) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  link.id = id;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

export function removeNode(id: string) {
  var linkNode = document.getElementById(id);
  linkNode?.parentNode?.removeChild(linkNode);
}