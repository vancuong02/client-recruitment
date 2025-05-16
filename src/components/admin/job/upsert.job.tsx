import {
    Breadcrumb,
    Col,
    ConfigProvider,
    Divider,
    Form,
    Row,
    message,
    notification,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DebounceSelect } from "../user/debouce.select";
import {
    FooterToolbar,
    ProForm,
    ProFormDatePicker,
    ProFormDigit,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
} from "@ant-design/pro-components";
import styles from "styles/admin.module.scss";
import {
    LEVEL_LIST,
    LOCATION_LIST,
    SKILLS_LIST,
    TYPE_CONTRACT_LIST,
    TYPE_WORK_LIST,
} from "@/config/utils";
import { ICompanySelect } from "../user/modal.user";
import { useState, useEffect, useRef } from "react";
import {
    callCreateJob,
    callFetchCompany,
    callFetchJobById,
    callUpdateJob,
} from "@/config/api";
import { CheckSquareOutlined } from "@ant-design/icons";
import enUS from "antd/lib/locale/en_US";
import dayjs from "dayjs";
import { IJob } from "@/types/backend";
import { Editor } from "@tinymce/tinymce-react";

const ViewUpsertJob = (props: any) => {
    const [companies, setCompanies] = useState<ICompanySelect[]>();

    const navigate = useNavigate();
    const [value, setValue] = useState<string>("");
    const editorRef = useRef(null);
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id");
    const [dataUpdate, setDataUpdate] = useState<IJob | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const init = async () => {
            if (id) {
                const res = await callFetchJobById(id);
                if (res && res.data) {
                    setDataUpdate(res.data);
                    setValue(res.data.description);
                    setCompanies([
                        {
                            label: res.data.companyId?.name as string,
                            value: res.data.companyId?._id as string,
                        },
                    ]);

                    form.setFieldsValue({
                        ...res.data,
                        company: {
                            label: res.data.companyId?.name as string,
                            value: res.data.companyId?._id as string,
                        },
                    });
                }
            }
        };
        init();
        return () => form.resetFields();
    }, [id]);

    async function fetchCompanyList(): Promise<ICompanySelect[]> {
        const res = await callFetchCompany(`current=1&pageSize=100`);
        if (res && res.data) {
            const list = res.data.result;
            const temp = list.map((item) => {
                return {
                    label: item.name as string,
                    value: item._id as string,
                };
            });
            return temp;
        } else return [];
    }

    const onFinish = async (values: any) => {
        if (dataUpdate?._id) {
            const job = {
                name: values.name,
                skills: values.skills,
                locations: values.locations,
                levels: values.levels,
                typeContracts: values.typeContracts,
                typeWorks: values.typeWorks,
                salary: values.salary,
                quantity: values.quantity,
                description: value,
                companyId: values.companyId.value,
                startDate: /[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/.test(
                    values.startDate
                )
                    ? dayjs(values.startDate, "DD/MM/YYYY").toDate()
                    : values.startDate,
                endDate: /[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/.test(values.endDate)
                    ? dayjs(values.endDate, "DD/MM/YYYY").toDate()
                    : values.endDate,
                isActive: values.isActive,
            };

            const res = await callUpdateJob(job, dataUpdate._id);
            if (res.data) {
                message.success("Cập nhật job thành công");
                navigate("/admin/job");
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.message,
                });
            }
        } else {
            const job = {
                name: values.name,
                skills: values.skills,
                locations: values.locations,
                levels: values.levels,
                typeContracts: values.typeContracts,
                typeWorks: values.typeWorks,
                salary: values.salary,
                quantity: values.quantity,
                description: value,
                companyId: values.companyId.value,
                startDate: dayjs(values.startDate, "DD/MM/YYYY").toDate(),
                endDate: dayjs(values.endDate, "DD/MM/YYYY").toDate(),
                isActive: values.isActive,
            };

            console.log("job", job);

            const res = await callCreateJob(job);
            if (res.data) {
                message.success("Tạo mới job thành công");
                navigate("/admin/job");
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.message,
                });
            }
        }
    };

    return (
        <div className={styles["upsert-job-container"]}>
            <div className={styles["title"]}>
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: <Link to="/admin/job">Manage Job</Link>,
                        },
                        {
                            title: "Upsert Job",
                        },
                    ]}
                />
            </div>
            <div>
                <ConfigProvider locale={enUS}>
                    <ProForm
                        form={form}
                        onFinish={onFinish}
                        submitter={{
                            searchConfig: {
                                resetText: "Hủy",
                                submitText: (
                                    <>
                                        {dataUpdate?._id
                                            ? "Cập nhật Job"
                                            : "Tạo mới Job"}
                                    </>
                                ),
                            },
                            onReset: () => navigate("/admin/job"),
                            render: (_: any, dom: any) => (
                                <FooterToolbar>{dom}</FooterToolbar>
                            ),
                            submitButtonProps: {
                                icon: <CheckSquareOutlined />,
                            },
                        }}
                    >
                        <Row gutter={[20, 20]}>
                            <Col span={24} md={12}>
                                <ProFormText
                                    label="Tên Job"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập tên job!",
                                        },
                                    ]}
                                    placeholder="Tên job"
                                />
                            </Col>
                            <Col span={24} md={6}>
                                <ProFormSelect
                                    name="skills"
                                    label="Kỹ năng yêu cầu"
                                    options={SKILLS_LIST}
                                    placeholder="Kỹ năng"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn kỹ năng!",
                                        },
                                    ]}
                                    allowClear
                                    mode="multiple"
                                    fieldProps={{
                                        showArrow: false,
                                    }}
                                />
                            </Col>
                            <Col span={24} md={6}>
                                <ProFormSelect
                                    name="locations"
                                    label="Địa điểm"
                                    options={LOCATION_LIST.filter(
                                        (item) => item.value !== "ALL"
                                    )}
                                    placeholder="Địa chỉ"
                                    mode="multiple"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn địa điểm!",
                                        },
                                    ]}
                                />
                            </Col>
                            <Col span={24} md={6}>
                                <ProFormText
                                    label="Mức lương"
                                    name="salary"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mức lương!",
                                        },
                                    ]}
                                    fieldProps={{
                                        allowClear: true,
                                    }}
                                    placeholder="Mức lương (VD: 1000$ - 2000$)"
                                />
                            </Col>
                            <Col span={24} md={6}>
                                <ProFormDigit
                                    label="Số lượng"
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập số lượng!",
                                        },
                                    ]}
                                    placeholder="Số lượng"
                                />
                            </Col>
                            <Col span={24} md={6}>
                                <ProFormSelect
                                    name="levels"
                                    label="Trình độ"
                                    mode="multiple"
                                    options={LEVEL_LIST.filter(
                                        (item) => item.value !== "ALL"
                                    )}
                                    placeholder="Trình độ"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn trình độ!",
                                        },
                                    ]}
                                />
                            </Col>
                            <Col span={24} md={6}>
                                <ProFormSelect
                                    name="typeContracts"
                                    label="Loại hợp đồng"
                                    options={TYPE_CONTRACT_LIST}
                                    placeholder="Loại hợp đồng"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng chọn loại hợp đồng!",
                                        },
                                    ]}
                                />
                            </Col>
                            <Col span={24} md={6}>
                                <ProFormSelect
                                    name="typeWorks"
                                    label="Loại công việc"
                                    options={TYPE_WORK_LIST}
                                    placeholder="Loại công việc"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng chọn loại công việc!",
                                        },
                                    ]}
                                />
                            </Col>

                            {(dataUpdate?._id || !id) && (
                                <Col span={24} md={6}>
                                    <ProForm.Item
                                        name="companyId"
                                        label="Thuộc Công Ty"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng chọn company!",
                                            },
                                        ]}
                                    >
                                        <DebounceSelect
                                            allowClear
                                            showSearch
                                            defaultValue={companies}
                                            value={companies}
                                            placeholder="Chọn công ty"
                                            fetchOptions={fetchCompanyList}
                                            onChange={(newValue: any) => {
                                                if (
                                                    newValue?.length === 0 ||
                                                    newValue?.length === 1
                                                ) {
                                                    setCompanies(
                                                        newValue as ICompanySelect[]
                                                    );
                                                }
                                            }}
                                            style={{ width: "100%" }}
                                        />
                                    </ProForm.Item>
                                </Col>
                            )}
                        </Row>
                        <Row gutter={[20, 20]}>
                            <Col span={24} md={6}>
                                <ProFormDatePicker
                                    label="Ngày bắt đầu"
                                    name="startDate"
                                    normalize={(value) =>
                                        value && dayjs(value, "DD/MM/YYYY")
                                    }
                                    fieldProps={{
                                        format: "DD/MM/YYYY",
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn ngày cấp",
                                        },
                                    ]}
                                    placeholder="dd/mm/yyyy"
                                />
                            </Col>
                            <Col span={24} md={6}>
                                <ProFormDatePicker
                                    label="Ngày kết thúc"
                                    name="endDate"
                                    normalize={(value) =>
                                        value && dayjs(value, "DD/MM/YYYY")
                                    }
                                    fieldProps={{
                                        format: "DD/MM/YYYY",
                                    }}
                                    // width="auto"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn ngày cấp",
                                        },
                                    ]}
                                    placeholder="dd/mm/yyyy"
                                />
                            </Col>
                            <Col span={24} md={6}>
                                <ProFormSwitch
                                    label="Trạng thái"
                                    name="isActive"
                                    checkedChildren="ACTIVE"
                                    unCheckedChildren="INACTIVE"
                                    initialValue={true}
                                    fieldProps={{
                                        defaultChecked: true,
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <ProForm.Item
                                    name="description"
                                    label="Miêu tả job"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập miêu tả job!",
                                        },
                                    ]}
                                >
                                    <Editor
                                        apiKey={
                                            import.meta.env.VITE_API_KEY_TINYMCE
                                        }
                                        onEditorChange={(
                                            content: any,
                                            editor: any
                                        ) => {
                                            setValue(content);
                                        }}
                                        onInit={(evt: any, editor: any) =>
                                            (editorRef.current = editor)
                                        }
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            statusbar: false,
                                            branding: false,
                                            plugins: [
                                                "advlist",
                                                "autolink",
                                                "lists",
                                                "link",
                                                "image",
                                                "charmap",
                                                "preview",
                                                "anchor",
                                                "searchreplace",
                                                "visualblocks",
                                                "code",
                                                "fullscreen",
                                                "insertdatetime",
                                                "media",
                                                "table",
                                                "code",
                                                "help",
                                                "wordcount",
                                            ],
                                            toolbar:
                                                "undo redo | blocks | " +
                                                "bold italic forecolor | alignleft aligncenter " +
                                                "alignright alignjustify | bullist numlist outdent indent | " +
                                                "removeformat | help",
                                            content_style:
                                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                        }}
                                    />
                                </ProForm.Item>
                            </Col>
                        </Row>
                        <Divider />
                    </ProForm>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default ViewUpsertJob;
