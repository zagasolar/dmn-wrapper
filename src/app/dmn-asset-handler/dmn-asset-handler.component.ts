import { Component, OnInit } from '@angular/core';
import * as DmnEditor from "@kogito-tooling/kie-editors-standalone/dist/dmn"
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-dmn-asset-handler',
  templateUrl: './dmn-asset-handler.component.html',
  styleUrls: ['./dmn-asset-handler.component.css']
})
export class DmnAssetHandlerComponent implements OnInit {
  editor: any;
  artifactId?: any;
  dmnModelName?: any;
  dmnDiagram?: any; 

  constructor(private apiCall: ApiCallsService) { }

  ngOnInit(): void {
    this.artifactId = localStorage.getItem("artifactId");
    this.dmnModelName = localStorage.getItem("dmnModelName");
    const editorTab = document.getElementById("dmn-editor")!;
    var payload = {
      artifact: this.artifactId,
      dmnModel: this.dmnModelName
    }
    this.editor = DmnEditor.open({
         container: editorTab,
         initialContent: fetch("http://localhost:3000/getDmnFile", {
          method: 'POST',
          headers: {
            'Accept': 'application.json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)}).then(content => content.text()),
          readOnly: false,
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
      console.log(content);
      console.log(element);
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

  handleSave() {
    this.editor.getContent().then((content: any) => {
      var payload = {
        dmnData: content,
        artifactId: this.artifactId,
        dmnModelName: this.dmnModelName
      }
      console.log(payload);
      this.apiCall.saveFile(payload).subscribe((res:any) => {
        if(res.result == "success") {
            alert("File saved successfully");
        }
        else {
          alert("Failed to save file");
        }
      })
    });
    this.editor.markAsSaved();
  }

  buildProject() {
    var payload = {
      artifactId:this.artifactId
    }
    this.apiCall.buildProject(payload).subscribe((res:any) => {
      if(res.result == "success"){
        alert("Project Build Successfully");
      }
      else {
        alert("Project Build Failure");
      }
    })
  }
  

}
