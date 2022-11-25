import { Enum_scriptsCategory } from "components/accordion/accordionItem"
import GeneratedScriptBase from "../../components/generatedScripts/generatedScriptBase"

import * as GS from "../globalStyles";
import { Enum_MyFormFieldType } from "components/myForm/field";

export interface IScriptItem {
  title: string,
  category: Enum_scriptsCategory,
  file?: string,
  component?: React.ReactElement,
  script?: string
}

const scriptPath = './scripts/codeFiles'

export const filePath = (scriptName: string) =>  `${scriptPath}/${scriptName}`

export const scriptsCodes: IScriptItem[] = [
  {
    title: 'Random',
    category: Enum_scriptsCategory.js,
    component: <GeneratedScriptBase 
      description={
        () => (
          <>
            This is an example of the <GS.Terminal>'GeneratedScriptBase'</GS.Terminal> functionalities.
          </>
        )
      }
      initialFormFields={
        [
          {
            name: 'message',
            formFieldType: Enum_MyFormFieldType.input,
            callBack: () => {}
          },
          {
            name: 'show message',
            formFieldType: Enum_MyFormFieldType.checkBox,
            callBack: () => {}
          }
        ]
      }
      renderedScript={(formFields) => (
        <>
          {
            formFields[1].value == 'true' 
              ? formFields[0].value
              : 'no message to display'
          }
        </>
      )}
    />
  },
  {
    title: 'Stash',
    category: Enum_scriptsCategory.git,
    component: <GeneratedScriptBase 
      description={
        () => (
          <>
            git stash save "stashName"<br />
            git stash --include-untracked<br />
            git stash -u<br />
            git stash save -u "stashName"
          </>
        )
      }
      initialFormFields={
        [
          {
            name: 'stash name',
            formFieldType: Enum_MyFormFieldType.input,
            callBack: () => {}
          },
          {
            name: 'add untracked files',
            formFieldType: Enum_MyFormFieldType.checkBox,
            callBack: () => {}
          }
        ]
      }
      renderedScript={(formFields) => (
        <>
          {formFields[1].value == "true"
            ? `git stash save -u \"${formFields[0].value}\"`
            : `git stash save \"${formFields[0].value}\"`
          }
        </>
      )}
    />
  },
  {
    title: 'Auto update submodules',
    category: Enum_scriptsCategory.terminal,
    component: <GeneratedScriptBase 
      description={
        () => (
          <>
            This script allows you to update your project gitmodules with correct branches in case of '--remote' doesnt work. <br />
            Paste any project .gitmodules content and copy-paste the following generated code into your project <GS.Terminal>terminal</GS.Terminal> to automatically update submodule with correct remote branches.
          </>
        )
      }
      initialFormFields={
        [
          {
            name: 'gitmodules content',
            formFieldType: Enum_MyFormFieldType.input,
            callBack: () => {}
          }
        ]
      }
      renderedScript={(formFields) => {
        const fileContent = formFields[0].value || ''
        let resultedScript = ''
        fileContent
          .split("[submodule ")
          .forEach(i => {
            if (i != '') {
              var path = ''
              var branch = ''
              var submoduleObject = i.split("\"]")[1]
              if (submoduleObject) {
                var path = submoduleObject.split('path')[1].split('\n')[0].split("= ")[1].split(" ")[0]
                var url = submoduleObject.split('url')[1].split('\n')[0].split("= ")[1]
                var branch = submoduleObject.split('branch')[1].split('\n')[0].split("= ")[1] == undefined ? "master" : submoduleObject.split('branch')[1].split('\n')[0].split("= ")[1] 
              }
              resultedScript = resultedScript + `cd ${path}
git checkout ${branch}
git pull origin ${branch}
cd ../

`}
          })

        return (
          <>
            {`${resultedScript}`}
          </>
        )
      }}
    />
  },
  {
    title: 'New styled component',
    category: Enum_scriptsCategory.react,
    // file: filePath('autoUpdateSubmodules.js'),
    component: <GeneratedScriptBase 
      description={
        () => (
          <>
            Simple snippet to create a styled component for your styles.ts file.
          </>
        )
      }
      videoUrl='https://awevideo.s3.amazonaws.com/video-12359094-10425607fe783ae369a21e929b59ec8d.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20221125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221125T140450Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3DSelect%2520Page%2520to%2520change%2520%257C%2520Admin.mp4&X-Amz-Signature=4214e6c0269bf724916cae831a94d0ea572d9901bc7cf87aa6cfc1b5967928ba'
      initialFormFields={
        [
          {
            name: 'component Name',
            formFieldType: Enum_MyFormFieldType.input,
            tooltip: 'Dont use spaces',
            callBack: () => {}
          }
        ]
      }
      renderedScript={(formFields) => (
        <>
          {`import styled from "styled-components";
          
export const ${formFields[0].value} = styled.div<\{  \}>\`\`;`}
        </>
      )}
    />
  },
  {
    title: 'New react component',
    category: Enum_scriptsCategory.react,
    component: <GeneratedScriptBase 
      description={() => (<>Simple snippet to create a <GS.React>react</GS.React> component.</>)}
      initialFormFields={
        [
          {
            name: 'component Name',
            formFieldType: Enum_MyFormFieldType.input,
            tooltip: 'Dont use spaces',
            callBack: () => {}
          }
        ]
      }
      renderedScript={(formFields) => (
        <>
          {`import React from 'react';

export interface I${formFields[0].value}Props {
  id: string;
}

export const ${formFields[0].value} = ({ id }: I${formFields[0].value}Props) => {
  return (
    <>

    </>
  );
};

export default ${formFields[0].value};
`}
        </>
      )}
    />
  },
]

export default scriptsCodes