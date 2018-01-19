export class AppProjectBase{

  constructor(){
    this.removeCustomStyleAndScripts();
  }

  addDependencies(){

  }

  addScriptTagToElementDOM(pathToScript: string): void {
    let script: HTMLScriptElement = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', pathToScript);
    script.setAttribute('class', 'customScript');
    let docBody: HTMLElement = document.getElementById('appBody');
    docBody.appendChild(script);
  }

  addLinkTagToElementDOM(pathToStyle: string): void {
    let styles: HTMLLinkElement = document.createElement('link');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('href', pathToStyle);
    styles.setAttribute('class', 'customStyle');
    let docHead: HTMLElement = document.getElementById('appHead');
    docHead.appendChild(styles);
  }

  removeCustomStyleAndScripts() {
    let customScripts = document.getElementsByClassName('customScript');
    let docBody = document.getElementById('appBody');
    for (let i = 0; i < customScripts.length; i++) {
      docBody.removeChild(customScripts.item(i));
    }
    let customStyles = document.getElementsByClassName('customStyle');
    let docHead = document.getElementById('appHead');
    for (let i = 0; i < customStyles.length; i++) {
      docHead.removeChild(customStyles.item(i));
    }
  }


}
