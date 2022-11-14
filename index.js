const express = require("express");
var shell = require("shelljs");
var fs = require("fs");
const app = express();
const port = 3000 || process.env.PORT;
const ip_address = "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Crossorgin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

//Port Listening Server
app.listen(port, ip_address, () => {
  console.log(`server is running on port ${port}`);
});

app.post("/createProject", (req, res) => {
  var groupId = req.body.groupId;
  var artifactId = req.body.artifactId;
  var version = req.body.version;
  var dmnModelName = req.body.dmnModelName;

  //Create Project
  //   shell.cd(`${__dirname}\\mvnProject`);
  if (
    shell.find("mavenProject", (res) => {
      if (res == 1) {
        shell.mkdir("mavenProject");
      }
    })
  )
    shell.cd("mavenProject");
  shell.exec(
    `mvn archetype:generate -DarchetypeGroupId=org.kie -DarchetypeArtifactId=kie-drools-dmn-archetype -DarchetypeVersion=8.30.0.Final -DgroupId=${groupId} -DartifactId=${artifactId} -Dversion=${version} -DinteractiveMode=false.`,
    (err) => {
      console.log(err);

      if (err == 0) {
        shell.rm(`${artifactId}/src/main/resources/Traffic Violation.dmn`);
        shell.rm(
          `${artifactId}/src/test/java/com/example/ScenarioJunitActivatorTest.java`
        );
        shell.rm(
          `${artifactId}/src/test/java/com/example\\TrafficViolationTest.java`
        );
        shell.rm("-fR", `${artifactId}/src/test/java/utils`);
        shell.rm(`${artifactId}/src/test/resources/logback-test.xml`);
        shell.rm(
          `${artifactId}/src/test/resources/TrafficViolationTest.scesim`
        );
        shell.touch(`${artifactId}/src/main/resources/${dmnModelName}.dmn`);
        res.send({ result: "success" });
      } else {
        res.send({ result: "Failed to create" });
      }
    }
  );
});

app.post("/getDmnFile", (req, res) => {
  var artifactId = req.body.artifact;
  var dmnModelName = req.body.dmnModel;
  console.log(artifactId);
  console.log(dmnModelName);
  shell.cd("mavenProject");
  console.log(shell.pwd());
  fs.readFile(
    `${artifactId}/src/main/resources/${dmnModelName}.dmn`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.send("failed to read");
      }
      // console.log(JSON.stringify(data), "Data");
      res.send(data);
    }
  );
});

app.post("/saveFile", (req, res) => {
  var data = req.body.dmnData;
  console.log(data);
  var artifactId = req.body.artifactId;
  var dmnModelName = req.body.dmnModelName;
  // var blob = new Blob([data]);
  shell.cd("mavenProject");
  fs.writeFile(
    `${artifactId}/src/main/resources/${dmnModelName}.dmn`,
    data,
    (err) => {
      if (err) {
        res.send({ result: "failed" });
      } else {
        res.send({ result: "success" });
      }
    }
  );
});

app.post("/buildProject", (req, res) => {
  var artifactId = req.body.artifactId;
  shell.cd("mavenProject");
  shell.cd(`${artifactId}`);
  shell.exec("mvn clean install", (err) => {
    if (err) {
      res.send({ result: "build failed" });
    } else {
      res.send({ result: "success" });
    }
  });
});
