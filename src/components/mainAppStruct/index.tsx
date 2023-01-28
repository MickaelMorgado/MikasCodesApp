import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from 'components/sidebar';

import * as S from './styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface IMainAppStruct {
  title: string;
  content: React.ReactElement;
}

export default function MainAppStruct({
  title = 'Main Title',
  content = <>This page is empty</>,
}: IMainAppStruct) {
  return (
    <S.Main>
      <CssBaseline />
      <Sidebar />
      <S.Box>
        <DrawerHeader />
        {content}
      </S.Box>
    </S.Main>
  );
}
