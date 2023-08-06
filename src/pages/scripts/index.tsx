import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionItem, {
  Enum_scriptsCategory,
} from '../../components/accordion/accordionItem';
import scriptsCodes, { IScriptItem } from './scripts';
import {
  Button,
  Input,
  Switch,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import downloadFile from '../../components/downloadableFile';

import * as GS from '../globalStyles';
import randomizedId, { validation } from 'utils';
import Header from 'components/header';

export interface IScripts {
  scriptsArray: IScriptItem[];
}

export const Scripts = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [numberOfDisplayedScripts, setNumberOfDisplayedScripts] = useState(0);

  const categoryTitle = (category: Enum_scriptsCategory) => {
    switch (category) {
      case Enum_scriptsCategory.terminal:
        return <GS.TerminalColor>{category}</GS.TerminalColor>;
      case Enum_scriptsCategory.browserDevTool:
        return <GS.BrowserDevToolColor>{category}</GS.BrowserDevToolColor>;
      case Enum_scriptsCategory.react:
        return <GS.ReactColor>{category}</GS.ReactColor>;
      case Enum_scriptsCategory.flutter:
        return <GS.FlutterColor>{category}</GS.FlutterColor>;
      case Enum_scriptsCategory.git:
        return <GS.GitColor>{category}</GS.GitColor>;
      case Enum_scriptsCategory.js:
        return <GS.JsColor>{category}</GS.JsColor>;
      default:
        return category;
    }
  };

  const handleSearchScripts = (event: any) => {
    const term = event.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const inFilter = (item: IScriptItem, searchableTerm: string) => {
    return (
      item.title.toLowerCase().includes(searchableTerm) ||
      (item.category.toLowerCase().includes(searchableTerm) &&
        searchableTerm !== '')
    );
  };

  useEffect(() => {
    const total = scriptsCodes.filter((item) =>
      inFilter(item, searchTerm)
    ).length;
    setNumberOfDisplayedScripts(total);
  }, [searchTerm]);

  return (
    <>
      <Header
        headContent={<>Scripts Snippets</>}
        subContent={`Cool scripts and commands generator to help your workflow and many more utilities, not only for devs but for everyone!`}
        helperContent={`Shown: ${numberOfDisplayedScripts}`}
      />
      <TextField
        fullWidth
        type="text"
        placeholder="search"
        onKeyUp={(e) => handleSearchScripts(e)}
      />
      <br />
      <br />
      {validation.isValid(scriptsCodes)
        ? scriptsCodes
            .filter((item) => {
              var allowed = inFilter(item, searchTerm);

              return allowed;
            })
            .map(({ category, component, script, title, file }, index) => (
              <Accordion
                key={randomizedId()}
                expanded={
                  numberOfDisplayedScripts == 1
                    ? true
                    : expanded === `panel${index}`
                }
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-header`}
                  id={`panel${index}bh-header`}
                >
                  <Typography sx={{ width: '20%', flexShrink: 0 }}>
                    {categoryTitle(category)}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {file && (
                    <Button onClick={() => downloadFile(file)}>{file}</Button>
                  )}
                  {component && <>{component}</>}
                  {script && <>{script}</>}
                </AccordionDetails>
              </Accordion>
            ))
        : validation.invalidMessage('No scripts found!')}
    </>
  );
};

export default Scripts;
