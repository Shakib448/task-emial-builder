import React, { useRef } from "react";
import EmailEditor from "react-email-editor";
import sample1 from "./sample.json";
import styled from "styled-components";
import sample2 from "../../Templates/Starter Template.json";
import sample3 from "../../Templates/{Company Name} + {Your Company}.json";
import sample4 from "../../Templates/Template framework by twinweseo.json";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  flex: 1;
  background-color: rgb(248, 248, 255);
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;
  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }
  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`;

const Builder = () => {
  const emailEditorRef = useRef(null);

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log("saveDesign", design);
      alert("Design JSON has been logged in your developer console.");
    });
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
      console.log("exportDesign", design);
      alert("Output HTML has been logged in your developer console.");
    });
  };

  const onDesignLoad = (data) => {
    console.log("onDesignLoad", data);
  };

  const loadTemplate = (id) => {
    emailEditorRef.current.editor.addEventListener(
      "onDesignLoad",
      onDesignLoad
    );
    if (id === 1) {
      emailEditorRef.current.editor.loadDesign(sample1);
    }
    if (id === 2) {
      emailEditorRef.current.editor.loadDesign(sample2.data);
    }
    if (id === 3) {
      emailEditorRef.current.editor.loadDesign(sample3.data);
    }
    if (id === 4) {
      emailEditorRef.current.editor.loadDesign(sample4.data);
    }
  };

  return (
    <Container>
      <Bar>
        <h1>React Email Editor </h1>

        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
      </Bar>

      <EmailEditor
        ref={emailEditorRef}
        onLoad={loadTemplate}
        appearance={{
          theme: "dark",
        }}
        projectId={1071}
        minHeight="100vh"
        options={{
          customJS: [
            window.location.protocol +
              "//" +
              window.location.host +
              "/custom.js",
          ],
        }}
      />
      <div id="templates">
        <div className="template" onClick={() => loadTemplate(1)}>
          <img
            src="https://api.unlayer.com/v1/editor/11721/templates/28497/thumbnail?t=1613096809146"
            alt="json"
          />
        </div>

        <div className="template" onClick={() => loadTemplate(2)}>
          <img
            src="https://api.unlayer.com/v1/editor/11721/templates/28496/thumbnail?t=1613096676088"
            alt="json"
          />
        </div>

        <div className="template" onClick={() => loadTemplate(3)}>
          <img src="https://i.ibb.co/sgLJsFH/Screenshot-1.png" alt="sjon" />
        </div>
        <div className="template" onClick={() => loadTemplate(4)}>
          <img src="https://i.ibb.co/QpBZXty/Screenshot-2.png" alt="sjon" />
        </div>
      </div>
    </Container>
  );
};

export default Builder;
