import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-initializer',
  templateUrl: './project-initializer.component.html',
  styleUrls: ['./project-initializer.component.css']
})
export class ProjectInitializerComponent implements OnInit {

  constructor(private apiCall: ApiCallsService,private route: Router) { }

  ngOnInit(): void {
  }

  createProject() {
    var payload = {
      "groupId" : "com.example",
      "artifactId": "dmnproject",
      "version": "1.0.0-SNAPSHOT",
      "dmnModelName": "sample"
    };
    this.apiCall.createProject(payload).subscribe((res:any) => {
        if(res.result == "success") {
          localStorage.setItem("artifactId", payload.artifactId);
          localStorage.setItem("dmnModelName", payload.dmnModelName);
          this.route.navigate(["/dmnasset"]);
        }
        else {
          alert("Project creation failed");
        }
    });
  }

}
