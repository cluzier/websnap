import React, { useState } from "react";
import { Menu, Button } from "antd";
import { HistoryOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const SideMenu = ({
  history,
  onSelectHistory,
  onClearHistory,
  onSendRequest,
  onSettings,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ width: collapsed ? "80px" : "200px", borderRight: "1px solid #e8e8e8" }}>
      <Button type="link" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
      <Menu theme="light" mode="inline" selectable={false} inlineCollapsed={collapsed}>
        <Menu.Item key="history" onClick={onSelectHistory}>
          <HistoryOutlined />
          <span>History</span>
        </Menu.Item>
        <Menu.Item key="settings" onClick={onSettings}>
          <SettingOutlined />
          <span>Settings</span>
        </Menu.Item>
        {/* <Menu.Item key="clearHistory" onClick={onClearHistory}>
          <Button type="link" style={{ padding: 0 }}>
            Clear History
          </Button>
        </Menu.Item> */}
      </Menu>
    </div>
  );
};

export default SideMenu;
