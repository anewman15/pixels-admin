import React, { useState } from 'react';
import { useUpdate } from '@pankod/refine-core';
import {
  List,
  useEditableTable,
  useModal,
  Table,
  Form,
  Button,
  DeleteButton,
  Space,
  Tag,
  Modal
} from '@pankod/refine-antd';
import { TCanvas } from 'types/canvas';
import { LogList } from 'components/logs';

type TCanvasPromoteResult = {
  id: number,
  featured: boolean,
}

export const CanvasList = () => {
  const [currentCanvas, setCurrentCanvas] = useState({});
  const { modalProps, show, close } = useModal();
  const { tableProps, formProps } = useEditableTable<TCanvas>();
  const { mutate } = useUpdate<TCanvasPromoteResult>();

  return (
    <List>
      <Form {...formProps}>
        <Table {...tableProps} rowKey="id">
          <Table.Column<TCanvas> key="id" dataIndex="id" title="ID" />
          <Table.Column<TCanvas> key="name" dataIndex="name" title="Name" />
          <Table.Column<TCanvas>
            key="is_featured"
            dataIndex="is_featured"
            title="Featured"
            render={(_, record) =>
              record.is_featured ? (
                <Tag color="success">Yes</Tag>
              ) : (
                <Tag color="warning">No</Tag>
              )
            }
          />
          <Table.Column<TCanvas>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <Button
                  size="small"
                  type={record.is_featured ? "ghost" : "primary"}
                  onClick={() =>
                    mutate({
                      resource: "canvases",
                      id: record.id,
                      values: {
                        is_featured: !record.is_featured,
                      },
                      metaData: {
                        canvas_id: record.id,
                      },
                    })
                  }
                >
                  {record.is_featured ? "Unpromote" : "Promote"}
                </Button>
                <>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      setCurrentCanvas(record)
                      show();
                    }}
                  >
                    View Changes
                  </Button>
                </>
                <DeleteButton size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </Form>
      <Modal
        title="Canvas Changes"
        {...modalProps}
        centered
        destroyOnClose
        onOk={close}
        onCancel={() => {
          close();
          setCurrentCanvas({});
        }}
        footer={[
          <Button type="primary" key="close" onClick={close}>
            Close
          </Button>,
        ]}
      >
        <LogList currentCanvas={currentCanvas} />
      </Modal>
    </List>
  );
};
