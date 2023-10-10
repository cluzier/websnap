// ApiRequest.js
import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';

const { Option } = Select;

const ApiRequest = ({ apiEndpoint, httpMethod, setApiEndpoint, setHttpMethod, handleApiSubmit }) => {
  return (
    <div>
      <Select
        defaultValue={httpMethod}
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
      <Button type="primary" onClick={handleApiSubmit}>
        Send
      </Button>
    </div>
  );
};

export default ApiRequest;
