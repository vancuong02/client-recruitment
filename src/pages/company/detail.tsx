import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ICompany } from "@/types/backend";
import { callFetchCompanyById } from "@/config/api";
import styles from "styles/client.module.scss";
import parse from "html-react-parser";
import { Col, Divider, Row, Skeleton } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const ClientCompanyDetailPage = (props: any) => {
    const [companyDetail, setCompanyDetail] = useState<ICompany | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // job id

    useEffect(() => {
        const init = async () => {
            if (id) {
                setIsLoading(true);
                const res = await callFetchCompanyById(id);
                if (res?.data) {
                    setCompanyDetail(res.data);
                }
                setIsLoading(false);
            }
        };
        init();
    }, [id]);

    return (
        <div
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
                <Row gutter={[20, 20]}>
                    {companyDetail && companyDetail._id && (
                        <>
                            <Col span={24} md={16}>
                                <div className={styles["header"]}>
                                    {companyDetail.name}
                                </div>

                                <div className={styles["location"]}>
                                    <EnvironmentOutlined
                                        style={{ color: "#58aaab" }}
                                    />
                                    &nbsp;{companyDetail?.location}
                                </div>

                                <Divider />
                                {parse(companyDetail?.description ?? "")}
                            </Col>

                            <Col span={24} md={8}>
                                <div className={styles["company"]}>
                                    <div>
                                        <img
                                            alt="example"
                                            src={companyDetail.logo}
                                        />
                                    </div>
                                    <div>{companyDetail?.name}</div>
                                </div>
                            </Col>
                        </>
                    )}
                </Row>
            )}
        </div>
    );
};
export default ClientCompanyDetailPage;
