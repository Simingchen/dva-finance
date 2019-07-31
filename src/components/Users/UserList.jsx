// ./src/components/Users/UserList.jsx
import React from 'react';

// 采用antd的UI组件
import { Table, Popconfirm } from 'antd';

// 采用 stateless 的写法
const UserList = ({
    total,
    current,
    loading,
    dataSource,
}) => {
  const columns = [{
    title: '客户名称',
    dataIndex: 'cust_name',
    key: 'cust_name',
    render: (text) => <a href="/">{text}</a>,
  }, {
    title: '所属门店',
    dataIndex: 'belong_dept_name',
    key: 'belong_dept_name',
  }, {
    title: '客户经理',
    dataIndex: 'client_manager_name',
    key: 'client_manager_name',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={()=>{}}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={()=>{}}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

	// 定义分页对象
  const pagination = {
    total,
    current,
    pageSize: 10,
    onChange: ()=>{},
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.agency_id}
        pagination={pagination}
      />
    </div>
  );
}

export default UserList;