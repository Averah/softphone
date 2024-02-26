export function loadPageWithStylesAndScripts(htmlFilePath, pageCallback) {
  return fetch(htmlFilePath)
    .then(response => response.text())
    .then(htmlData => {
      content.innerHTML = htmlData;

      if (pageCallback) {
        return pageCallback();
      }
    });
}