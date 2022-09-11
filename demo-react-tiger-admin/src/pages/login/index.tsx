import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, SafetyCertificateOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Row } from 'antd';
import { LoginParamsType } from '../../typings/login'
import { RouteComponentProps, useHistory } from 'react-router'
import { ProjectName, StoreKey } from '@/common/constants'
import { useStore } from '@/store'
import logo from '@/assets/logo.svg'
import code from '@/assets/login-code.png'
import { useTitle } from 'ahooks'
import './login.less'

// 登录界面
const Login: React.FC<RouteComponentProps> = () => {
  const [form] = Form.useForm<{ username: string; password: string; vercode: string }>();
  const [ loading, setLoading ] = useState(false);
  const { userStore } = useStore();
  const history = useHistory()
  const rules = {
    username: [
      { required: true, message: '请填写用户名', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请填写密码', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
    ],
    vercode: [{ required: true, message: '请填写验证码', trigger: 'blur' }],
  };
  useTitle(`登录 - ${ProjectName}`);

  const { validateFields } = form

  const handleCaptcha = () => {
    // setCaptch(code)
  }

  // 提交表单验证字段
  const onFinish = () => {
    validateFields().then(
      async (values: LoginParamsType) => {
        const params = Object.assign(values, {key: '1111'});
        // 先登录验证
        userStore.login(params).then(
          async (res) => {
            if (res) {
              localStorage.setItem(StoreKey, JSON.stringify(res));
              await userStore.getInfo();
              history.push('basic/dashboard');
              setTimeout(() => {
                message.success('欢迎回来');
              });
            }
          }
        ).catch((e: any) => {
          console.error(e);
          handleCaptcha();
          setLoading(false);
        });
      }
    ).catch((e: any) => {
      console.error(e);
      setLoading(false);
    });
  }

  return (
    <div className="app-login">
      <Form
        className="app-login-from"
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        initiaValues={{
          username: 'admin',
          password: '123456',
          vercode: 'HWFB',
        }}
      >
        <h1>
          <img style={{width: 60}} src={logo} alt=""/>
          {ProjectName}
        </h1>

        <Form.Item name="username" rules={rules.username} hasFeedback>
          <Input size="large" autoComplete="off" prefix={<UserOutlined/>} placeholder="用户名" />
        </Form.Item>

        <Form.Item name="password" rules={rules.password} hasFeedback>
          <Input.Password
            autoComplete="off"
            size="large"
            prefix={<UnlockOutlined/>}
            placeholder="密码"
            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
          />
        </Form.Item>

        <Form.Item className="imgcode-item">
          <Form.Item name="vercode" rules={rules.vercode}>
            <Input
              className="captch-input"
              size="large"
              maxLength={4}
              autoComplete="off"
              prefix={<SafetyCertificateOutlined/>}
              placeholder="图形验证码"
            />
          </Form.Item>
          <span className="captch-wrap" onClick={handleCaptcha}>
            <img src={code} className="captcha" title="图形验证码" alt="图形验证码" />
          </span>
        </Form.Item>

        <Row>
          <Button block size="large" type="primary" htmlType="submit" loading={loading}>登录</Button>
        </Row>

      </Form>
    </div>
  );
}

export default Login;
