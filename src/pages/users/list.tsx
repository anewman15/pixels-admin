import React from 'react';
import {
  useTable,
  List,
  Table,
  Avatar,
  Icons
} from '@pankod/refine-antd';
import { TUser } from 'types/user';

const { UserOutlined } = Icons;

export const UserList = () => {
  const { tableProps } = useTable<TUser>();

  return (
    <List>
      <Table {...tableProps} rowKey={"id"}>
        <Table.Column
          dataIndex="avatar_url"
          title="Avatar"
          render={(_, record: TUser) => (
            <Avatar
              icon={<UserOutlined />}
              src={record.avatar_url}
              size={{ xs: 24, sm: 32, md: 40 }}
            />
          )}
        />
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column
          dataIndex="full_name"
          title="Full Name"
          render={(_, record: TUser) =>
            record.full_name ? record.full_name : <p>--</p>
          }
        />
        <Table.Column
          dataIndex="username"
          title="Username"
          render={(_, record: TUser) =>
            record.username ? record.username : <p>--</p>
          }
        />
      </Table>
    </List>
  );
};
