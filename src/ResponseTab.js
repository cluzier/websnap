// ResponseTab.js
import React from 'react';
import { Tabs } from 'antd';

const ResponseTab = ({ response, responseBody }) => {
  return (
    <Tabs defaultActiveKey="1" style={{ marginTop: 16 }}>
        {response && (
          <div>
            <p>Status: {response.status}</p>
            <p>Headers: {JSON.stringify(response.headers)}</p>
            <p>Body: {responseBody}</p>
          </div>
        )}
        {!response && (
          <div>
            <p>Enter the URL and click Send to get a response</p>
          </div>
        )}
    </Tabs>
  );
};

export default ResponseTab;
