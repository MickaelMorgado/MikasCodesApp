import React from 'react';
import { Enum_scriptsCategory } from 'components/accordion/accordionItem';
import GeneratedScriptBase from '../../components/generatedScripts/generatedScriptBase';

import * as GS from '../globalStyles';
import {
  Enum_MyFormFieldTransformationType,
  Enum_MyFormFieldType,
  IMyFormField,
} from 'components/myForm/field';

export interface IScriptItem {
  title: string;
  category: Enum_scriptsCategory;
  file?: string;
  component?: React.ReactElement;
  script?: string;
}

const scriptPath = './scripts/codeFiles';

export const filePath = (scriptName: string) => `${scriptPath}/${scriptName}`;

export const scriptsCodes: IScriptItem[] = [
  {
    title: 'Random',
    category: Enum_scriptsCategory.js,
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            This is an example of the{' '}
            <GS.Terminal>'GeneratedScriptBase'</GS.Terminal> functionalities.
          </>
        )}
        initialFormFields={[
          {
            name: 'message',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'show message',
            formFieldType: Enum_MyFormFieldType.checkBox,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => `${
          formFields[1].value == 'true'
            ? formFields[0].value
            : 'no message to display'
        }
      `}
      />
    ),
  },
  {
    title: 'Switch statement',
    category: Enum_scriptsCategory.js,
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            This is an example of a <GS.Js>switch</GS.Js> statement.
          </>
        )}
        initialFormFields={[
          {
            name: 'Switch parameter',
            formFieldType: Enum_MyFormFieldType.input,
            transformationType: Enum_MyFormFieldTransformationType.noSpaces,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) =>
          `switch (${formFields[0].value}) {
  case matchingValue:
    // any code
    break;
  default:
    // any code
    break;
}
          `
        }
      />
    ),
  },
  {
    title: 'Form validation script',
    category: Enum_scriptsCategory.browserDevTool,
    component: (
      <GeneratedScriptBase
        description={() => (
          <pre>
            This is an example of a{' '}
            <GS.BrowserDevTool>browser dev tool</GS.BrowserDevTool> script to
            validate any form and scroll to field if errors.
            <br />
            <br />
            Example of usage: <br />
            <br />
            {`  myForm = new formWithValidation()
  myForm.onValidated(myForm.scrollToIt())
`}
          </pre>
        )}
        initialFormFields={[]}
        renderedScript={(
          formFields: IMyFormField[]
        ) => `class formWithValidation {
    constructor() {
        this.form = document.querySelector("#program-form-4")
        this.hasErrors = false
    }

    validate() {
        document
            .querySelectorAll("form input[type='text'], form textarea:nth-child(1)")
            .forEach(
                item => {
                    if (item.value.length == 0) {
                        console.log("failed at: ", item)
                        this.hasErrors = true
                    }
                }
            )
    }

    // TODO: need to make as an event
    onValidated() {
        customFunction => { customFunction() }
    }

    get position() {
        return this.form.getBoundingClientRect()
    }

    scrollToIt(
        speed = 2000,
        offset = 0
    ) {
        $('html, body').animate({
            scrollTop: this.position.top - offset
        }, speed);
    }
}


myForm = new formWithValidation()
// myForm.onValidated(myForm.scrollToIt())`}
      />
    ),
  },
  {
    title: 'Stash',
    category: Enum_scriptsCategory.git,
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            git stash save "stashName"
            <br />
            git stash --include-untracked
            <br />
            git stash -u
            <br />
            git stash save -u "stashName"
          </>
        )}
        initialFormFields={[
          {
            name: 'stash name',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'add untracked files',
            formFieldType: Enum_MyFormFieldType.checkBox,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) =>
          `${
            formFields[1].value == 'true'
              ? `git stash save -u \"${formFields[0].value}\"`
              : `git stash save \"${formFields[0].value}\"`
          }`
        }
      />
    ),
  },
  {
    title: 'Rename branch',
    category: Enum_scriptsCategory.git,
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            git branch -m old_name new_name
            <br />
            git push origin -u new_name
            <br />
            git push origin --delete old_name
          </>
        )}
        initialFormFields={[
          {
            name: 'old branch name',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'new branch name',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'same for remote branch',
            formFieldType: Enum_MyFormFieldType.checkBox,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) =>
          `
git branch -m ${formFields[0].value} ${formFields[1].value}
${
  formFields[2].value == 'true'
    ? `git push origin -u ${formFields[1].value}
git push origin --delete ${formFields[0].value}`
    : ``
}
          `
        }
      />
    ),
  },
  {
    title: 'Auto update submodules',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            This script allows you to update your project gitmodules with
            correct branches in case of '--remote' doesnt work. <br />
            Paste any project .gitmodules content and copy-paste the following
            generated code into your project <GS.Terminal>
              terminal
            </GS.Terminal>{' '}
            to automatically update submodule with correct remote branches.
          </>
        )}
        initialFormFields={[
          {
            name: 'gitmodules content',
            formFieldType: Enum_MyFormFieldType.textArea,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          const fileContent = formFields[0].value || '';
          let resultedScript = '';
          fileContent.split('[submodule ').forEach((i) => {
            if (i != '') {
              var path = '';
              var branch = '';
              var submoduleObject = i.split('"]')[1];
              if (submoduleObject) {
                var path = submoduleObject
                  .split('path')[1]
                  .split('\n')[0]
                  .split('= ')[1]
                  .split(' ')[0];
                var url = submoduleObject
                  .split('url')[1]
                  .split('\n')[0]
                  .split('= ')[1];
                var branch =
                  submoduleObject.split('branch')[1] == undefined
                    ? 'master'
                    : submoduleObject
                        .split('branch')[1]
                        .split('\n')[0]
                        .split('= ')[1];
              }
              resultedScript =
                resultedScript +
                `cd ${path}
git checkout ${branch}
git pull origin ${branch}
cd ../

`;
            }
          });

          return `${resultedScript}`;
        }}
      />
    ),
  },
  {
    title: 'Import Postgres DB',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => <>Manually import postgres db</>}
        initialFormFields={[
          {
            name: 'Downloaded DB Name',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'Docker Database container ID',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'Project Database Name (settings.py)',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'Project Database User (settings.py)',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'Project Database Password (settings.py)',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          let resultedScript = `docker cp '/home/lenovo2019/Documents/dumps/${formFields[0].value}.sql' ${formFields[1].value}:tmp/dump.sql

docker exec -ti ${formFields[1].value} /bin/bash

psql -U ${formFields[3].value} -h localhost -d ${formFields[2].value} -f /tmp/dump.sql`;

          return `${resultedScript}`;
        }}
      />
    ),
  },
  {
    title: 'New styled component',
    category: Enum_scriptsCategory.react,
    // file: filePath('autoUpdateSubmodules.js'),
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            Simple snippet to create a styled component for your styles.ts file.
          </>
        )}
        initialFormFields={[
          {
            name: 'component Name',
            formFieldType: Enum_MyFormFieldType.input,
            transformationType: Enum_MyFormFieldTransformationType.noSpaces,
            tooltip: 'Dont use spaces',
            callback: () => {},
          },
        ]}
        renderedScript={(
          formFields: IMyFormField[]
        ) => `import styled from "styled-components";

export const ${formFields[0].value} = styled.div<\{  \}>\`\`;`}
      />
    ),
  },
  {
    title: 'New react component',
    category: Enum_scriptsCategory.react,
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            Simple snippet to create a <GS.React>react</GS.React> component.
          </>
        )}
        initialFormFields={[
          {
            name: 'component Name',
            formFieldType: Enum_MyFormFieldType.input,
            transformationType: Enum_MyFormFieldTransformationType.noSpaces,
            tooltip: 'Dont use spaces',
            callback: () => {},
          },
        ]}
        renderedScript={(
          formFields: IMyFormField[]
        ) => `import React from 'react';

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
      />
    ),
  },
  {
    title: 'Basic Rest API request',
    category: Enum_scriptsCategory.js,
    component: (
      <GeneratedScriptBase
        description={() => <>A basic Rest API code snippet</>}
        initialFormFields={[
          {
            name: 'Endpoint URL',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'Type',
            formFieldType: Enum_MyFormFieldType.select,
            options: {
              XMLHttpRequest: {
                label: 'XMLHttpRequest',
                value: 'XMLHttpRequest',
              },
              GraphQL: {
                label: 'GraphQL',
                value: 'GraphQL',
              },
            },
            defaultValue: 'XMLHttpRequest',
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) =>
          `${formFields[1].value + ': ' + formFields[0].value}`
        }
      />
    ),
  },
  {
    title: 'HTML to MJML converter',
    category: Enum_scriptsCategory.js,
    component: (
      <GeneratedScriptBase
        description={() => <>WIP</>}
        initialFormFields={[
          {
            name: 'HTML',
            formFieldType: Enum_MyFormFieldType.textArea,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          let incomingValue = formFields[0].value ? formFields[0].value : '';

          const replaceTags = (
            incomingVal: any,
            originalTag: string,
            replaceTag: string
          ) => {
            let result = incomingVal.replaceAll(originalTag, replaceTag);
            return result;
          };

          incomingValue = replaceTags(incomingValue, '<div', '<mj-wrapper');
          incomingValue = replaceTags(incomingValue, '</div>', '</mj-wrapper>');

          incomingValue = replaceTags(incomingValue, '<p', '<mj-text');
          incomingValue = replaceTags(incomingValue, '</p>', '</mj-text>');

          incomingValue = replaceTags(incomingValue, '<img', '<mj-image');

          const mjmlResult = incomingValue;

          return `
        <mjml>
          <mj-body>
            ${mjmlResult}
          </mj-body>
        </mjml>
        `;
        }}
      />
    ),
  },
  {
    title: 'CSS Reorder',
    category: Enum_scriptsCategory.styles,
    // file: filePath('autoUpdateSubmodules.js'),
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            WIP: Paste your css properties to generate a reordered version of it
            based on this guideline: place guideline here
          </>
        )}
        initialFormFields={[
          {
            name: 'CSS properties',
            formFieldType: Enum_MyFormFieldType.textArea,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          let generatedCode = `${formFields[0].value}`;

          function cssSortValue(cssProp: string) {
            switch (cssProp.replaceAll(' ', '')) {
              case 'padding':
                return 1;
              default:
                return 0;
            }
          }

          generatedCode
            .split(';')
            .map((item) => console.log(cssSortValue(item.split(':')[0])));

          generatedCode = `${formFields[0].value}`;

          return `${generatedCode}`;
        }}
      />
    ),
  },
  {
    title: 'Windows Bash',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => <>WIP: Some personal useful bash scripts</>}
        initialFormFields={[
          {
            name: 'platform upload',
            formFieldType: Enum_MyFormFieldType.select,
            options: {
              steamUpload: { label: 'Upload to Steam', value: 'steam' },
              ultraUpload: { label: 'Upload to Ultra', value: 'ultra' },
            },
            callback: () => {},
          },
          {
            name: 'folder 1',
            formFieldType: Enum_MyFormFieldType.file,
            transformationType: Enum_MyFormFieldTransformationType.path,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          switch (formFields[0].value) {
            case 'ultra':
              return `ultra: ${formFields[1].value}`;
              break;
            default:
              return `steam`;
              break;
          }
        }}
      />
    ),
  },
  {
    title: 'Project Setup',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => <>WIP: Some personal useful bash scripts</>}
        initialFormFields={[
          {
            name: 'ssh clone url',
            formFieldType: Enum_MyFormFieldType.input,
            transformationType: Enum_MyFormFieldTransformationType.noSpaces,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          return !formFields[0].value
            ? ''
            : `cd 
          cd dengun 
          git clone --recurse-submodules ${formFields[0].value}
          cd ${formFields[0].value!.split('/')[1]!.split('.')[0]}
          code .

            IN VSCODE:

  (before runing make sure of:)
    @sha256:e132c504a791d70d31453d187b23160cc96e4e3350ce7dbee82b6feeabc18eec in python.dockerfile
    add --force-yes to node.dockerfile: RUN apt-get install -y --force-yes libnotify-bin

  (This part is not necessary anymore to do due to earlier clone)
    IN TERMINAL 1:

      git submodule init
      git submodule update --remote

    IN TERMINAL 2:

      MikasApp submodule for each branch

  IN TERMINAL 1:
  
    docker compose build
    docker compose up

  IN TERMINAL 2:

    docker compose exec web python manage.py migrate
    docker compose exec web python manage.py createsuperuser

    docker compose restart web

  IN BROWSER:

    http://localhost:8000/admin/cms/page/
          `;
        }}
      />
    ),
  },
  {
    title: 'Translate Command',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => <>WIP: Some personal useful bash scripts</>}
        initialFormFields={[
          {
            name: 'dengun_cms_package',
            formFieldType: Enum_MyFormFieldType.checkBox,
            callback: () => {},
          },
          {
            name: 'dengun_django_myforms',
            formFieldType: Enum_MyFormFieldType.checkBox,
            callback: () => {},
          },
          {
            name: 'dengun_django_admin_relation',
            formFieldType: Enum_MyFormFieldType.checkBox,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          return `docker compose exec web python manage.py makemessages
          ${formFields[0].value ? `-i dengun_cms_package` : ``}
          ${formFields[1].value ? `-i dengun_django_myforms` : ``}
          ${formFields[2].value ? `-i dengun_django_admin_relation` : ``}
          `;
        }}
      />
    ),
  },
];

export default scriptsCodes;
