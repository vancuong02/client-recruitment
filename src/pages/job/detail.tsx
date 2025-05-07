import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IJob } from "@/types/backend";
import { callFetchJobById } from "@/config/api";
import styles from "styles/client.module.scss";
import parse from "html-react-parser";
import { Col, Divider, Row, Skeleton, Tag } from "antd";
import {
    DollarOutlined,
    EnvironmentOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import { getLocationName } from "@/config/utils";
import ApplyModal from "@/components/client/modal/apply.modal";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const ClientJobDetailPage = (props: any) => {
    const [jobDetail, setJobDetail] = useState<IJob | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // job id

    useEffect(() => {
        const init = async () => {
            if (id) {
                setIsLoading(true);
                const res = await callFetchJobById(id);
                if (res?.data) {
                    setJobDetail(res.data);
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
                <Skeleton />
            ) : (
                <Row gutter={[20, 20]}>
                    {jobDetail && jobDetail._id && (
                        <>
                            <Col span={24} md={16}>
                                <div className={styles["header"]}>
                                    {jobDetail.name}
                                </div>
                                <div>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className={styles["btn-apply"]}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                                <Divider />
                                <div className={styles["skills"]}>
                                    {jobDetail?.skills?.map((item, index) => {
                                        return (
                                            <Tag
                                                key={`${index}-key`}
                                                color="gold"
                                            >
                                                {item}
                                            </Tag>
                                        );
                                    })}
                                </div>
                                <div className={styles["salary"]}>
                                    <DollarOutlined />
                                    <span>
                                        &nbsp;
                                        {jobDetail.salary}
                                    </span>
                                </div>
                                <div className={styles["location"]}>
                                    <EnvironmentOutlined
                                        style={{ color: "#58aaab" }}
                                    />
                                    &nbsp;{getLocationName(jobDetail.location)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 500 }}>
                                        <HistoryOutlined />{" "}
                                        <span style={{ color: "#5D5D5D" }}>
                                            Đăng{" "}
                                            {dayjs(
                                                jobDetail.createdAt
                                            ).fromNow()}
                                        </span>{" "}
                                        <span style={{ color: "#292929" }}>
                                            và Công việc hết hạn trong{" "}
                                            {dayjs(jobDetail.endDate).fromNow(
                                                true
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <Divider />
                                {parse(jobDetail.description)}
                            </Col>

                            <Col span={24} md={8}>
                                <div className={styles["company"]}>
                                    <div>
                                        <img
                                            alt="example"
                                            src={jobDetail.company?.logo}
                                        />
                                    </div>
                                    <div>{jobDetail.company?.name}</div>
                                </div>
                            </Col>
                        </>
                    )}
                </Row>
            )}
            <ApplyModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                jobDetail={jobDetail}
            />
        </div>
    );
};
export default ClientJobDetailPage;
