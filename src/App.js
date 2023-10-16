import React, { useState, useEffect } from "react";
import {
  Tabs,
  Input,
  Button,
  Select,
  Checkbox,
  Table,
  Input as AntInput,
  Spin,
} from "antd";
import "./App.css";
import packageJson from "../package.json";

const { TabPane } = Tabs;
const { Option } = Select;

function App() {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [httpMethod, setHttpMethod] = useState("GET");
  const [response, setResponse] = useState(null);
  const [responseBody, setResponseBody] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  // State for settings options
  const [enableSSL, setEnableSSL] = useState(false);
  const [verifySSL, setVerifySSL] = useState(false);

  const [responseFormat, setResponseFormat] = useState("pretty");

  const [version, setVersion] = useState("");

  // State for Params tab table data
  const [paramsData, setParamsData] = useState([
    { key: "Key", value: "Value", description: "Description", enabled: false },
    // Add more placeholder data as needed
  ]);

  const [cookiesData, setCookiesData] = useState([]);
  const [headersData, setHeadersData] = useState([]);

  useEffect(() => {
    setVersion(packageJson.version);
  }, []);

  // Columns for Params tab table
  const columns = [
    {
      title: "Enable",
      dataIndex: "enabled",
      render: (text, record) => (
        <Checkbox
          checked={text}
          onChange={(e) => handleCheckboxChange(record, e.target.checked)}
        />
      ),
    },
    {
      title: "Key",
      dataIndex: "key",
      render: (text, record) => (
        <EditableCell
          text={text}
          onEdit={(newText, dataIndex) =>
            handleCellEdit(record, newText, dataIndex)
          }
          dataIndex="key"
        />
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      render: (text, record) => (
        <EditableCell
          text={text}
          onEdit={(newText, dataIndex) =>
            handleCellEdit(record, newText, dataIndex)
          }
          dataIndex="value"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => (
        <EditableCell
          text={text}
          onEdit={(newText, dataIndex) =>
            handleCellEdit(record, newText, dataIndex)
          }
          dataIndex="description"
        />
      ),
    },
  ];

  const handleCheckboxChange = (record, checked) => {
    setParamsData((prevData) =>
      prevData.map((item) =>
        item.key === record.key ? { ...item, enabled: checked } : item
      )
    );
  };

  const handleCellEdit = (record, newText) => {
    setParamsData((prevData) =>
      prevData.map((item) =>
        item.key === record.key ? { ...item, value: newText } : item
      )
    );
  };

  const handleApiSubmit = async () => {
    try {
      setLoading(true);
  
      if (!apiEndpoint) {
        setResponse(null);
        setResponseBody("Enter the URL and click Send to get a response");
        return;
      }
  
      const apiResponse = await fetch(apiEndpoint, { method: httpMethod });
      const body = await apiResponse.text();
  
      setResponse(apiResponse);
      setResponseBody(body);
  
      // Extract and set headers
      const headers = {};
      apiResponse.headers.forEach((value, name) => {
        headers[name] = value;
      });
      const headersArray = Object.keys(headers).map((key) => ({
        key,
        value: headers[key],
      }));
      console.log("Headers Array:", headersArray);
      setHeadersData(headersArray);
  
      // Extract and set cookies
      const cookies = apiResponse.headers.get("set-cookie");
      console.log("Cookies:", cookies); // Log cookies here
      if (cookies) {
        const cookiesArray = cookies.split(";").map((cookie) => {
          const [name, ...valueParts] = cookie.trim().split("=");
          const value = valueParts.join("=");
          return { name, value };
        });
        setCookiesData(cookiesArray);
      } else {
        setCookiesData([]);
      }
    } catch (error) {
      setResponse(null);
      setResponseBody(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
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
          style={{ width: "60%", marginRight: 16 }}
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
              rowClassName={(record) =>
                record.enabled ? "" : "placeholder-row"
              }
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* ... (Existing settings controls) */}
              <Checkbox
                checked={enableSSL}
                onChange={(e) => setEnableSSL(e.target.checked)}
              >
                Enable SSL certificate verification
              </Checkbox>
              <Checkbox
                checked={verifySSL}
                onChange={(e) => setVerifySSL(e.target.checked)}
              >
                Automatically follow redirects
              </Checkbox>
              <Checkbox
                checked={verifySSL}
                onChange={(e) => setVerifySSL(e.target.checked)}
              >
                Follow original HTTP Method
              </Checkbox>
              <Checkbox
                checked={verifySSL}
                onChange={(e) => setVerifySSL(e.target.checked)}
              >
                Follow Authorization header
              </Checkbox>
              <Checkbox
                checked={verifySSL}
                onChange={(e) => setVerifySSL(e.target.checked)}
              >
                Remove referer header on redirect
              </Checkbox>
              <Checkbox
                checked={verifySSL}
                onChange={(e) => setVerifySSL(e.target.checked)}
              >
                Enable strict HTTP parser
              </Checkbox>
              {/* Add other settings controls here... */}
            </div>
          </TabPane>
        </Tabs>

        <Tabs defaultActiveKey="params" style={{ marginTop: 16 }}>
          {/* ... (Existing tabs) */}
          <TabPane tab="" key="response">
            {response && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  {["pretty", "raw", "preview", "visualize"].map((format) => (
                    <Button
                      key={format}
                      type={responseFormat === format ? "primary" : "default"}
                      onClick={() => setResponseFormat(format)}
                      style={{ marginRight: 8 }}
                    >
                      {format.charAt(0).toUpperCase() + format.slice(1)}
                    </Button>
                  ))}
                </div>

                {/* Add a conditional check for responseFormat */}
                {responseFormat === "pretty" && (
                  <Tabs defaultActiveKey="body" style={{ marginTop: 16 }}>
                    <TabPane tab="Body" key="body">
                      <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                          {JSON.stringify(JSON.parse(responseBody), null, 2)}
                        </pre>
                      </div>
                    </TabPane>
                    <TabPane tab="Cookies" key="cookies">
                      <Table
                        columns={[
                          { title: "Name", dataIndex: "name", key: "name" },
                          { title: "Value", dataIndex: "value", key: "value" },
                          { title: "Path", dataIndex: "path", key: "path" }, // Adjust columns as needed
                          {
                            title: "Expires",
                            dataIndex: "expires",
                            key: "expires",
                          },
                          {
                            title: "HTTPOnly",
                            dataIndex: "httpOnly",
                            key: "httpOnly",
                          },
                          {
                            title: "Secure",
                            dataIndex: "secure",
                            key: "secure",
                          },
                        ]}
                        dataSource={cookiesData}
                        pagination={false}
                      />
                    </TabPane>
                    <TabPane tab="Headers" key="headers">
                      <Table
                        columns={[
                          { title: "Key", dataIndex: "key", key: "key" },
                          { title: "Value", dataIndex: "value", key: "value" },
                        ]}
                        dataSource={headersData}
                        pagination={false}
                      />
                    </TabPane>
                    <TabPane tab="Test Results" key="testResults">
                      {/* Add content for Test Results tab */}
                    </TabPane>
                    {/* ... (other tabs) */}
                  </Tabs>
                )}

                {responseFormat === "raw" && (
                  <Tabs defaultActiveKey="body" style={{ marginTop: 16 }}>
                    <TabPane tab="Body" key="body">
                      <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                          {responseBody}
                        </pre>
                      </div>
                    </TabPane>
                    {/* ... (other tabs) */}
                  </Tabs>
                )}

                {/* Add rendering logic for other response formats (preview, visualize) here */}
              </div>
            )}
            {!response && (
              <div>
                <p>
                  No response received. Check the API endpoint and try again.
                </p>
              </div>
            )}
          </TabPane>
        </Tabs>
      </div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          fontSize: "10px",
          bottom: 0,
          backgroundColor: "#f0f0f0",
          padding: "5px",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        v{version} 🪴
      </div>
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
    <AntInput
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onPressEnter={handleBlur}
    />
  ) : (
    <span onClick={handleEdit}>{text}</span>
  );
};

export default App;
