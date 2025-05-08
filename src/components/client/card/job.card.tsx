import { callFetchJob } from "@/config/api";
import { LOCATION_LIST, convertSlug, getLocationName } from "@/config/utils";
import { IJob } from "@/types/backend";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Card, Col, Empty, Pagination, Row, Skeleton, Spin } from "antd";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import styles from "styles/client.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

interface IProps {
    showPagination?: boolean;
}

const JobCard = (props: IProps) => {
    const { showPagination = false } = props;

    const [displayJob, setDisplayJob] = useState<IJob[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const navigate = useNavigate();

    useEffect(() => {
        fetchJob();
    }, [current, pageSize, filter, sortQuery]);

    const fetchJob = async () => {
        setIsLoading(true);
        try {
            let query = `current=${current}&pageSize=${pageSize}`;
            if (filter) {
                query += `&${filter}`;
            }
            if (sortQuery) {
                query += `&${sortQuery}`;
            }

            const res = await callFetchJob(query);
            if (res && res.data) {
                setDisplayJob(res.data.result);
                setTotal(res.data.meta.total);
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const handleOnchangePage = (pagination: {
        current: number;
        pageSize: number;
    }) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
    };

    const handleViewDetailJob = (item: IJob) => {
        const slug = convertSlug(item.name);
        navigate(`/job/${slug}?id=${item._id}`);
    };

    return (
        <div className={`${styles["card-job-section"]}`}>
            {!showPagination && (
                <Col span={24}>
                    <div
                        style={{ marginBottom: 30 }}
                        className={
                            isMobile
                                ? styles["dflex-mobile"]
                                : styles["dflex-pc"]
                        }
                    >
                        <span className={styles["title"]}>
                            Công Việc Mới Nhất
                        </span>
                        <Link to="job">Xem tất cả</Link>
                    </div>
                </Col>
            )}
            <div className={`${styles["job-content"]}`}>
                {isLoading ? (
                    <Row gutter={[20, 20]}>
                        {Array.from({ length: pageSize }).map((_, index) => (
                            <Col span={24} md={12} key={index}>
                                <Card>
                                    <div className={styles["card-job-content"]}>
                                        <Skeleton.Image
                                            active
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 5,
                                            }}
                                        />
                                        <div
                                            className={styles["card-job-right"]}
                                            style={{ width: "100%" }}
                                        >
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
                                                    width: "60%",
                                                    height: 16,
                                                    marginBottom: 8,
                                                }}
                                            />
                                            <Skeleton.Input
                                                active
                                                block
                                                style={{
                                                    width: "40%",
                                                    height: 16,
                                                    marginBottom: 8,
                                                }}
                                            />
                                            <Skeleton.Input
                                                active
                                                block
                                                style={{
                                                    width: "30%",
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
                                    <Card
                                        size="small"
                                        title={null}
                                        hoverable
                                        onClick={() =>
                                            handleViewDetailJob(item)
                                        }
                                    >
                                        <div
                                            className={
                                                styles["card-job-content"]
                                            }
                                        >
                                            <div
                                                style={{
                                                    width: 100,
                                                    borderRadius: 5,
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    alt="example"
                                                    src={item?.company?.logo}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles["card-job-right"]
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles["job-title"]
                                                    }
                                                >
                                                    {item.name}
                                                </div>
                                                <div
                                                    className={
                                                        styles["job-location"]
                                                    }
                                                >
                                                    <EnvironmentOutlined
                                                        style={{
                                                            color: "#58aaab",
                                                        }}
                                                    />
                                                    &nbsp;
                                                    {getLocationName(
                                                        item.location
                                                    )}
                                                </div>
                                                <div>
                                                    <ThunderboltOutlined
                                                        style={{
                                                            color: "orange",
                                                        }}
                                                    />
                                                    &nbsp;
                                                    {(
                                                        item.salary + ""
                                                    )?.replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                    )}{" "}
                                                    đ
                                                </div>
                                                <div
                                                    className={
                                                        styles["job-updatedAt"]
                                                    }
                                                >
                                                    {dayjs(
                                                        item.updatedAt
                                                    ).fromNow()}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })}

                        {(!displayJob ||
                            (displayJob && displayJob.length === 0)) &&
                            !isLoading && (
                                <div className={styles["empty"]}>
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
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Pagination
                                current={current}
                                total={total}
                                pageSize={pageSize}
                                responsive
                                onChange={(p: number, s: number) =>
                                    handleOnchangePage({
                                        current: p,
                                        pageSize: s,
                                    })
                                }
                            />
                        </Row>
                    </>
                )}
            </div>
        </div>
    );
};

export default JobCard;
