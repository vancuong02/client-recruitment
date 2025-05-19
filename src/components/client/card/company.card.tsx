import { callFetchCompany } from '@/config/api'
import { convertSlug } from '@/config/utils'
import { ICompany } from '@/types/backend'
import { Badge, Col, Empty, Pagination, Row, Skeleton } from 'antd'
import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { Link, useNavigate } from 'react-router-dom'
import styles from 'styles/client.module.scss'
import { IoIosArrowForward } from 'react-icons/io'

interface IProps {
    showPagination?: boolean
}

const PAGE = 1
const LIMIT = 8
const CompanyCard = (props: IProps) => {
    const { showPagination = false } = props

    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [displayCompany, setDisplayCompany] = useState<ICompany[] | null>(null)

    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search)
    const [page, setPage] = useState(() => {
        const pageParam = urlParams.get('page')
        return Number(pageParam) || PAGE
    })

    const [limit, setLimit] = useState(() => {
        const limitParam = urlParams.get('limit')
        return Number(limitParam) || LIMIT
    })

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const query = `current=${page}&pageSize=${limit}`
                const res = await callFetchCompany(query)
                if (res && res.data) {
                    setDisplayCompany(res.data.result)
                    setTotal(res.data.meta.total)
                }
            } catch (error) {
            } finally {
                setIsLoading(false)
            }
        }
        fetchCompany()
    }, [page, limit])

    const handleOnchangePage = (pagination: { current: number; pageSize: number }) => {
        if (pagination && pagination.current !== page) {
            setPage(pagination.current)
            urlParams.set('page', pagination.current.toString())
        }
        if (pagination && pagination.pageSize !== limit) {
            setLimit(pagination.pageSize)
            setPage(1)
            urlParams.set('page', PAGE.toString())
            urlParams.set('limit', pagination.pageSize.toString())
        }
        navigate(`?${urlParams.toString()}`)
    }

    const handleViewDetailJob = (item: ICompany) => {
        if (item.name) {
            const slug = convertSlug(item.name)
            navigate(`/company/${slug}?id=${item._id}`)
        }
    }

    return (
        <div className={styles['company-content']}>
            {!showPagination && (
                <Col span={24}>
                    <div
                        style={{ margin: '30px 0 15px' }}
                        className={isMobile ? styles['dflex-mobile'] : styles['dflex-pc']}
                    >
                        <span className={styles['title']}>Nhà Tuyển Dụng Hàng Đầu</span>
                        <Link to="company">Xem tất cả</Link>
                    </div>
                </Col>
            )}

            {isLoading ? (
                <Row gutter={[20, 20]}>
                    {Array.from({ length: limit }).map((_, index) => (
                        <Col span={24} md={6} key={index}>
                            <div
                                style={{
                                    padding: '20px',
                                    border: '1px solid #dedede',
                                    borderRadius: 8,
                                }}
                            >
                                <Skeleton.Image
                                    active
                                    style={{
                                        width: 140,
                                        height: 140,
                                        margin: '0 auto 20px',
                                    }}
                                />
                                <Skeleton.Input active block style={{ height: 32 }} />
                                <div style={{ marginTop: 20 }}>
                                    <Skeleton.Input active block style={{ height: 24 }} />
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Row gutter={[20, 20]}>
                    {displayCompany?.map((item) => {
                        return (
                            <Col span={24} md={6} key={item._id}>
                                <div
                                    onClick={() => handleViewDetailJob(item)}
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: 8,
                                        position: 'relative',
                                        border: '1px solid #dedede',
                                        overflow: 'hidden',
                                        background: 'linear-gradient(167deg, #F8F8F8 2.38%, #FFF 70.43%)',
                                    }}
                                >
                                    <div
                                        style={{
                                            margin: '30px auto 16px',
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            zIndex: 1,
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: 140,
                                                height: 140,
                                                borderRadius: 8,
                                                boxShadow: '0px 4px 24px rgba(0, 0, 0, .12)',
                                            }}
                                            alt="example"
                                            src={item?.logo}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            zIndex: 0,
                                        }}
                                    >
                                        <img alt="example" style={{ width: '100%' }} src="/images/bg-top-empty.svg" />
                                    </div>
                                    <h3
                                        style={{
                                            minHeight: 52,
                                            padding: '0 16px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {item.name}
                                    </h3>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '12px 16px',
                                            background: '#f7f7f7',
                                            color: '#414042',
                                        }}
                                    >
                                        <span>{item.location && item.location.match(/,\s*([^,]+)$/)?.[1]}</span>
                                        {item.jobCount > 0 && (
                                            <div
                                                style={{
                                                    gap: 4,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Badge size="default" status="success" />
                                                <span>{item.jobCount} job</span>
                                                <IoIosArrowForward />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                    {(!displayCompany || (displayCompany && displayCompany.length === 0)) && !isLoading && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                padding: 50,
                            }}
                        >
                            <Empty description="Không có dữ liệu" />
                        </div>
                    )}
                </Row>
            )}

            {displayCompany && displayCompany.length > 0 && showPagination && (
                <Row
                    style={{
                        marginTop: 30,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Pagination
                        current={page}
                        total={total}
                        pageSize={limit}
                        responsive
                        onChange={(p: number, s: number) =>
                            handleOnchangePage({
                                current: p,
                                pageSize: s,
                            })
                        }
                    />
                </Row>
            )}
        </div>
    )
}

export default CompanyCard
