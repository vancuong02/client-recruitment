import { Col, Row, Space, Typography } from 'antd'
import { FacebookOutlined, LinkedinOutlined, YoutubeOutlined } from '@ant-design/icons'
import './footer.client.scss'
import styles from '@/styles/client.module.scss'
const { Text, Link } = Typography

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className={styles['container']}>
                <Row gutter={[20, 20]}>
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-column">
                            <h3>About Us</h3>
                            <ul>
                                <li>
                                    <Link href="/home">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about-us">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/ai-match-service">AI Match Service</Link>
                                </li>
                                <li>
                                    <Link href="/contact-us">Contact Us</Link>
                                </li>
                                <li>
                                    <Link href="/all-jobs">All Jobs</Link>
                                </li>
                                <li>
                                    <Link href="/faq">FAQ</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-column">
                            <h3>Campaign</h3>
                            <ul>
                                <li>
                                    <Link href="/it-story">IT Story</Link>
                                </li>
                                <li>
                                    <Link href="/writing-contest">Writing Contest</Link>
                                </li>
                                <li>
                                    <Link href="/featured-it-jobs">Featured IT Jobs</Link>
                                </li>
                                <li>
                                    <Link href="/annual-survey">Annual Survey</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-column">
                            <h3>Terms & Conditions</h3>
                            <ul>
                                <li>
                                    <Link href="/privacy-policy">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="/operating-regulation">Operating Regulation</Link>
                                </li>
                                <li>
                                    <Link href="/complaint-handling">Complaint Handling</Link>
                                </li>
                                <li>
                                    <Link href="/terms-conditions">Terms & Conditions</Link>
                                </li>
                                <li>
                                    <Link href="/press">Press</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-column">
                            <h3>Want to post a job? Contact us at:</h3>
                            <ul className="contact-info">
                                <li>Hồ Chí Minh: (+84) 977 460 519</li>
                                <li>Hà Nội: (+84) 983 131 351</li>
                                <li>Email: love@itviec.com</li>
                                <li>
                                    <Link href="/submit-contact">Submit contact Information</Link>
                                </li>
                            </ul>
                            <Space size="middle" className="social-icons">
                                <Link href="https://facebook.com" target="_blank">
                                    <FacebookOutlined />
                                </Link>
                                <Link href="https://linkedin.com" target="_blank">
                                    <LinkedinOutlined />
                                </Link>
                                <Link href="https://youtube.com" target="_blank">
                                    <YoutubeOutlined />
                                </Link>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer-bottom">
                <Text style={{ color: '#fff' }}>Copyright © IT VIEC JSC | Tax code: 0312192258</Text>
            </div>
        </footer>
    )
}

export default Footer
