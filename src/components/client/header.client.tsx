import { useState, useEffect } from 'react'
import {
    CodeOutlined,
    ContactsOutlined,
    DashOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    RiseOutlined,
    TwitterOutlined,
} from '@ant-design/icons'
import { Avatar, Drawer, Dropdown, MenuProps, Space, notification } from 'antd'
import { Menu } from 'antd'
import styles from '@/styles/client.module.scss'
import { isMobile } from 'react-device-detect'
import { FaReact } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { callLogout } from '@/config/api'
import { setLogoutAction } from '@/redux/slice/accountSlide'
import ManageAccount from './modal/manage.account'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated)
    const user = useAppSelector((state) => state.account.user)
    const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false)

    const [current, setCurrent] = useState('home')
    const location = useLocation()

    const [openMangeAccount, setOpenManageAccount] = useState<boolean>(false)

    useEffect(() => {
        setCurrent(location.pathname)
    }, [location])

    const items: MenuProps['items'] = [
        {
            label: <Link to={'/'}>Trang Chủ</Link>,
            key: '/',
            icon: <TwitterOutlined />,
        },
        {
            label: <Link to={'/job'}>Việc Làm IT</Link>,
            key: '/job',
            icon: <CodeOutlined />,
        },
        {
            label: <Link to={'/company'}>Top Công ty IT</Link>,
            key: '/company',
            icon: <RiseOutlined />,
        },
    ]

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key)
    }

    const handleLogout = async () => {
        try {
            await callLogout()
            dispatch(setLogoutAction({}))
            navigate('/')
        } catch (error) {}
    }

    const itemsDropdown = [
        {
            label: (
                <label style={{ cursor: 'pointer' }} onClick={() => setOpenManageAccount(true)}>
                    Quản lý tài khoản
                </label>
            ),
            key: 'manage-account',
            icon: <ContactsOutlined />,
        },
        {
            label: <Link to={'/admin'}>Trang Quản Trị</Link>,
            key: 'admin',
            icon: <DashOutlined />,
        },
        {
            label: (
                <label style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
                    Đăng xuất
                </label>
            ),
            key: 'logout',
            icon: <LogoutOutlined />,
        },
    ]

    const itemsMobiles = [...items, ...itemsDropdown]

    return (
        <>
            <div className={styles['header-section']}>
                <div className={styles['container']} style={{ height: '100%' }}>
                    {!isMobile ? (
                        <div
                            style={{
                                gap: 10,
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <div className={styles['brand']}>
                                <FaReact title="" onClick={() => navigate('/')} />
                            </div>
                            <div className={styles['top-menu']}>
                                <Menu
                                    style={{ width: '80%' }}
                                    items={items}
                                    mode="horizontal"
                                    selectedKeys={[current]}
                                />
                                <div className={styles['extra']}>
                                    {isAuthenticated === false ? (
                                        <Link to={'/login'} style={{ color: '#000000e0' }}>
                                            Đăng Nhập
                                        </Link>
                                    ) : (
                                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                            <Space style={{ cursor: 'pointer' }}>
                                                <Avatar>{user?.name?.substring(0, 2)?.toUpperCase()} </Avatar>
                                            </Space>
                                        </Dropdown>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles['header-mobile']}>
                            <span>Your APP</span>
                            <MenuFoldOutlined onClick={() => setOpenMobileMenu(true)} />
                        </div>
                    )}
                </div>
            </div>
            <Drawer title="Chức năng" placement="right" onClose={() => setOpenMobileMenu(false)} open={openMobileMenu}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={itemsMobiles} />
            </Drawer>
            <ManageAccount open={openMangeAccount} onClose={setOpenManageAccount} />
        </>
    )
}

export default Header
