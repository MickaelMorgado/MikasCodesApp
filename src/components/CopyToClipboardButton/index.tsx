import { Button, Tooltip } from '@mui/material';
import React from 'react';
import * as S from './styles';

export interface ICopyToClipboardButton {
  contentToCopy: any;
}

export const CopyToClipboardButton = ({
  contentToCopy,
}: ICopyToClipboardButton) => {
  return (
    <S.CopyToClipboardButton>
      <Tooltip title="Copy to clipboard">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(contentToCopy);
          }}
        >
          Copy
        </Button>
      </Tooltip>
    </S.CopyToClipboardButton>
  );
};

export default CopyToClipboardButton;
