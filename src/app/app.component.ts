import { Component } from '@angular/core';
import * as DmnEditor from "@kogito-tooling/kie-editors-standalone/dist/dmn"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dmn-wrapper';
  editor: any;

  constructor(){}

  ngOnInit() {
    const editorTab = document.getElementById("dmn-editor")!;
    this.editor = DmnEditor.open({
         container: editorTab,
         initialContent: Promise.resolve(""),
         readOnly: false,
        //  resources: new Map([
        //     [
        //           "MyIncludedModel.dmn",
        //        {
        //           contentType: "text",
        //           content: Promise.resolve("")
        //        }
        //     ]
        //  ])
      });
  }

  handleUndo(){
    this.editor.undo();
  }

  handleRedo(){
    this.editor.redo();
  }

  handleDownload() {
    this.editor.getContent().then((content: string | number | boolean) => {
      const element = window.document.createElement("a");
      element.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      element.download = "model.dmn";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
   })
  }

  handleDownloadSVG() {
    this.editor.getPreview().then((content: string | number | boolean) => {
      const element = window.document.createElement("a");
      element.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      element.download = "model.svg";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
   })
  }

}
