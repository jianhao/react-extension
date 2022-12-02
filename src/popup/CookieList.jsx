import React, { useEffect, useState } from 'react'
import {
  Form, Button, Select, message
} from 'antd'
import './CookieList.scss'

const { Item: FormItem, useForm } = Form

const Popup = () => {
  const [form] = useForm()
  const [cookies, setCookies] = useState([]) // 所有 cookie
  const [domains, setDomains] = useState([]) // 所有 domain

  useEffect(() => {
    chrome.cookies.getAll({}).then((allCookies) => {
      const cookieList = allCookies.filter(({ domain }) => /192|127|localhost|moresec/.test(domain))
      const domainList = Array.from(new Set(cookieList.map(({ domain }) => domain)))
      console.log(cookieList)
      setDomains(domainList)
      setCookies(cookieList)
    })
  }, [])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const { domain } = values
      chrome.tabs.query({
        active: true,
        currentWindow: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
      }).then((tabs) => {
        const tab = tabs[0]
        chrome.tabs.sendMessage(
          tab.id,
          { cookies: cookies.filter((item) => item.domain === domain) },
        ).then((response) => {
          console.log('写入指令发送成功', response)
          message.success('cookie 写入成功~')
        }).catch((err) => console.log('写入指令发送失败', err))
      })
    })
  }

  return (
    <div>
      <Form
        layout="Vertical"
        name="basic"
        form={form}
        className="cookie-list-wrap"
      >
        <div className="friendly-tips">Happy Debugging, Happy Life! 选择一个域名，将其对应 cookie写入到当前域名下。</div>
        <FormItem
          label=""
          name="domain"
        >
          <Select
            showSearch
            listHeight={100}
            placeholder="请选择cookie来源域名"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={(domains || []).map((domain) => ({ label: domain, value: domain }))}
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="form-button"
          >
            写入 Cookie
          </Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default Popup
