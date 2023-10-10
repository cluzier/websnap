import React, { useState } from 'react';
import { Tabs, Input, Button, Select, Checkbox, Table, Input as AntInput, Spin } from 'antd';
import './App.css';

const { TabPane } = Tabs;
const { Option } = Select;

function App() {
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [httpMethod, setHttpMethod] = useState('GET');
  const [response, setResponse] = useState(null);
  const [responseBody, setResponseBody] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  // State for settings options
  const [enableSSL, setEnableSSL] = useState(false);
  const [verifySSL, setVerifySSL] = useState(false);
  // Add other settings states as needed...

  // State for Params tab table data
  const [paramsData, setParamsData] = useState([
    { key: 'Key', value: 'Value', description: 'Description', enabled: false },
    // Add more placeholder data as needed
  ]);

  // Columns for Params tab table
  const columns = [
    {
      title: 'Enable',
      dataIndex: 'enabled',
      render: (text, record) => (
        <Checkbox checked={text} onChange={(e) => handleCheckboxChange(record, e.target.checked)} />
      ),
    },
    {
      title: 'Key',
      dataIndex: 'key',
      render: (text, record) => (
        <EditableCell text={text} onEdit={(newText, dataIndex) => handleCellEdit(record, newText, dataIndex)} dataIndex="key" />
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      render: (text, record) => (
        <EditableCell text={text} onEdit={(newText, dataIndex) => handleCellEdit(record, newText, dataIndex)} dataIndex="value" />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text, record) => (
        <EditableCell text={text} onEdit={(newText, dataIndex) => handleCellEdit(record, newText, dataIndex)} dataIndex="description" />
      ),
    },
  ];

  const handleCheckboxChange = (record, checked) => {
    setParamsData((prevData) =>
      prevData.map((item) => (item.key === record.key ? { ...item, enabled: checked } : item))
    );
  };

  const handleCellEdit = (record, newText) => {
    setParamsData((prevData) =>
      prevData.map((item) => (item.key === record.key ? { ...item, value: newText } : item))
    );
  };

  // Function to handle cell click
  const handleCellClick = (record) => {
    // Logic to allow user input for the clicked cell
    // You can use a modal or another UI component to handle user input
    console.log('Cell clicked:', record.key);
  };

  const handleApiSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when sending request

      if (!apiEndpoint) {
        setResponse(null);
        setResponseBody('Enter the URL and click Send to get a response 🪴');
        return;
      }

      const apiResponse = await fetch(apiEndpoint, { method: httpMethod });
      const body = await apiResponse.text();

      setResponse(apiResponse);
      setResponseBody(body);
    } catch (error) {
      setResponse(null);
      setResponseBody(JSON.stringify(error));
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <Select
        defaultValue="GET"
        style={{ width: 80, marginRight: 16 }}
        onChange={(value) => setHttpMethod(value)}
      >
        <Option value="GET">GET</Option>
        <Option value="POST">POST</Option>
        <Option value="PUT">PUT</Option>
        <Option value="DELETE">DELETE</Option>
      </Select>

      <Input
        placeholder="Enter API Endpoint"
        value={apiEndpoint}
        onChange={(e) => setApiEndpoint(e.target.value)}
        onPressEnter={handleApiSubmit}
        style={{ width: '60%', marginRight: 16 }}
      />
      <Button type="primary" onClick={handleApiSubmit} disabled={loading}>
        Send
      </Button>

      {/* Loading indicator */}
      {loading && <Spin style={{ marginLeft: 8 }} />}

      <Tabs defaultActiveKey="params" style={{ marginTop: 16 }}>
        <TabPane tab="Params" key="params">
        <Table
            columns={columns}
            dataSource={paramsData}
            pagination={false}
            rowClassName={(record) => (record.enabled ? '' : 'placeholder-row')}
          />
        </TabPane>
        <TabPane tab="Authorization" key="authorization">
          {/* Add content for Authorization tab */}
        </TabPane>
        <TabPane tab="Headers" key="headers">
          {/* Add content for Headers tab */}
        </TabPane>
        <TabPane tab="Body" key="body">
          {/* Add content for Body tab */}
        </TabPane>
        <TabPane tab="Pre-request Script" key="pre-request-script">
          {/* Add content for Pre-request Script tab */}
        </TabPane>
        <TabPane tab="Tests" key="tests">
          {/* Add content for Test tab */}
        </TabPane>
        <TabPane tab="Settings" key="settings">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* ... (Existing settings controls) */}
            <Checkbox checked={enableSSL} onChange={(e) => setEnableSSL(e.target.checked)}>
              Enable SSL certificate verification
            </Checkbox>
            <Checkbox checked={verifySSL} onChange={(e) => setVerifySSL(e.target.checked)}>
              Automatically follow redirects
            </Checkbox>
            <Checkbox checked={verifySSL} onChange={(e) => setVerifySSL(e.target.checked)}>
              Follow original HTTP Method
            </Checkbox>
            <Checkbox checked={verifySSL} onChange={(e) => setVerifySSL(e.target.checked)}>
              Follow Authorization header
            </Checkbox>
            <Checkbox checked={verifySSL} onChange={(e) => setVerifySSL(e.target.checked)}>
              Remove referer header on redirect
            </Checkbox>
            <Checkbox checked={verifySSL} onChange={(e) => setVerifySSL(e.target.checked)}>
              Enable strict HTTP parser
            </Checkbox>
            {/* Add other settings controls here... */}
          </div>
        </TabPane>
      </Tabs>

      <Tabs defaultActiveKey="params" style={{ marginTop: 16 }}>
        {/* ... (Existing tabs) */}
        <TabPane tab="Response" key="response">
          {response && (
            <Tabs defaultActiveKey="body" style={{ marginTop: 16 }}>
            <TabPane tab="Body" key="body">
                <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{responseBody}</pre>
                </div>
              </TabPane>
              <TabPane tab="Cookies" key="cookies">
                {/* Add content for Cookies tab */}
              </TabPane>
              <TabPane tab="Headers" key="headers">
                {response.headers && (
                  <Table
                    columns={[
                      { title: 'Key', dataIndex: 'key', key: 'key' },
                      { title: 'Value', dataIndex: 'value', key: 'value' },
                    ]}
                    dataSource={Object.keys(response.headers).map((key) => ({
                      key,
                      name: key,
                      value: response.headers[key],
                    }))}
                    pagination={false}
                  />
                )}
              </TabPane>
              <TabPane tab="Test Results" key="testResults">
                {/* Add content for Test Results tab */}
              </TabPane>
            </Tabs>
          )}
          {!response && (
            <div>
              <p>No response received. Check the API endpoint and try again.</p>
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

// EditableCell component for inline cell editing
const EditableCell = ({ text, onEdit, dataIndex }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    onEdit && onEdit(value, dataIndex); // Pass dataIndex to identify the edited column
  };

  return editing ? (
    <AntInput value={value} onChange={handleChange} onBlur={handleBlur} onPressEnter={handleBlur} />
  ) : (
    <span onClick={handleEdit}>{text}</span>
  );
};

export default App;
