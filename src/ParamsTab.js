// ParamsTab.js
import React, { useState } from "react";
import { Form, Table } from "antd";
import EditableCell from "./EditableCell";

const ParamsTab = ({ data, columns, form }) => {
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (key) => {
    setEditingKey(key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const columnsWithEdit = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        form,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={components}
        bordered
        dataSource={data}
        columns={columnsWithEdit}
        rowClassName="editable-row"
        pagination={false}
        onRow={(record, rowIndex) => ({
          onClick: (event) => {
            // Check if the click is on the cell, not its children
            if (event.target.tagName !== "INPUT") {
              if (isEditing(record)) {
                cancel();
              } else {
                edit(record.key);
              }
            }
          },
        })}
      />
    </Form>
  );
};

export default ParamsTab;
