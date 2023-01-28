import React, { useState } from "react";
import { Button, FormControl } from "@mui/material";
import MyFormField, { Enum_MyFormFieldType } from "components/myForm/field";
import * as S from "./styles";
import CopyToClipboardButton from "components/CopyToClipboardButton";

export interface ITemplateCreatorProps {}

export const TemplateCreator = () => {
  const [template, setTemplate] = useState("")

  const handleButton = (type: string) => {
    let rslt = template

    switch(type) {
      case "body":
        rslt = `<body>${rslt}</body>`
      case "span":
        rslt = `<span>${rslt}</span>`
    }

    setTemplate(rslt)
  }

  return <>
    <Button variant='contained' onClick={() => handleButton("body")}>Body</Button>
    <Button variant='contained' onClick={() => handleButton("span")}>Span</Button>
    <S.WrapperGeneratedCode>
      <S.Pre oneLine={false}>
        {template}
      </S.Pre>
      <CopyToClipboardButton
        contentToCopy={template}
      />
    </S.WrapperGeneratedCode>
  </>;
};

export default TemplateCreator;
