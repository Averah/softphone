export function loadPageWithStylesAndScripts(htmlFilePath, pageCallback) {
    fetch(htmlFilePath)
      .then(response => response.text())
      .then(htmlData => {
        content.innerHTML = htmlData;
        pageCallback && pageCallback()
      });
  }