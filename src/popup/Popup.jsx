import React from 'react'
import {
  Form, Input, Button, Checkbox
} from 'antd'
import './Popup.scss'
import { go } from '../chrome'

const Popup = () => {
  const gotoPage = () => {
    go('../html/view.html')
  }

  return (
    <div className={`${WRAPPER_CLASS_NAME}`}>
      <Form
        layout="Vertical"
        name="basic"
        className="basic-table"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={gotoPage}
            className="form-button"
          >
            演示页面跳转
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Popup
