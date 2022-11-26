import React from 'react';
import { Col, Image, Row } from '@pankod/refine-antd';

function SponsorsBanner() {
  return (
    <>
      <Row justify='space-around' align='middle'>
        <Col span={8}>
          <Image
            width={78}
            src="refine-logo.svg"
          />
          <Image
            width={78}
            src="supabase-logo.svg"
          />
      </Col>
      </Row>
    </>
  )
}

export default SponsorsBanner