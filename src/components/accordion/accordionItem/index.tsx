import React from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export enum Enum_scriptsCategory {
  styles = 'Styles',
  js = 'Js',
  react = 'React',
  browserDevTool = 'Browser Dev Tool',
  git = 'Git',
  terminal = 'Terminal',
}

export interface IAccordionItemProps {
  id: string;
  category: Enum_scriptsCategory;
  title: string;
}

export const AccordionItem = ({
  id = 'accordionId',
  category = Enum_scriptsCategory.js,
  title = 'js script',
}: IAccordionItemProps) => {
  return (
    <>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={id}
        id={id}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{category}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
          Aliquam eget maximus est, id dignissim quam.
        </Typography>
      </AccordionDetails>
    </>
  );
};

export default AccordionItem;
