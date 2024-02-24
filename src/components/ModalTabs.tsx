import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ModalCard from './ModalCard';
import { realProjectData, showcaseData, otherProjectsData } from '../api/data';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="card__container ">{children}</div>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ModalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        allowScrollButtonsMobile
        textColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
        
        sx={{
          maxWidth: { xs: 320, sm: 580 }, 
          paddingLeft:{xs: 0, sm: 50},
          '.MuiTabs-indicator': {
            bgcolor: 'yellow',

            },
         
        }}
      >
        <Tab label="Real projects" {...a11yProps(0)} />
        <Tab label="Showcase" {...a11yProps(1)} />
        <Tab label="Other projects" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {realProjectData.map((item, index) => (
          <ModalCard data={item} key={index} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {showcaseData.map((item, index) => (
          <ModalCard data={item} key={index} />
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {otherProjectsData.map((item, index) => (
          <ModalCard data={item} key={index} />
        ))}
      </TabPanel>
    </div>
  );
}
