import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { Button, Divider, Form, Input, message, notification } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { callLogin } from 'config/api'
import styles from 'styles/auth.module.scss'
import { setUserLoginInfo } from '@/redux/slice/accountSlide'

const LoginPage = () => {
    const navigate = useNavigate()
    const [isSubmit, setIsSubmit] = useState(false)
    const dispatch = useDispatch()
    const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated)

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    const callback = params?.get('callback')

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/'
        }
    }, [])

    const onFinish = async (values: any) => {
        setIsSubmit(true)
        try {
            const { username, password } = values
            const res = await callLogin(username, password)

            if (res?.data) {
                localStorage.setItem('access_token', res.data.access_token)
                dispatch(setUserLoginInfo(res.data.user))
                message.success('Đăng nhập thành công')
                navigate(callback ? callback : '/')
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 4,
                })
            }
        } catch (error) {
        } finally {
            setIsSubmit(false)
        }
    }

    return (
        <div className={styles['login-page']}>
            <main className={styles.main}>
                <div className={styles.container}>
                    <section className={styles.wrapper}>
                        <div className={styles.heading}>
                            <h2 className={`${styles.text} ${styles['text-large']}`}>Đăng Nhập</h2>
                            <Divider />
                        </div>
                        <Form name="basic" onFinish={onFinish} autoComplete="off">
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email không được để trống!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Mật khẩu không được để trống!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">
                                Chưa có tài khoản ?
                                <span>
                                    <Link to="/register"> Đăng Ký </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default LoginPage
