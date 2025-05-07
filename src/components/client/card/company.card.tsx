import { callFetchCompany } from "@/config/api";
import { convertSlug } from "@/config/utils";
import { ICompany } from "@/types/backend";
import { Badge, Col, Empty, Pagination, Row, Spin } from "antd";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import styles from "styles/client.module.scss";
import { IoIosArrowForward } from "react-icons/io";

interface IProps {
    showPagination?: boolean;
}

const CompanyCard = (props: IProps) => {
    const { showPagination = false } = props;

    const [displayCompany, setDisplayCompany] = useState<ICompany[] | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompany();
    }, [current, pageSize, filter, sortQuery]);

    const fetchCompany = async () => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchCompany(query);
        if (res && res.data) {
            setDisplayCompany(res.data.result);
            setTotal(res.data.meta.totalItems);
        }
        setIsLoading(false);
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

    const handleViewDetailJob = (item: ICompany) => {
        if (item.name) {
            const slug = convertSlug(item.name);
            navigate(`/company/${slug}?id=${item._id}`);
        }
    };

    return (
        <div className={styles["company-content"]}>
            <Spin spinning={isLoading} tip="Loading...">
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <div
                            className={
                                isMobile
                                    ? styles["dflex-mobile"]
                                    : styles["dflex-pc"]
                            }
                        >
                            <span className={styles["title"]}>
                                Nhà Tuyển Dụng Hàng Đầu
                            </span>
                            {!showPagination && (
                                <Link to="company">Xem tất cả</Link>
                            )}
                        </div>
                    </Col>

                    {displayCompany?.map((item) => {
                        return (
                            <Col span={24} md={6} key={item._id}>
                                <div
                                    onClick={() => handleViewDetailJob(item)}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: 8,
                                        position: "relative",
                                        border: "1px solid #dedede",
                                        background:
                                            "linear-gradient(167deg, #F8F8F8 2.38%, #FFF 70.43%)",
                                    }}
                                >
                                    <div
                                        style={{
                                            margin: "30px auto 16px",
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            position: "relative",
                                            zIndex: 1,
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: 140,
                                                height: 140,
                                                borderRadius: 8,
                                                boxShadow:
                                                    "0px 4px 24px rgba(0, 0, 0, .12)",
                                            }}
                                            alt="example"
                                            src={item?.logo}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            zIndex: 0,
                                        }}
                                    >
                                        <img
                                            alt="example"
                                            style={{ width: "100%" }}
                                            src="/images/bg-top-empty.svg"
                                        />
                                    </div>
                                    <h3
                                        style={{
                                            minHeight: 52,
                                            padding: "0 16px",
                                            textAlign: "center",
                                        }}
                                    >
                                        {item.name}
                                    </h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "12px 16px",
                                            background: "#f7f7f7",
                                            color: "#414042",
                                        }}
                                    >
                                        <span>
                                            {item.location &&
                                                item.location.match(
                                                    /,\s*([^,]+)$/
                                                )?.[1]}
                                        </span>
                                        <div
                                            style={{
                                                gap: 4,
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Badge
                                                size="default"
                                                status="success"
                                            />
                                            <span>5 job</span>
                                            <IoIosArrowForward />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}

                    {(!displayCompany ||
                        (displayCompany && displayCompany.length === 0)) &&
                        !isLoading && (
                            <div className={styles["empty"]}>
                                <Empty description="Không có dữ liệu" />
                            </div>
                        )}
                </Row>
                {showPagination && (
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
            </Spin>
        </div>
    );
};

export default CompanyCard;
