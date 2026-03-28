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
          paddingLeft: { xs: 0, sm: 50 },
          paddingBottom: 2,
          borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
          background: 'inherit',
          borderRadius: '8px 8px 0 0',
          '.MuiTabs-indicator': {
            height: '3px',
            background: 'linear-gradient(90deg, #c2410c, #f59e0b, #facc15)',
            borderRadius: '3px 3px 0 0',
            boxShadow: '0 0 15px rgba(194, 65, 12, 0.6), 0 0 30px rgba(245, 158, 11, 0.3)',
          },
          '.MuiTabs-scrollButtons': {
            color: 'rgba(255, 255, 255, 0.6)',
            '&.Mui-disabled': {
              opacity: 0.3,
            },
          },
        }}
      >
        <Tab 
          label="Real projects"
          {...a11yProps(0)}
          sx={{
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: value === 0 ? 700 : 500,
            color: value === 0 ? '#fff' : 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: '12px 20px',
            minHeight: 'auto',
            '&:hover': {
              color: '#fff',
              backgroundColor: 'rgba(194, 65, 12, 0.1)',
            },
          }}
        />
        <Tab 
          label="Showcase"
          {...a11yProps(1)}
          sx={{
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: value === 1 ? 700 : 500,
            color: value === 1 ? '#fff' : 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: '12px 20px',
            minHeight: 'auto',
            '&:hover': {
              color: '#fff',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
            },
          }}
        />
        <Tab 
          label="Other projects"
          {...a11yProps(2)}
          sx={{
            textTransform: 'none',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: value === 2 ? 700 : 500,
            color: value === 2 ? '#fff' : 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: '12px 20px',
            minHeight: 'auto',
            '&:hover': {
              color: '#fff',
              backgroundColor: 'rgba(194, 65, 12, 0.1)',
            },
          }}
        />
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
