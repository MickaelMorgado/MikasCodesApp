import { Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MyFormField, { Enum_MyFormFieldType } from 'components/myForm/field';
import PaddedContent from 'components/paddedContent';

import * as S from './styles';
import * as GS from '../globalStyles';
import Header from 'components/header';
import { VerticalTabs } from 'components/verticalTabs';
import randomizedId from 'utils';

interface IPlace {
  name: string,
}

export const Viewer = () => {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');

  const addPlace = (newPlaceName: IPlace) => {
    const newPlace = newPlaceName;
    setPlaces([...places, newPlace]);
  };

  const listAllPlaces = () => {
    return places.map((place, index) => (
      <p key={index}>{place.name}</p>
    ));
  };

  const writeCode = (code: string) => {

  }

  const buttonAction = (name: string) => {
    switch (name) {
      case 'js-ready':
        var newPlace: IPlace = { name: `[place${randomizedId()}]` };
        setGeneratedCode(`
          document.ready(){
            ${newPlace.name}
          }`
        );
        addPlace(newPlace);
        break;
      case 'js-alert':
        setGeneratedCode(`alert('yey')`);
        break;
      default:
        // any code
        break;
    }
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => buttonAction('js-ready')}>
            ready
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => buttonAction('js-alert')}>
            alert
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Button 2
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Button 3
          </Button>
        </Grid>
      </Grid>
      <Grid container width={'100%'}>
        <Grid>
          <Paper>
            {
              places.map(({name}, index) => <button>{name}</button>)
            }
          </Paper>
        </Grid>
        <Grid>
          <Paper>
              Column 2
          </Paper>
        </Grid>
        <Grid>
          <Paper>
            {generatedCode}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Viewer;
