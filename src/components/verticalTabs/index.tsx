import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ITabItem {
  name: string;
  children?: React.ReactNode;
}

interface VerticalTabsProps {
  items: ITabItem[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const VerticalTabs = ({ items }: VerticalTabsProps) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
    <Box
      width="100%"
      maxWidth={'100%'}
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', width: '100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        >
        {items.map((item, index) => (
          <Tab label={item.name} {...a11yProps(index)} key={index} />
        ))}
      </Tabs>
      {items.map((item, index) => (
        <TabPanel value={value} index={index}>
          {item.children}
        </TabPanel>
      ))}
    </Box>
    </Container>
  );
}
