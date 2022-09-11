// 通用界面样式
import React, { useState } from 'react';
import { Table, Radio, Divider, Card } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: any) => text,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: any) => {
    return {
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    };
  }
};

const Demo = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <Card>
      <Radio.Group onChange={({ target: { value } }) => { setSelectionType(value) }} value={selectionType}>
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">Radio</Radio>
      </Radio.Group>

      <Divider/>

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export default Demo;
