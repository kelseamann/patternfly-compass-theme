import * as React from 'react';
import { CompassContent, CompassMainHeader, CompassPanel, Form, FormGroup, Switch, Title } from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

const GeneralSettings: React.FunctionComponent = () => {
  useDocumentTitle('General Settings');

  // Check if dark mode is currently enabled
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    return document.documentElement.classList.contains('pf-v6-theme-dark');
  });

  // Handle theme toggle
  const handleThemeChange = (_event: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    setIsDarkMode(checked);
    
    if (checked) {
      document.documentElement.classList.add('pf-v6-theme-dark');
      localStorage.setItem('pf-theme', 'dark');
    } else {
      document.documentElement.classList.remove('pf-v6-theme-dark');
      localStorage.setItem('pf-theme', 'light');
    }
  };

  // Initialize theme from localStorage on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('pf-theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('pf-v6-theme-dark');
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('pf-v6-theme-dark');
      setIsDarkMode(false);
    }
  }, []);
  
  return (
    <CompassContent>
      <CompassMainHeader title={<Title headingLevel="h1">General Settings</Title>} />
      <CompassPanel>
        <Form>
          <FormGroup label="Theme" fieldId="theme-toggle">
            <Switch
              id="theme-toggle"
              label="Dark mode"
              labelOff="Light mode"
              isChecked={isDarkMode}
              onChange={handleThemeChange}
              aria-label="Toggle dark mode"
            />
          </FormGroup>
        </Form>
      </CompassPanel>
    </CompassContent>
  );
};

export { GeneralSettings };
