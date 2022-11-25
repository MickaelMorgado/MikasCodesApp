import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionItem, { Enum_scriptsCategory } from '../../components/accordion/accordionItem';
import scriptsCodes from "./scripts";
import { Button, Input, Switch, TextareaAutosize, TextField } from "@mui/material";
import downloadFile from "../../components/downloadableFile";

import * as GS from "../globalStyles";
import randomizedId from "utils";

export interface IScriptItem {
  id: string,
  title: string,
  category: Enum_scriptsCategory,
  script: string
}

export interface IScripts {
  scriptsArray: IScriptItem[]
}

export const Scripts = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchTerm, setSearchTerm] = useState('')

  const categoryTitle = (category: Enum_scriptsCategory) => {
    switch(category) {
      case Enum_scriptsCategory.terminal:
        return <GS.TerminalColor>{category}</GS.TerminalColor>
      case Enum_scriptsCategory.browserDevTool:
        return <GS.BrowserDevToolColor>{category}</GS.BrowserDevToolColor>
      case Enum_scriptsCategory.react:
        return <GS.ReactColor>{category}</GS.ReactColor>
      case Enum_scriptsCategory.git:
        return <GS.GitColor>{category}</GS.GitColor>
      case Enum_scriptsCategory.js:
        return <GS.JsColor>{category}</GS.JsColor>
      default:
        return category
    }
  }

  const handleSearchScripts = (event: any) => {
    const term = event.target.value
    setSearchTerm(term.toLowerCase())
  }

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <h2>Scripts Snippets</h2>
      <TextField fullWidth type="text" placeholder="search" onKeyUp={(e) => handleSearchScripts(e)} />
      <br />
      <br />
      {
        scriptsCodes.filter((item) => {
          return item.title.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm) && searchTerm !== ''
        }).map(
          ({ category, component, script, title, file }, index) => (
            <Accordion key={randomizedId()} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-header`}
                id={`panel${index}bh-header`}
              >
                <Typography sx={{ width: '20%', flexShrink: 0 }}>
                  {categoryTitle(category)}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {file && <Button onClick={() => downloadFile(file)}>{file}</Button>}
                {component && <>{component}</>}
                {script && <>{script}</>}
              </AccordionDetails>
            </Accordion>
          )
        )
      }
    </div>
  );
};

export default Scripts;
