import React from 'react';
import { useLogList } from '@pankod/refine-core';
import { Space, Spin } from '@pankod/refine-antd';

type TLogListProps = {
  canvasId: string;
};

export const LogList = ({ canvasId }: TLogListProps) => {
  const { isLoading, data } = useLogList({
    resource: "canvases",
    meta: {
      id: "corny-plush-music",
    },
  });

  if (isLoading) { return <Space direction="vertical"><Spin /></Space>}

  return (
    <Space direction="vertical">
      {
        data?.length === 0 ? (
          <Space>No pixels added yet.</Space>
        ) :
        data?.map((log: any) => <Space key={log.id}>{JSON.stringify(log?.author)}</Space>)
      }
    </Space>
  );
};
