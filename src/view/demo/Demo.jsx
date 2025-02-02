import React from 'react'
import { Card } from 'antd'

const Demo = () => (
  <div className={`${WRAPPER_CLASS_NAME}`}>
    <Card title="Card title" bordered={false} style={{ width: 300 }}>
      <p>Card content1</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </div>
)

export default Demo
