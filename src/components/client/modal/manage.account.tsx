import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Table,
    Tabs,
    message,
    notification,
} from "antd";
import { isMobile } from "react-device-detect";
import type { TabsProps } from "antd";
import { IResume } from "@/types/backend";
import { useState, useEffect } from "react";
import {
    callChangePassword,
    callCreateSubscriber,
    callFetchResumeByUser,
    callGetSubscriberSkills,
    callUpdateSubscriber,
    callUpdateUser,
    callUserById,
} from "@/config/api";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { MonitorOutlined } from "@ant-design/icons";
import { SKILLS_LIST } from "@/config/utils";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setUserLoginInfo } from "@/redux/slice/accountSlide";

interface IProps {
    open: boolean;
    onClose: (v: boolean) => void;
}

const UserResume = () => {
    const [listCV, setListCV] = useState<IResume[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            setIsFetching(true);
            const res = await callFetchResumeByUser();
            if (res && res.data) {
                setListCV(res.data as IResume[]);
            }
            setIsFetching(false);
        };
        init();
    }, []);

    const columns: ColumnsType<IResume> = [
        {
            title: "STT",
            key: "index",
            width: 50,
            align: "center",
            render: (text, record, index) => {
                return <>{index + 1}</>;
            },
        },
        {
            title: "Công Ty",
            dataIndex: ["companyId", "name"],
        },
        {
            title: "Vị trí",
            dataIndex: ["jobId", "name"],
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
        },
        {
            title: "Ngày rải CV",
            dataIndex: "createdAt",
            render(value, record, index) {
                return (
                    <>{dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss")}</>
                );
            },
        },
        {
            title: "",
            dataIndex: "",
            render(value, record, index) {
                return (
                    <a href={record?.url} target="_blank">
                        Chi tiết
                    </a>
                );
            },
        },
    ];

    return (
        <div>
            <Table<IResume>
                columns={columns}
                dataSource={listCV}
                loading={isFetching}
                pagination={false}
            />
        </div>
    );
};

const UserUpdateInfo = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const user = useAppSelector((state) => state.account.user);

    useEffect(() => {
        const fetchDetailUser = async () => {
            const res = await callUserById(user._id);
            if (res && res.data) {
                form.setFieldsValue({
                    name: res.data.name,
                    age: res.data.age,
                    address: res.data.address,
                    gender: res.data.gender,
                });
            }
        };
        fetchDetailUser();
    }, []);

    const onFinish = async (values: any) => {
        setIsSubmitting(true);
        try {
            const res = await callUpdateUser(values);
            if (res.data) {
                dispatch(setUserLoginInfo(res.data));
                message.success("Cập nhật thông tin thành công");
            }
        } catch (error: any) {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    error?.response?.data?.message ||
                    "Đã có lỗi xảy ra, vui lòng thử lại sau",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            form={form}
            name="user-update-info"
            onFinish={onFinish}
            layout="vertical"
        >
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Tuổi"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tuổi!",
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập địa chỉ!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Giới tính"
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn giới tính!",
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { label: "Nam", value: "MALE" },
                                { label: "Nữ", value: "FEMALE" },
                                { label: "Khác", value: "OTHER" },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                    >
                        Cập nhật thông tin
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const JobByEmail = () => {
    const [form] = Form.useForm();
    const user = useAppSelector((state) => state.account.user);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isExistingSubscriber, setIsExistingSubscriber] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const res = await callGetSubscriberSkills();
                if (res?.data) {
                    form.setFieldValue("skills", res.data.skills);
                    setIsExistingSubscriber(true);
                }
            } catch (error) {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: "Không thể tải thông tin đăng ký",
                });
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    const onFinish = async (values: any) => {
        const { skills } = values;
        setIsSubmitting(true);
        try {
            const payload = {
                email: user.email,
                name: user.name,
                skills: skills ?? [],
            };

            const res = isExistingSubscriber
                ? await callUpdateSubscriber(payload)
                : await callCreateSubscriber(payload);

            if (res.data) {
                message.success(
                    isExistingSubscriber
                        ? "Cập nhật thông tin thành công"
                        : "Đăng ký nhận thông báo thành công"
                );
            }
        } catch (error: any) {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    error?.response?.data?.message ||
                    "Đã có lỗi xảy ra, vui lòng thử lại sau",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form onFinish={onFinish} form={form}>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Form.Item
                        label={"Kỹ năng"}
                        name={"skills"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn ít nhất 1 skill!",
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            showArrow={false}
                            style={{ width: "100%" }}
                            placeholder={
                                <>
                                    <MonitorOutlined /> Tìm theo kỹ năng...
                                </>
                            }
                            optionLabelProp="label"
                            options={SKILLS_LIST}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Button
                        loading={isSubmitting}
                        disabled={isLoading}
                        onClick={() => form.submit()}
                    >
                        {isExistingSubscriber ? "Cập nhật" : "Đăng ký"}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const UserChangePassword = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        const { currentPassword, newPassword } = values;
        setIsSubmitting(true);
        try {
            const res = await callChangePassword({
                currentPassword,
                newPassword,
            });
            notification.success({
                message: "",
                description: res.message,
                duration: 2,
            });
            form.resetFields();
        } catch (error) {
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Đã có lỗi xảy ra, vui lòng thử lại sau",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            form={form}
            name="change-password"
            onFinish={onFinish}
            layout="vertical"
        >
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <Form.Item
                        label="Mật khẩu hiện tại"
                        name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu hiện tại!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu mới!",
                            },
                            {
                                min: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label="Xác nhận mật khẩu mới"
                        name="confirmPassword"
                        dependencies={["newPassword"]}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng xác nhận mật khẩu mới!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("newPassword") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Mật khẩu xác nhận không khớp!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                    >
                        Thay đổi mật khẩu
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

const ManageAccount = (props: IProps) => {
    const { open, onClose } = props;

    const items: TabsProps["items"] = [
        {
            key: "user-resume",
            label: `Rải CV`,
            children: <UserResume />,
        },
        {
            key: "email-by-skills",
            label: `Nhận Jobs qua Email`,
            children: <JobByEmail />,
        },
        {
            key: "user-update-info",
            label: `Cập nhật thông tin`,
            children: <UserUpdateInfo />,
        },
        {
            key: "user-password",
            label: `Thay đổi mật khẩu`,
            children: <UserChangePassword />,
        },
    ];

    return (
        <Modal
            title="Quản lý tài khoản"
            open={open}
            onCancel={() => onClose(false)}
            maskClosable={false}
            footer={null}
            destroyOnClose={true}
            width={isMobile ? "100%" : "1000px"}
        >
            <div style={{ minHeight: 400 }}>
                <Tabs defaultActiveKey="user-resume" items={items} />
            </div>
        </Modal>
    );
};

export default ManageAccount;
