import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

interface MyButtonProps {
  onClick: () => void;
}

const MyButton = ({ onClick }: MyButtonProps) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Click Me
    </Button>
  );
};

type MyButtonIconProps = MyButtonProps & {
  icon: ReactNode;
};

export const MyButtonIcon = ({ onClick, icon }: MyButtonIconProps) => {
  return (
    <Button color="primary" onClick={onClick}>
      {icon}
    </Button>
  );
};

export default MyButton;
