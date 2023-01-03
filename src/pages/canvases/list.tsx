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
          <Table.Column<TCanvas>
            key="id"
            dataIndex="id"
            title={
              <h4 style={{ textAlign: "center", fontWeight: "bold" }}>ID</h4>
            }
          />
          <Table.Column<TCanvas>
            key="name"
            dataIndex="name"
            title={
              <h4 style={{ textAlign: "center", fontWeight: "bold" }}>Name</h4>
            }
          />
          <Table.Column<TCanvas>
            key="is_featured"
            dataIndex="is_featured"
            title={
              <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                Featured
              </h4>
            }
            render={(_, record) =>
              record.is_featured ? (
                <Tag
                  color="success"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Yes
                </Tag>
              ) : (
                <Tag
                  color="warning"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No
                </Tag>
              )
            }
          />
          <Table.Column<TCanvas>
            title={
              <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                Actions
              </h4>
            }
            dataIndex="actions"
            render={(_, record) => (
              <Space style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  size="small"
                  style={{ width: "100px" }}
                  type={record.is_featured ? "ghost" : "primary"}
                  onClick={() =>
                    mutate({
                      resource: "canvases",
                      id: record.id,
                      values: {
                        is_featured: !record.is_featured,
                      },
                      metaData: {
                        canvas: record,
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
                      setCurrentCanvas(record);
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
        title={<h3 style={{ fontWeight: "bold" }}>Canvas Changes</h3>}
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
