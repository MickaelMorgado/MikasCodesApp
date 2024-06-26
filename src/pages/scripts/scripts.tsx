import React from 'react';
import { Enum_scriptsCategory } from 'components/accordion/accordionItem';
import GeneratedScriptBase from '../../components/generatedScripts/generatedScriptBase';

import * as GS from '../globalStyles';
import {
  Enum_MyFormFieldTransformationType,
  Enum_MyFormFieldType,
  IMyFormField,
} from 'components/myForm/field';
import { Enum_StorageSlot, getLocalStorageItem, isValid } from 'utils';
import {
  Enum_SettingOption,
  getPartialFromSettingsVariable,
  getSettings,
} from 'pages/settings';

export interface IScriptItem {
  title: string;
  category: Enum_scriptsCategory;
  file?: string;
  component?: React.ReactElement;
  script?: string;
}

const scriptPath = './scripts/codeFiles';

export const filePath = (scriptName: string) => `${scriptPath}/${scriptName}`;

const dockerCommand = `${getPartialFromSettingsVariable(
  Enum_SettingOption.DOCKERCOMPOSE,
)}`;

const projectFolder = `${getSettings(Enum_SettingOption.PROJECTSFOLDER)}`;

export const scriptsCodes: IScriptItem[] = [
  /*
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
              ? formFields[0].value +
                  `${getSettings(Enum_SettingOption.PROJECTSFOLDER)}` ??
                'projects_folder'
              : 'no message to display'
          }
        `}
        />
      ),
    },
  */
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
          formFields: IMyFormField[],
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
            defaultValue: 'project_db',
            callback: () => {},
          },
          {
            name: 'Docker Database container ID',
            formFieldType: Enum_MyFormFieldType.input,
            defaultValue: 'postgres',
            tooltip: `use ${getPartialFromSettingsVariable(
              Enum_SettingOption.DOCKERCOMPOSE,
            )} ps to check for any potencial database related container`,
            callback: () => {},
          },
          {
            name: 'Project Database Name (settings.py / python.env)',
            formFieldType: Enum_MyFormFieldType.input,
            defaultValue: 'mysql',
            tooltip:
              'You might find it in any python.env file or check for docker-compose.yml for further configuration files',
            callback: () => {},
          },
          {
            name: 'Project Database User (settings.py / python.env)',
            formFieldType: Enum_MyFormFieldType.input,
            defaultValue: 'root',
            callback: () => {},
          },
          {
            name: 'Project Database Password (settings.py / python.env)',
            formFieldType: Enum_MyFormFieldType.input,
            defaultValue: 'qwerty',
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          let resultedScript = `docker cp '/home/${getSettings(
            Enum_SettingOption.PCNAME,
          )}/Documents/dumps/${
            isValid(formFields[0].value)
              ? formFields[0].value
              : formFields[0].defaultValue
          }.sql' ${
            isValid(formFields[1].value)
              ? formFields[1].value
              : formFields[1].defaultValue
          }:tmp/dump.sql

docker exec -ti ${
            isValid(formFields[1].value)
              ? formFields[1].value
              : formFields[1].defaultValue
          } /bin/bash

psql -U ${
            isValid(formFields[3].value)
              ? formFields[3].value
              : formFields[3].defaultValue ?? 'root'
          } -h localhost -d ${
            isValid(formFields[2].value)
              ? formFields[2].value
              : formFields[2].defaultValue ?? 'mysql'
          } -f /tmp/dump.sql`;

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
            transformationType: Enum_MyFormFieldTransformationType.name,
            tooltip: 'Dont use spaces',
            defaultValue: 'MyComponent',
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          const field0 = isValid(formFields[0].value)
            ? formFields[0].value
            : formFields[0].defaultValue;

          return `import styled from "styled-components";

export const ${field0} = styled.div<\{  \}>\`\`;`;
        }}
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
            transformationType: Enum_MyFormFieldTransformationType.name,
            tooltip: 'Dont use spaces',
            defaultValue: 'MyComponent',
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          const field0 = isValid(formFields[0].value)
            ? formFields[0].value
            : formFields[0].defaultValue;

          return `import React from 'react';

export interface I${field0}Props {}
  id: string;
}

export const ${field0} = ({ id }: I${field0}Props) => {
  return (
    <>

    </>
  );
};

export default ${field0};
`;
        }}
      />
    ),
  },
  {
    title: 'Basic Rest API request',
    category: Enum_scriptsCategory.js,
    component: (
      <GeneratedScriptBase
        description={() => <>WIP: A basic Rest API code snippet</>}
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
  /*
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
  */
  {
    title: 'Project Setup',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => <>WIP: Some commands to setup a project</>}
        initialFormFields={[
          {
            name: 'ssh clone url',
            formFieldType: Enum_MyFormFieldType.input,
            transformationType: Enum_MyFormFieldTransformationType.noSpaces,
            defaultValue: 'git@github.com:MickaelMorgado/MikasCodesApp.git',
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          var sshUrl = isValid(formFields[0].value)
            ? formFields[0].value
            : formFields[0].defaultValue;

          if (sshUrl != null) {
            if (sshUrl.indexOf('.git') > 0) {
              var projectName = sshUrl.split('/')[1].split('.git')[0];

              return `
  cd
  cd dengun
  git clone --recurse-submodules ${sshUrl}
  cd ${projectName}
  ${getPartialFromSettingsVariable(Enum_SettingOption.FAVORITEEDITOR)} .

  IN TEXT EDITOR (${getPartialFromSettingsVariable(
    Enum_SettingOption.FAVORITEEDITOR,
  )}):

  (before runing make sure of:)

    [DOCKER-COMPOSE.YML] (Specially for Macs M1)
    version: '3'
    services:
      web:
        platform: linux/amd64
        ...
      mysql:
        platform: linux/amd64
        ...

    [PYTHON.DOCKERFILE]
      @sha256:e132c504a791d70d31453d187b23160cc96e4e3350ce7dbee82b6feeabc18eec

      RUN echo 'deb http://archive.debian.org/debian/ stretch main' > /etc/apt/sources.list && echo 'deb http://archive.debian.org/debian-security/ stretch/updates main' >> /etc/apt/sources.list
      RUN echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99disablechecks

    [NODE.DOCKERFILE]
      FROM node:10.16.0-slim
      RUN printf "deb http://archive.debian.org/debian/ jessie main deb-src http://archive.debian.org/debian/ jessie main deb http://archive.debian.org/debian-security jessie/updates main deb-src http://archive.debian.org/debian-security jessie/updates main" > /etc/apt/sources.list
      ...
      RUN apt-get install -y --force-yes libnotify-bin

  (This part is not necessary anymore to do due to earlier clone)
    IN TERMINAL 1:

      git submodule init
      git submodule update --remote

    IN TERMINAL 2:

      MikasApp submodule for each branch

  IN TERMINAL 1:

    ${getPartialFromSettingsVariable(Enum_SettingOption.DOCKERCOMPOSE)} build
    ${getPartialFromSettingsVariable(Enum_SettingOption.DOCKERCOMPOSE)} up

  IN TERMINAL 2:

    ${getPartialFromSettingsVariable(
      Enum_SettingOption.DOCKERCOMPOSE,
    )} exec web python manage.py migrate
    ${getPartialFromSettingsVariable(
      Enum_SettingOption.DOCKERCOMPOSE,
    )} exec web python manage.py createsuperuser

    ${getPartialFromSettingsVariable(
      Enum_SettingOption.DOCKERCOMPOSE,
    )} restart web

  IN BROWSER:

    http://localhost:8000/admin/cms/page/
          `;
            }
            return '';
          } else {
            return '';
          }
        }}
      />
    ),
  },
  {
    title: 'Translate Commands',
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
          {
            name: 'dengun_webshop_package',
            formFieldType: Enum_MyFormFieldType.checkBox,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          return `${dockerCommand} exec web python manage.py makemessages ${
            formFields[0].value == 'true' ? `-i dengun_cms_package` : ``
          } ${
            formFields[1].value == 'true' ? `-i dengun_django_myforms` : ``
          } ${
            formFields[2].value == 'true'
              ? `-i dengun_django_admin_relation`
              : ``
          } ${formFields[3].value == 'true' ? `-i dengun_webshop_package` : ``}

${dockerCommand} exec web python manage.py compilemessages`;
        }}
      />
    ),
  },
  {
    title: 'Stateful Widget',
    category: Enum_scriptsCategory.flutter,
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            This is an example of a stateful <GS.Flutter>'Flutter'</GS.Flutter>{' '}
            widget.
          </>
        )}
        initialFormFields={[
          {
            name: 'Component name',
            formFieldType: Enum_MyFormFieldType.input,
            transformationType: Enum_MyFormFieldTransformationType.name,
            defaultValue: 'MyComponent',
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          const field0 = isValid(formFields[0].value)
            ? formFields[0].value
            : formFields[0].defaultValue;
          return `import 'package:flutter/material.dart';

class ${field0} extends StatefulWidget {
  const ${field0}({super.key});

  @override
  State<${field0}> createState() => _${field0}State();
}

class _${field0}State extends State<${field0}> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: TapboxB(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}
        `;
        }}
      />
    ),
  },
  {
    title: 'Checkout branch',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            Checkout to a new branch from a source branch: <br />- Stashes
            everything before checkout <br />- Run migration and createsuperuser
            if mysql not really working after up
          </>
        )}
        initialFormFields={[
          {
            name: 'Source Branch (dev, develop, etc)',
            formFieldType: Enum_MyFormFieldType.input,
            value: 'dev',
            callback: () => {},
          },
          {
            name: 'New Branch (feature/any-feature)',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          let resultedScript = `git stash -u
git checkout ${formFields[0].value}
git pull origin ${formFields[0].value}

git checkout -b "${formFields[1].value}"
${getPartialFromSettingsVariable(Enum_SettingOption.DOCKERCOMPOSE)} up

${getPartialFromSettingsVariable(
  Enum_SettingOption.DOCKERCOMPOSE,
)} exec web python manage.py migrate
${getPartialFromSettingsVariable(
  Enum_SettingOption.DOCKERCOMPOSE,
)} exec web python manage.py createsuperuser

http://localhost:8000/admin/cms/page/
          `;

          return `${resultedScript}`;
        }}
      />
    ),
  },
  {
    title: 'Calculate Discount',
    category: Enum_scriptsCategory.js,
    component: (
      <GeneratedScriptBase
        description={() => <>1 - 0.25 (25%) = 0.75 value * 0.75</>}
        initialFormFields={[
          {
            name: 'value',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
          {
            name: 'discount',
            formFieldType: Enum_MyFormFieldType.input,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          var value = formFields[0].value;
          var discount = formFields[1].value;
          var a;
          var result;

          if (value !== undefined && discount !== undefined) {
            a = 1 - parseFloat(discount) * 0.01;
            result = parseFloat(value) * a;

            return `a = 1 - ${discount} * 0.01; // a = 1 - ${a};
result = ${value} * ${a};

${result}`;
          } else {
            return ``;
          }
        }}
      />
    ),
  },
  {
    title: 'Rule of three',
    category: Enum_scriptsCategory.js,
    component: (
      <GeneratedScriptBase
        description={() => (
          <>
            The Rule of Three is a Mathematical Rule that allows you to solve
            problems based on proportions. By having three numbers: a, b, c,
            such that, you can calculate the unknown number.
            <br />
            <br />1 ---- 100
            <br />X ---- 300
          </>
        )}
        initialFormFields={[
          {
            name: 'If',
            formFieldType: Enum_MyFormFieldType.input,
            placeholder: '',
            callback: () => {},
          },
          {
            name: 'Is for',
            formFieldType: Enum_MyFormFieldType.input,
            placeholder: '',
            callback: () => {},
          },
          {
            name: 'What is X for',
            formFieldType: Enum_MyFormFieldType.input,
            placeholder: '',
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          var a = parseFloat(formFields[0].value ?? '0');
          var b = parseFloat(formFields[1].value ?? '0');
          var c = parseFloat(formFields[2].value ?? '0');
          var y = 0;
          var result;

          if (a !== undefined && b !== undefined && c !== undefined) {
            result = (a * c) / b;

            return `If ${a} is for ${b}, then ${result} is for ${c}
${a} ---- ${b}
X ---- ${c}

X = ${result}`;
          } else {
            return ``;
          }
        }}
      />
    ),
  },
  {
    title: 'Docker Commands',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => <>Some Docker commands</>}
        initialFormFields={[
          {
            name: 'docker container',
            formFieldType: Enum_MyFormFieldType.input,
            tooltip: `${getPartialFromSettingsVariable(
              Enum_SettingOption.DOCKERCOMPOSE,
            )} ps`,
            defaultValue: 'web',
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          const field0 = isValid(formFields[0].value)
            ? formFields[0].value
            : formFields[0].defaultValue;
          return `${dockerCommand} exec ${field0} python manage.py migrate
          \n${dockerCommand} exec ${field0} python manage.py createsuperuser
          \n${dockerCommand} exec ${field0} python manage.py sync_translation_fields --noinput`;
        }}
      />
    ),
  },
  {
    title: 'Stop all Docker projects',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => <>WIP Stop all docker projects</>}
        initialFormFields={[
          {
            name: 'projects to stop',
            formFieldType: Enum_MyFormFieldType.input,
            tooltip: `${getPartialFromSettingsVariable(
              Enum_SettingOption.DOCKERCOMPOSE,
            )} ps`,
            defaultValue:
              'alpenduradas, hubel-verde, rgf, sheratoncascaisresort, cars_and_cars, longevity, rolear, test, chrono-health, mapro, rolear_academy, uplive, goldentree, ombria, rolear_mais, valedoloboalgarve, hotelfaro, pine_cliffs, rolearon, hubel, pinecliffs_spa, rolegas, hubel_hpl, qdl, roques',
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          const folders = isValid(formFields[0].value)
            ? formFields[0].value!.split(', ')
            : formFields[0].defaultValue!.split(', ');
          var echo = '';
          for (const folderPath of folders) {
            echo =
              echo +
              `cd
cd ${projectFolder}/${folderPath}
${dockerCommand} stop

`;
          }
          return echo;
        }}
      />
    ),
  },
  {
    title: 'Environment variables',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => <>WIP easily add environment variables</>}
        initialFormFields={[
          {
            name: 'Select a path to add',
            formFieldType: Enum_MyFormFieldType.input,
            transformationType: Enum_MyFormFieldTransformationType.path,
            tooltip: `Please select any location or path to add on env variable`,
            callback: () => {},
          },
        ]}
        renderedScript={(formFields: IMyFormField[]) => {
          var profile = `/Users/${getSettings(
            Enum_SettingOption.PCNAME,
          )}/.zshrc`;
          var currentSetup = '';

          var echo =
            currentSetup +
            `
          nano ${profile}

          the file should follow the following example:
          export PATH="$PATH:/Users/${getSettings(
            Enum_SettingOption.PCNAME,
          )}/development/flutter/bin"
          export PATH="$PATH:${formFields[0].value}"

          to write directly on file: 
          (echo; echo 'export PATH="$PATH:${
            formFields[0].value
          }"') >> ${profile}
          `;

          return echo;
        }}
      />
    ),
  },
  {
    title: 'Bat Snippets Example',
    category: Enum_scriptsCategory.terminal,
    component: (
      <GeneratedScriptBase
        description={() => <>Some .bat snippets</>}
        initialFormFields={[]}
        renderedScript={(formFields: IMyFormField[]) => {
          return `@echo off

set mainFolder="C:\Program Files (x86)\Common Files\Adobe\Adobe Desktop Common"
set prefix="-old-"

rename %mainFolder%\AdobeGenuineClient %prefix%AdobeGenuineClient
rename %mainFolder%\LCC %prefix%LCC
rename %mainFolder%\TCC %prefix%TCC

echo Folders renamed successfully.
pause
`;
        }}
      />
    ),
  },
];

export default scriptsCodes;
