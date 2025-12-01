import * as React from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  ClipboardCopy,
  CompassContent,
  CompassPanel,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
  SearchInput,
  Tab,
  Tabs,
  TabTitleText,
  Title,
  Tooltip,
} from '@patternfly/react-core';
import { CheckCircleIcon, EllipsisVIcon, ExternalLinkAltIcon, InfoCircleIcon } from '@patternfly/react-icons';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

const Dashboard: React.FunctionComponent = () => {
  const [isProcessing] = React.useState(true);
  const [fipsAdded, setFipsAdded] = React.useState(false);
  const [goAdded, setGoAdded] = React.useState(false);
  const [shellAdded, setShellAdded] = React.useState(false);
  const [getStartedSearchValue, setGetStartedSearchValue] = React.useState('');
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [copyAllSuccess, setCopyAllSuccess] = React.useState(false);

  // Add gradient animation CSS and table row transparency
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes gradientMorph {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }
      .pf-v6-c-table tbody tr,
      .pf-v6-c-table tbody tr td,
      .pf-v6-c-table tbody tr:hover,
      .pf-v6-c-table tbody tr:hover td {
        background-color: transparent !important;
        background: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Generate dynamic image reference based on selections
    let imageName = 'python';
  let imageTag = 'latest';

    // Add suffixes to image name
    if (fipsAdded) {
      imageName += '-fips';
    }
    if (goAdded) {
      imageName += '-go';
    }

    // Modify tag if shell is added
    if (shellAdded) {
    imageTag = 'latest-builder';
    }

  const getImageReference = () => {
    return `quay.io/hummingbird/${imageName}:${imageTag}`;
  };

  const dockerPullCommand = `docker pull ${getImageReference()}`;
  const podmanPullCommand = `podman pull ${getImageReference()}`;

  // Mock CVE Resolution History data
  const cveHistory = [
    { id: 'CVE-2024-1234', status: 'Ongoing', statusColor: 'orange', lastUpdate: 'Nov 26, 10:30 AM' },
    { id: 'CVE-2024-5678', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 25, 3:45 PM' },
    { id: 'CVE-2024-9012', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 24, 9:15 AM' },
    { id: 'CVE-2024-3456', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 23, 2:20 PM' },
    { id: 'CVE-2024-7890', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 22, 11:00 AM' },
    { id: 'CVE-2024-2468', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 21, 4:30 PM' },
    { id: 'CVE-2024-1357', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 20, 8:45 AM' },
    { id: 'CVE-2024-9753', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 19, 1:10 PM' },
    { id: 'CVE-2024-8642', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 18, 5:00 PM' },
    { id: 'CVE-2024-1098', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 17, 10:25 AM' },
    { id: 'CVE-2024-7531', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 16, 3:15 PM' },
    { id: 'CVE-2024-4826', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 15, 9:50 AM' },
    { id: 'CVE-2024-3197', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 14, 2:40 PM' },
    { id: 'CVE-2024-6420', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 13, 11:30 AM' },
    { id: 'CVE-2024-8159', status: 'Resolved', statusColor: 'green', lastUpdate: 'Nov 12, 4:20 PM' },
  ];

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        pointerEvents: 'none',
        zIndex: -1
      }} />
    <CompassContent>
        <Grid hasGutter style={{ paddingBottom: '2rem' }}>
        {/* Image Name Section */}
        <GridItem span={8}>
          <div style={{ 
            backgroundColor: 'rgba(31, 31, 31, 0.9)', 
            borderRadius: '8px',
            padding: '0',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            {/* Header with buttons - Primary Image Header */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              padding: '1.5rem 2rem',
              background: 'linear-gradient(135deg, rgba(238, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.3) 100%)',
              borderRadius: '8px 8px 0 0',
              borderBottom: '2px solid rgba(238, 0, 0, 0.3)',
              gap: '1rem'
            }}>
              <Flex alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                <FlexItem>
                  <Flex direction={{ default: 'column' }} gap={{ default: 'gapSm' }}>
                    <FlexItem>
                      <Flex gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                        <FlexItem>
                          <Title headingLevel="h2" size="2xl" style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap', fontSize: '2rem', fontWeight: 700 }}>
                            Python
                          </Title>
                        </FlexItem>
                        <FlexItem>
                          <Tooltip content="Hardened, security-focused Python image from Project Hummingbird based on official Python upstream">
                            <InfoCircleIcon style={{ color: '#999', cursor: 'help', fontSize: '1.25rem' }} />
                          </Tooltip>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                    <FlexItem>
                      <Flex gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem>
                          <div style={{ 
                            width: '24px', 
                            height: '24px', 
                            backgroundColor: '#EE0000',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                              <path d="M8 0L0 4v8l8 4 8-4V4L8 0z"/>
                            </svg>
                          </div>
                  </FlexItem>
                  <FlexItem>
                          <span style={{ fontSize: '0.875rem', color: '#ccc' }}>
                            Distributed by <strong style={{ color: '#fff' }}>Red Hat</strong>
                    </span>
                  </FlexItem>
                </Flex>
                    </FlexItem>
                  </Flex>
                </FlexItem>
                <FlexItem>
                  <Flex gap={{ default: 'gapSm' }} wrap={{ default: 'wrap' }}>
                    <FlexItem>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        component="a"
                        href="https://hub.docker.com/_/python"
                        target="_blank"
                        icon={<ExternalLinkAltIcon />}
                        iconPosition="end"
                      >
                        Upstream source
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        component="a"
                        href="https://github.com/python/cpython"
                        target="_blank"
                        icon={<ExternalLinkAltIcon />}
                        iconPosition="end"
                      >
                        GitHub
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        component="a"
                        href="https://docs.python.org"
                        target="_blank"
                        icon={<ExternalLinkAltIcon />}
                        iconPosition="end"
                      >
                        Documentation
                      </Button>
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Flex>
            </div>
            
            {/* Card Body */}
            <div style={{ padding: '1.5rem' }}>
                <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                  {/* Option Buttons */}
                  <FlexItem>
                    <Flex gap={{ default: 'gapSm' }} wrap={{ default: 'wrap' }}>
                      <FlexItem>
                        <Button 
                          variant={fipsAdded ? "primary" : "secondary"} 
                          size="sm"
                          onClick={() => setFipsAdded(!fipsAdded)}
                          icon={fipsAdded ? <CheckCircleIcon /> : undefined}
                        >
                          {fipsAdded ? "FIPS/STIG Added" : "+ FIPS/STIG"}
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button 
                          variant={shellAdded ? "primary" : "secondary"} 
                          size="sm"
                          onClick={() => setShellAdded(!shellAdded)}
                          icon={shellAdded ? <CheckCircleIcon /> : undefined}
                        >
                          {shellAdded ? "Shell Added" : "+ Shell"}
                        </Button>
                      </FlexItem>
                      <FlexItem>
                        <Button 
                          variant={goAdded ? "primary" : "secondary"} 
                          size="sm"
                          onClick={() => setGoAdded(!goAdded)}
                          icon={goAdded ? <CheckCircleIcon /> : undefined}
                        >
                          {goAdded ? "Go Tools Added" : "+ Go Tools"}
                        </Button>
                      </FlexItem>
                    </Flex>
                  </FlexItem>

                  {/* Docker Pull Command */}
                  <FlexItem>
                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }}>
                    <FlexItem flex={{ default: 'flex_1' }}>
                      <div style={{ 
                        fontFamily: 'var(--pf-t--global--font--family--monospace, "RedHatMono", "Courier New", monospace)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px'
                      }}>
                    <ClipboardCopy 
                      isReadOnly 
                      hoverTip="Copy" 
                      clickTip="Copied"
                      isCode
                    >
                      {dockerPullCommand}
                    </ClipboardCopy>
                      </div>
                    </FlexItem>
                    <FlexItem>
                      <span style={{ color: '#999', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>3.4 MB</span>
                    </FlexItem>
                  </Flex>
                  </FlexItem>

                  {/* Podman Pull Command */}
                  <FlexItem>
                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }}>
                    <FlexItem flex={{ default: 'flex_1' }}>
                      <div style={{ 
                        fontFamily: 'var(--pf-t--global--font--family--monospace, "RedHatMono", "Courier New", monospace)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px'
                      }}>
                    <ClipboardCopy 
                      isReadOnly 
                      hoverTip="Copy" 
                      clickTip="Copied"
                      isCode
                    >
                      {podmanPullCommand}
                    </ClipboardCopy>
                      </div>
                    </FlexItem>
                    <FlexItem>
                      <span style={{ color: '#999', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>3.4 MB</span>
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Flex>
            </div>
          </div>
        </GridItem>

        {/* CVE Resolution History */}
        <GridItem span={4}>
          <div style={{ 
            backgroundColor: 'rgba(31, 31, 31, 0.9)', 
            borderRadius: '8px',
            padding: '0',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.5)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header with button */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1rem 1.5rem',
              backgroundColor: 'rgba(43, 43, 43, 0.9)',
              borderRadius: '8px 8px 0 0',
              gap: '1rem'
            }}>
              <Title headingLevel="h3" size="lg" style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap', fontSize: '1rem' }}>
                History for this image
              </Title>
              <Button 
                variant="primary" 
                size="sm"
                icon={<ExternalLinkAltIcon />}
                iconPosition="end"
              >
                Advisories
              </Button>
            </div>

            {/* Table container with scrollable body */}
            <div style={{ 
              backgroundColor: 'rgba(43, 43, 43, 0.9)',
              margin: '1rem',
              marginBottom: '0',
              borderRadius: '8px',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              overflow: 'hidden',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Table 
                variant="compact" 
                style={{ 
                  border: 'none',
                  backgroundColor: 'rgba(43, 43, 43, 0.9)'
                }}
              >
                <Thead 
                  style={{ 
                    backgroundColor: 'rgba(58, 58, 58, 0.9)',
                    borderRadius: '8px 8px 0 0'
                  }}
                >
                  <Tr>
                    <Th 
                      style={{ 
                        backgroundColor: 'rgba(58, 58, 58, 0.9)', 
                        color: '#fff',
                        borderBottom: '1px solid rgba(74, 74, 74, 0.9)'
                      }}
                    >
                      CVE ID
                    </Th>
                    <Th 
                      style={{ 
                        backgroundColor: 'rgba(58, 58, 58, 0.9)', 
                        color: '#fff',
                        borderBottom: '1px solid rgba(74, 74, 74, 0.9)'
                      }}
                    >
                      Status
                    </Th>
                    <Th 
                      style={{ 
                        backgroundColor: 'rgba(58, 58, 58, 0.9)', 
                        color: '#fff',
                        borderBottom: '1px solid rgba(74, 74, 74, 0.9)'
                      }}
                    >
                      Last Update
                    </Th>
                    <Th 
                      style={{ 
                        backgroundColor: 'rgba(58, 58, 58, 0.9)', 
                        color: '#fff',
                        borderBottom: '1px solid rgba(74, 74, 74, 0.9)',
                        width: '60px',
                        textAlign: 'center'
                      }}
                    />
                  </Tr>
                </Thead>
              </Table>
              
              {/* Scrollable table body */}
              <div style={{ 
                flex: 1,
                overflowY: 'auto',
                backgroundColor: 'rgba(43, 43, 43, 0.9)'
              }}>
                <Table 
                  variant="compact"
                  style={{ 
                    border: 'none',
                    backgroundColor: 'rgba(43, 43, 43, 0.9)'
                  }}
                >
                  <Tbody style={{ backgroundColor: 'rgba(43, 43, 43, 0.9)' }}>
                    {cveHistory.map((item, index) => (
                        <Tr 
                          key={index}
                          style={{ 
                            backgroundColor: 'rgba(43, 43, 43, 0.9)',
                            borderBottom: '1px solid rgba(74, 74, 74, 0.5)'
                          }}
                        >
                          <Td style={{ 
                            backgroundColor: 'inherit', 
                            borderBottom: 'none', 
                            color: 'var(--pf-t--global--color--brand--default)',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem'
                          }}>
                            {item.id}
                        </Td>
                          <Td style={{ 
                            backgroundColor: 'inherit', 
                            borderBottom: 'none',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem'
                          }}>
                          <Label 
                            color={item.statusColor === 'green' ? 'green' : 'orange'}
                            icon={item.statusColor === 'green' ? <CheckCircleIcon /> : undefined}
                            isFilled
                          >
                            {item.status}
                          </Label>
                        </Td>
                          <Td style={{ 
                            backgroundColor: 'inherit', 
                            borderBottom: 'none', 
                            color: '#d2d2d2',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem'
                          }}>
                            {item.lastUpdate}
                          </Td>
                          <Td 
                            style={{ 
                              backgroundColor: 'inherit', 
                              borderBottom: 'none',
                              textAlign: 'center',
                              width: '60px',
                              paddingTop: '0.75rem',
                              paddingBottom: '0.75rem'
                            }}
                          >
                            <Button 
                              variant="plain" 
                              aria-label="Actions"
                              style={{ color: '#d2d2d2' }}
                            >
                              <EllipsisVIcon />
                            </Button>
                          </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </div>
          </div>
        </GridItem>

        {/* Main Three Column Layout */}
        
        {/* Left Column - Get Started */}
        <GridItem lg={4} md={12}>
          <div style={{ 
            backgroundColor: 'rgba(31, 31, 31, 0.9)', 
            borderRadius: '8px',
            padding: '0',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.5)',
            height: 'calc(100vh - 560px)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header with search */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1rem 1.5rem',
              backgroundColor: 'rgba(43, 43, 43, 0.9)',
              borderRadius: '8px 8px 0 0',
              gap: '1rem'
            }}>
              <Title headingLevel="h3" size="lg" style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap', fontSize: '1rem' }}>
                      Get Started
                    </Title>
              <SearchInput
                placeholder="Search"
                value={getStartedSearchValue}
                onChange={(_event, value) => setGetStartedSearchValue(value)}
                onClear={() => setGetStartedSearchValue('')}
                style={{ maxWidth: '200px', flex: 1 }}
              />
            </div>
            
            {/* Card Body */}
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
              <Tabs
                activeKey={activeTabKey}
                onSelect={(_event, tabIndex) => setActiveTabKey(tabIndex)}
              >
                <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>}>
                  <div style={{ padding: '1rem 0' }}>
                    <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                      {/* Manifest Digest Section */}
                      <FlexItem>
                        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#d2d2d2' }}>
                          Manifest Digest
                        </div>
                        <div style={{ 
                          fontFamily: 'var(--pf-t--global--font--family--monospace, "RedHatMono", "Courier New", monospace)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '4px'
                        }}>
                          <ClipboardCopy 
                            isReadOnly 
                            hoverTip="Copy" 
                            clickTip="Copied"
                            variant="inline-compact"
                          >
                            sha256:a3b5c9d7e2f1a0b8c6d4e2f0a8b6c4d2e0f8a6b4c2d0e8f6a4b2c0d8e6f4a2b0
                          </ClipboardCopy>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
                          Use this digest to ensure you're pulling the exact same image every time
                        </div>
                      </FlexItem>
                      
                      {/* Licenses Section */}
                      <FlexItem>
                        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#d2d2d2' }}>
                          Licenses
                        </div>
                        <Flex gap={{ default: 'gapSm' }} wrap={{ default: 'wrap' }}>
                          <FlexItem>
                            <Label isCompact>MIT</Label>
                          </FlexItem>
                          <FlexItem>
                            <Label isCompact>Apache-2.0</Label>
                          </FlexItem>
                          <FlexItem>
                            <Label isCompact>BSD-3-Clause</Label>
                          </FlexItem>
                          <FlexItem>
                            <Label isCompact>PSF-2.0</Label>
                          </FlexItem>
                          <FlexItem>
                            <Label isCompact>GPL-2.0+</Label>
                          </FlexItem>
                        </Flex>
                      </FlexItem>
                    </Flex>
                  </div>
                </Tab>
                <Tab eventKey={1} title={<TabTitleText>SBOM</TabTitleText>}>
                  <div style={{ padding: '1rem 0' }}>
                    <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                      <FlexItem>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#d2d2d2', marginBottom: '0.5rem' }}>
                          Software Bill of Materials
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#999', marginBottom: '1rem' }}>
                          Complete inventory of all software packages included in this image
                        </p>
                      </FlexItem>
                      
                      <FlexItem>
                        <Table variant="compact" borders style={{ backgroundColor: 'transparent' }}>
                          <Thead>
                            <Tr>
                              <Th>Package Name</Th>
                              <Th>Version</Th>
                              <Th>License</Th>
                              <Th>Size</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td><strong>python</strong></Td>
                              <Td>3.11.6</Td>
                              <Td><Label isCompact>PSF-2.0</Label></Td>
                              <Td style={{ color: '#999' }}>15.2 MB</Td>
                            </Tr>
                            <Tr>
                              <Td><strong>openssl</strong></Td>
                              <Td>3.0.8</Td>
                              <Td><Label isCompact>Apache-2.0</Label></Td>
                              <Td style={{ color: '#999' }}>4.8 MB</Td>
                            </Tr>
                            <Tr>
                              <Td><strong>pip</strong></Td>
                              <Td>23.3.1</Td>
                              <Td><Label isCompact>MIT</Label></Td>
                              <Td style={{ color: '#999' }}>2.1 MB</Td>
                            </Tr>
                            <Tr>
                              <Td><strong>setuptools</strong></Td>
                              <Td>68.2.2</Td>
                              <Td><Label isCompact>MIT</Label></Td>
                              <Td style={{ color: '#999' }}>3.4 MB</Td>
                            </Tr>
                            <Tr>
                              <Td><strong>ca-certificates</strong></Td>
                              <Td>2023.2.62</Td>
                              <Td><Label isCompact>MPL-2.0</Label></Td>
                              <Td style={{ color: '#999' }}>0.3 MB</Td>
                            </Tr>
                            <Tr>
                              <Td><strong>glibc</strong></Td>
                              <Td>2.34</Td>
                              <Td><Label isCompact>LGPL-2.1</Label></Td>
                              <Td style={{ color: '#999' }}>8.7 MB</Td>
                            </Tr>
                            <Tr>
                              <Td><strong>zlib</strong></Td>
                              <Td>1.2.13</Td>
                              <Td><Label isCompact>Zlib</Label></Td>
                              <Td style={{ color: '#999' }}>0.2 MB</Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </FlexItem>
                    </Flex>
                  </div>
                </Tab>
                <Tab eventKey={2} title={<TabTitleText>Attestation</TabTitleText>}>
                  <div style={{ padding: '1rem 0' }}>
                    <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                      <FlexItem>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#d2d2d2', marginBottom: '0.5rem' }}>
                          Image Attestations
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#999', marginBottom: '1rem' }}>
                          This image includes the following attestations to verify its security and compliance:
                        </p>
                      </FlexItem>
                      
                      <FlexItem>
                        <Table variant="compact" borders style={{ backgroundColor: 'transparent' }}>
                          <Thead>
                            <Tr>
                              <Th>Attestation Type</Th>
                              <Th>Status</Th>
                              <Th>Tool/Version</Th>
                              <Th>Timestamp</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td><strong>Vulnerability Scan</strong></Td>
                              <Td>
                                <Label color="green" icon={<CheckCircleIcon />} isCompact>
                                  passed
                                </Label>
                              </Td>
                              <Td>Trivy 0.48.0</Td>
                              <Td style={{ color: '#999' }}>2 mins ago</Td>
                            </Tr>
                            <Tr>
                              <Td><strong>SBOM Generation</strong></Td>
                              <Td>
                                <Label color="green" icon={<CheckCircleIcon />} isCompact>
                                  passed
                                </Label>
                              </Td>
                              <Td>Syft 0.100.0</Td>
                              <Td style={{ color: '#999' }}>5 mins ago</Td>
                            </Tr>
                            <Tr>
                              <Td><strong>SLSA Provenance</strong></Td>
                              <Td>
                                <Label color="green" icon={<CheckCircleIcon />} isCompact>
                                  passed
                                </Label>
                              </Td>
                              <Td>SLSA Level 3</Td>
                              <Td style={{ color: '#999' }}>8 mins ago</Td>
                            </Tr>
                            <Tr>
                              <Td><strong>License Compliance</strong></Td>
                              <Td>
                                <Label color="green" icon={<CheckCircleIcon />} isCompact>
                                  passed
                                </Label>
                              </Td>
                              <Td>FOSSA</Td>
                              <Td style={{ color: '#999' }}>10 mins ago</Td>
                            </Tr>
                          </Tbody>
                        </Table>
                  </FlexItem>
                </Flex>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </GridItem>

        {/* Middle Column - AI Instructions */}
        <GridItem lg={4} md={12}>
          <div style={{ 
            backgroundColor: 'rgba(31, 31, 31, 0.9)', 
            borderRadius: '8px',
            padding: '0',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.5)',
            height: 'calc(100vh - 560px)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header with button */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1rem 1.5rem',
              backgroundColor: 'rgba(43, 43, 43, 0.9)',
              borderRadius: '8px 8px 0 0',
              gap: '1rem'
            }}>
              <Title headingLevel="h3" size="lg" style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap', fontSize: '1rem' }}>
                      AI Migration Instructions
                    </Title>
              <Button 
                variant="primary" 
                size="sm"
                icon={copyAllSuccess ? <CheckCircleIcon /> : undefined}
                onClick={() => {
                  // Copy all instructions to clipboard
                  const allInstructions = [
                    "Update the FROM statement to use quay.io/hummingbird/curl:latest",
                    "Change any apk package manager commands to dnf",
                    "Set USER to 1001",
                    "Add WORKDIR /app and set ownership with 'chown -R 1001:1001 /app'",
                    "Ensure cache directories are writable by creating them and setting ownership to 1001:1001"
                  ].join('\n\n');
                  navigator.clipboard.writeText(allInstructions);
                  setCopyAllSuccess(true);
                  setTimeout(() => setCopyAllSuccess(false), 2000);
                }}
              >
                {copyAllSuccess ? "All Copied!" : "Copy All"}
              </Button>
            </div>
                  
            {/* Card Body */}
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
              <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                {/* Description */}
                <FlexItem>
                  <p style={{ fontSize: '0.875rem', color: '#999', margin: 0 }}>
                    Replace your Dockerfile inline to use this hardened, security-focused image. Follow these steps manually, or copy the instructions to use with your AI coding assistant.
                  </p>
                </FlexItem>
                  
                {/* Instruction ClipboardCopy Fields */}
                <FlexItem>
                    <Flex direction={{ default: 'column' }} gap={{ default: 'gapSm' }}>
                      <FlexItem>
                      <div style={{ 
                        fontFamily: 'var(--pf-t--global--font--family--monospace, "RedHatMono", "Courier New", monospace)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px'
                      }}>
                        <ClipboardCopy 
                          isReadOnly 
                          hoverTip="Copy" 
                          clickTip="Copied"
                          variant="expansion"
                        >
                          Update the FROM statement to use quay.io/hummingbird/curl:latest
                        </ClipboardCopy>
                      </div>
                      </FlexItem>
                      
                      <FlexItem>
                      <div style={{ 
                        fontFamily: 'var(--pf-t--global--font--family--monospace, "RedHatMono", "Courier New", monospace)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px'
                      }}>
                        <ClipboardCopy 
                          isReadOnly 
                          hoverTip="Copy" 
                          clickTip="Copied"
                          variant="expansion"
                        >
                          Change any apk package manager commands to dnf
                        </ClipboardCopy>
                      </div>
                      </FlexItem>
                      
                      <FlexItem>
                      <div style={{ 
                        fontFamily: 'var(--pf-t--global--font--family--monospace, "RedHatMono", "Courier New", monospace)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px'
                      }}>
                        <ClipboardCopy 
                          isReadOnly 
                          hoverTip="Copy" 
                          clickTip="Copied"
                          variant="expansion"
                        >
                          Set USER to 1001
                        </ClipboardCopy>
                      </div>
                      </FlexItem>
                      
                      <FlexItem>
                      <div style={{ 
                        fontFamily: 'var(--pf-t--global--font--family--monospace, "RedHatMono", "Courier New", monospace)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px'
                      }}>
                        <ClipboardCopy 
                          isReadOnly 
                          hoverTip="Copy" 
                          clickTip="Copied"
                          variant="expansion"
                        >
                          Add WORKDIR /app and set ownership with 'chown -R 1001:1001 /app'
                        </ClipboardCopy>
                      </div>
                      </FlexItem>
                      
                      <FlexItem>
                      <div style={{ 
                        fontFamily: 'var(--pf-t--global--font--family--monospace, "RedHatMono", "Courier New", monospace)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px'
                      }}>
                        <ClipboardCopy 
                          isReadOnly 
                          hoverTip="Copy" 
                          clickTip="Copied"
                          variant="expansion"
                        >
                          Ensure cache directories are writable by creating them and setting ownership to 1001:1001
                        </ClipboardCopy>
                      </div>
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </Flex>
            </div>
          </div>
        </GridItem>

        {/* Right Column - 0 CVEs Success Banner */}
        <GridItem lg={4} md={12}>
          <Card 
            hasAiIndicator 
            isThinking
            style={{ 
              background: 'linear-gradient(135deg, rgba(146, 212, 0, 0.3) 0%, rgba(146, 212, 0, 0.15) 40%, rgba(0, 0, 0, 0.4) 70%, rgba(146, 212, 0, 0.1) 100%)',
              height: 'calc(100vh - 685px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CardBody style={{ padding: '1.25rem' }}>
              <Flex direction={{ default: 'column' }} gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                <FlexItem>
                  <div style={{
                    color: '#fff',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    textAlign: 'center'
                  }}>
                    0 CVE's!
                  </div>
                </FlexItem>
                <FlexItem>
                  <span style={{ fontSize: '0.875rem', textAlign: 'center', color: '#ccc' }}>
                    This image has no known vulnerabilities
                  </span>
                </FlexItem>
                <FlexItem>
                  <Flex direction={{ default: 'column' }} gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginTop: '0.5rem' }}>
                    <FlexItem>
                      <span style={{ fontSize: '0.75rem', color: '#999' }}>
                        Last scanned: <strong style={{ color: '#ccc' }}>Nov 26, 2:30 PM</strong>
                      </span>
                    </FlexItem>
                    <FlexItem>
                      <span style={{ fontSize: '0.75rem', color: '#999' }}>
                        Last updated: <strong style={{ color: '#ccc' }}>Nov 26, 10:15 AM</strong>
                      </span>
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </CompassContent>
    </>
  );
};

export { Dashboard };
