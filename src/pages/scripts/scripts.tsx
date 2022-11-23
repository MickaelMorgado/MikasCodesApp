import { Enum_scriptsCategory } from "components/accordion/accordionItem"
import AutoUpdateSubmodules from "./generatedScripts/autoUpdateSubmodules"
import GeneratedScriptBase from "./generatedScripts/generatedScriptBase"
import { GeneratedScriptBase2 } from "./generatedScripts/generatedScriptBase2"
import GitStash from "./generatedScripts/gitStash"
import NewStyledComponent from "./generatedScripts/newStyledComponent"

import * as GS from "../globalStyles";

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
            callBack: () => {}
          },
          {
            name: 'show message',
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
            callBack: () => {}
          },
          {
            name: 'add untracked files',
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
            Simple snippet to create styled component for <GS.React>react</GS.React> your styles.ts file.
          </>
        )
      }
      initialFormFields={
        [
          {
            name: 'component Name',
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
]

export default scriptsCodes