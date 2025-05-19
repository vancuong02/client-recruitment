import { useState, useEffect, useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Col, Empty, Pagination, Row, Skeleton } from 'antd'
import { EnvironmentOutlined, ThunderboltOutlined } from '@ant-design/icons'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
dayjs.extend(relativeTime)
dayjs.locale('vi')

import { IJob } from '@/types/backend'
import { callFetchJob } from '@/config/api'
import styles from 'styles/client.module.scss'
import { convertSlug, getLocationName } from '@/config/utils'

interface IProps {
    showPagination?: boolean
}

interface IQueryParams {
    current?: number
    pageSize?: number
    skills?: string
    locations: string
    levels?: string
    typeWorks?: string
    typeContracts?: string
}

const PAGE = 1
const LIMIT = 10
const JobCard = (props: IProps) => {
    const { showPagination = false } = props

    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [displayJob, setDisplayJob] = useState<IJob[] | null>(null)

    const searchParams = new URLSearchParams(window.location.search)

    // Tối ưu việc lấy các filter params
    const [queryParams, setQueryParams] = useState<IQueryParams>({
        current: Number(searchParams.get('page')) || PAGE,
        pageSize: Number(searchParams.get('limit')) || LIMIT,
        skills: searchParams.get('skills') || '',
        locations: searchParams.get('location') || '',
        levels: searchParams.get('levels') || '',
        typeWorks: searchParams.get('typeWorks') || '',
        typeContracts: searchParams.get('typeContracts') || '',
    })

    useEffect(() => {
        setQueryParams({
            current: Number(searchParams.get('page')) || PAGE,
            pageSize: Number(searchParams.get('limit')) || LIMIT,
            skills: searchParams.get('skills') || '',
            locations: searchParams.get('location') || '',
            levels: searchParams.get('levels') || '',
            typeWorks: searchParams.get('typeWorks') || '',
            typeContracts: searchParams.get('typeContracts') || '',
        })
    }, [location.search])

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const queryString = new URLSearchParams(
                    Object.fromEntries(Object.entries(queryParams).filter(([_, value]) => value !== '')),
                ).toString()
                const res = await callFetchJob(queryString)
                if (res?.data) {
                    setDisplayJob(res.data.result)
                    setTotal(res.data.meta.total)
                }
            } catch (error) {
                console.error('Error fetching jobs:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchJob()
    }, [queryParams])

    const handleOnchangePage = (pagination: { page: number; limit: number }) => {
        if (pagination && pagination.page !== queryParams.current) {
            setQueryParams({
                ...queryParams,
                current: pagination.page,
            })
            searchParams.set('page', pagination.page.toString())
        }
        if (pagination && pagination.limit !== queryParams.pageSize) {
            setQueryParams({
                ...queryParams,
                current: PAGE,
                pageSize: pagination.limit,
            })
            searchParams.set('page', PAGE.toString())
            searchParams.set('limit', pagination.limit.toString())
        }
        navigate(`/job?${searchParams.toString()}`)
    }

    const handleViewDetailJob = (item: IJob) => {
        const slug = convertSlug(item.name)
        navigate(`/job/${slug}?id=${item._id}`)
    }

    return (
        <div className={`${styles['card-job-section']}`}>
            {!showPagination && (
                <Col span={24}>
                    <div
                        style={{ marginBottom: 15 }}
                        className={isMobile ? styles['dflex-mobile'] : styles['dflex-pc']}
                    >
                        <span className={styles['title']}>Công Việc Mới Nhất</span>
                        <Link to="job">Xem tất cả</Link>
                    </div>
                </Col>
            )}
            <div className={`${styles['job-content']}`}>
                {isLoading ? (
                    <Row gutter={[20, 20]}>
                        {Array.from({
                            length: 6,
                        }).map((_, index) => (
                            <Col span={24} md={12} key={index}>
                                <Card>
                                    <div className={styles['card-job-content']}>
                                        <Skeleton.Image
                                            active
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 5,
                                            }}
                                        />
                                        <div className={styles['card-job-right']} style={{ width: '100%' }}>
                                            <Skeleton.Input
                                                active
                                                block
                                                style={{
                                                    height: 24,
                                                    marginBottom: 12,
                                                }}
                                            />
                                            <Skeleton.Input
                                                active
                                                block
                                                style={{
                                                    width: '60%',
                                                    height: 16,
                                                    marginBottom: 8,
                                                }}
                                            />
                                            <Skeleton.Input
                                                active
                                                block
                                                style={{
                                                    width: '40%',
                                                    height: 16,
                                                    marginBottom: 8,
                                                }}
                                            />
                                            <Skeleton.Input
                                                active
                                                block
                                                style={{
                                                    width: '30%',
                                                    height: 16,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Row gutter={[20, 20]}>
                        {displayJob?.map((item) => {
                            return (
                                <Col span={24} md={12} key={item._id}>
                                    <Card size="small" title={null} hoverable onClick={() => handleViewDetailJob(item)}>
                                        <div className={styles['card-job-content']}>
                                            <div
                                                style={{
                                                    width: 100,
                                                    borderRadius: 5,
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    alt="example"
                                                    src={item?.companyId?.logo}
                                                />
                                            </div>
                                            <div className={styles['card-job-right']}>
                                                <div className={styles['job-title']}>{item.name}</div>
                                                <div className={styles['job-location']}>
                                                    <EnvironmentOutlined
                                                        style={{
                                                            color: '#58aaab',
                                                        }}
                                                    />
                                                    &nbsp;
                                                    {getLocationName(item.locations[0])}
                                                </div>
                                                <div>
                                                    <ThunderboltOutlined
                                                        style={{
                                                            color: 'orange',
                                                        }}
                                                    />
                                                    &nbsp;
                                                    {item.salary}
                                                </div>
                                                <div className={styles['job-updatedAt']}>
                                                    {dayjs(item.updatedAt).fromNow()}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            )
                        })}

                        {(!displayJob || (displayJob && displayJob.length === 0)) && !isLoading && (
                            <div className={styles['empty']}>
                                <Empty description="Không có dữ liệu" />
                            </div>
                        )}
                    </Row>
                )}
                {showPagination && !isLoading && (
                    <>
                        <div style={{ marginTop: 30 }}></div>
                        <Row
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Pagination
                                current={queryParams.current}
                                total={total}
                                pageSize={queryParams.pageSize}
                                responsive
                                onChange={(p: number, s: number) =>
                                    handleOnchangePage({
                                        page: p,
                                        limit: s,
                                    })
                                }
                            />
                        </Row>
                    </>
                )}
            </div>
        </div>
    )
}

export default JobCard
