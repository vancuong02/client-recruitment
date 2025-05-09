import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ICompany, IJob } from "@/types/backend";
import { callFetchCompanyById, callFetchJobByCompany } from "@/config/api";
import styles from "styles/client.module.scss";
import parse from "html-react-parser";
import { Card, Col, Divider, Empty, Row, Skeleton } from "antd";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { convertSlug, getLocationName } from "@/config/utils";

const ClientCompanyDetailPage = (props: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [jobByCompany, setJobByCompany] = useState<IJob[]>([]);
    const [companyDetail, setCompanyDetail] = useState<ICompany | null>(null);

    const navigate = useNavigate();
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id");

    useEffect(() => {
        const init = async () => {
            if (!id) return;
            try {
                const [company, jobs] = await Promise.all([
                    callFetchCompanyById(id),
                    callFetchJobByCompany(id),
                ]);

                setCompanyDetail(company?.data ?? null);
                setJobByCompany(jobs?.data ?? []);
            } catch (error) {
                setCompanyDetail(null);
                setJobByCompany([]);
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, [id]);

    const handleViewDetailJob = (item: IJob) => {
        const slug = convertSlug(item.name);
        navigate(`/job/${slug}?id=${item._id}`);
    };

    return (
        <div
            style={{ marginTop: 25 }}
            className={`${styles["container"]} ${styles["detail-job-section"]}`}
        >
            {isLoading ? (
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col span={24} md={16}>
                        <Skeleton.Input
                            active
                            block
                            style={{ height: 40, marginBottom: 20 }}
                        />
                        <Skeleton.Input
                            active
                            block
                            style={{
                                width: "40%",
                                height: 24,
                                marginBottom: 20,
                            }}
                        />
                        <Divider />
                        <Skeleton active paragraph={{ rows: 10 }} />
                    </Col>
                    <Col span={24} md={8}>
                        <div
                            className={styles["company"]}
                            style={{ textAlign: "center" }}
                        >
                            <Skeleton.Image
                                active
                                style={{
                                    width: 200,
                                    height: 200,
                                    marginBottom: 20,
                                }}
                            />
                            <Skeleton.Input active style={{ width: "60%" }} />
                        </div>
                    </Col>
                </Row>
            ) : (
                <>
                    {companyDetail && companyDetail._id && (
                        <Row gutter={[30, 20]}>
                            <Col span={24} md={16}>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 15,
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: 5,
                                            width: 150,
                                            height: 130,
                                            borderRadius: 10,
                                            overflow: "hidden",
                                            border: "1px solid #e8e8e8",
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 10,
                                                objectFit: "contain",
                                            }}
                                            alt="example"
                                            src={companyDetail.logo}
                                        />
                                    </div>
                                    <div>
                                        <p
                                            style={{
                                                fontSize: 24,
                                                marginBottom: 5,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {companyDetail.name}
                                        </p>

                                        <div>
                                            <EnvironmentOutlined
                                                style={{ color: "#58aaab" }}
                                            />
                                            &nbsp;{companyDetail?.location}
                                        </div>
                                    </div>
                                </div>

                                <Divider />
                                {parse(companyDetail?.description ?? "")}
                            </Col>

                            <Col span={24} md={8} style={{ width: "100%" }}>
                                <div>
                                    <p
                                        style={{
                                            fontSize: 20,
                                            marginBottom: 10,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Vị trí tuyển dụng
                                    </p>
                                    <div
                                        style={{
                                            gap: 10,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        {jobByCompany?.map((item) => {
                                            return (
                                                <Card
                                                    style={{ width: "100%" }}
                                                    key={item._id}
                                                    size="small"
                                                    title={null}
                                                    hoverable
                                                    onClick={() =>
                                                        handleViewDetailJob(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                maxWidth: 50,
                                                                borderRadius: 5,
                                                                overflow:
                                                                    "hidden",
                                                            }}
                                                        >
                                                            <img
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                                alt="example"
                                                                src={
                                                                    item
                                                                        ?.companyId
                                                                        ?.logo
                                                                }
                                                            />
                                                        </div>
                                                        <div
                                                            className={
                                                                styles[
                                                                    "card-job-right"
                                                                ]
                                                            }
                                                        >
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                {item.name}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles[
                                                                        "job-location"
                                                                    ]
                                                                }
                                                            >
                                                                <EnvironmentOutlined
                                                                    style={{
                                                                        color: "#58aaab",
                                                                    }}
                                                                />
                                                                &nbsp;
                                                                {getLocationName(
                                                                    item
                                                                        .locations[0]
                                                                )}
                                                            </div>
                                                            <div>
                                                                <ThunderboltOutlined
                                                                    style={{
                                                                        color: "orange",
                                                                    }}
                                                                />
                                                                &nbsp;
                                                                {item.salary}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            );
                                        })}
                                    </div>

                                    {(!jobByCompany ||
                                        (jobByCompany &&
                                            jobByCompany.length === 0)) &&
                                        !isLoading && (
                                            <div className={styles["empty"]}>
                                                <Empty description="Không có dữ liệu" />
                                            </div>
                                        )}
                                </div>
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </div>
    );
};
export default ClientCompanyDetailPage;
