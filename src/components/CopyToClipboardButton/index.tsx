import { Button, Tooltip } from '@mui/material';
import React from 'react';
import * as S from './styles';

export interface ICopyToClipboardButton {
  contentToCopy: any;
  markAsDone?: (condition: boolean) => void;
}

export const CopyToClipboardButton = ({
  contentToCopy,
  markAsDone,
}: ICopyToClipboardButton) => {
  return (
    <S.CopyToClipboardButton>
      <Tooltip title="Copy to clipboard">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(contentToCopy);
            markAsDone && markAsDone(true);
          }}
        >
          Copy
        </Button>
      </Tooltip>
    </S.CopyToClipboardButton>
  );
};

export default CopyToClipboardButton;
