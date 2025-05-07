import { Button, Col, Form, Row, Select } from "antd";
import { FilterTwoTone } from "@ant-design/icons";
import {
    LEVEL_LIST,
    LOCATION_LIST,
    SKILLS_LIST,
    TYPE_CONTRACT_LIST,
    TYPE_WORK_LIST,
} from "@/config/utils";
import { ProForm } from "@ant-design/pro-components";
import { FaSearch } from "react-icons/fa";
import styles from "styles/client.module.scss";

const SearchClient = () => {
    const optionsSkills = SKILLS_LIST;
    const optionsLocations = LOCATION_LIST;
    const optionTypeWords = TYPE_WORK_LIST;
    const optionLevels = LEVEL_LIST;
    const optionContracts = TYPE_CONTRACT_LIST;
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log("Received values of form: ", values);
    };

    const resetForm = () => {
        form.resetFields();
    };

    return (
        <div className={`${styles["search-content"]}`}>
            <div className={`${styles["container"]}`}>
                <ProForm
                    form={form}
                    onFinish={onFinish}
                    submitter={{
                        render: () => <></>,
                    }}
                >
                    <div style={{ padding: "20px 0" }}>
                        <Row gutter={[10, 10]}>
                            <Col span={24}>
                                <strong style={{ fontSize: "24px" }}>
                                    Tìm kiếm
                                </strong>
                            </Col>
                            <Col span={24}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        background: "#fff",
                                        padding: "10px",
                                        borderRadius: 5,
                                    }}
                                >
                                    <ProForm.Item
                                        name="skills"
                                        style={{ width: "100%", margin: 0 }}
                                    >
                                        <Select
                                            style={{
                                                height: 42,
                                                width: "100%",
                                            }}
                                            mode="multiple"
                                            variant="borderless"
                                            placeholder="Tìm kiếm theo các Kỹ năng"
                                            optionLabelProp="label"
                                            options={optionsSkills}
                                        />
                                    </ProForm.Item>
                                    <Button
                                        onClick={() => form.submit()}
                                        style={{
                                            height: 42,
                                            marginLeft: 10,
                                            background: "#dc3545",
                                            color: "white",
                                        }}
                                        icon={<FaSearch />}
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
                            <Col span={12} md={5}>
                                <ProForm.Item name="location">
                                    <Select
                                        mode="multiple"
                                        variant="borderless"
                                        style={{
                                            height: 46,
                                            width: "100%",
                                            borderRadius: 5,
                                            background: "#fff",
                                        }}
                                        placeholder="Tất cả địa điểm"
                                        options={optionsLocations}
                                    />
                                </ProForm.Item>
                            </Col>
                            <Col span={12} md={5}>
                                <ProForm.Item name="level">
                                    <Select
                                        mode="multiple"
                                        variant="borderless"
                                        style={{
                                            height: 46,
                                            width: "100%",
                                            background: "#fff",
                                            borderRadius: 5,
                                        }}
                                        placeholder="Tất cả cấp bậc"
                                        options={optionLevels}
                                    />
                                </ProForm.Item>
                            </Col>
                            <Col span={8} md={5}>
                                <ProForm.Item name="type_word">
                                    <Select
                                        mode="multiple"
                                        variant="borderless"
                                        style={{
                                            height: 46,
                                            width: "100%",
                                            background: "#fff",
                                            borderRadius: 5,
                                        }}
                                        placeholder="Tất cả loại công việc"
                                        options={optionTypeWords}
                                    />
                                </ProForm.Item>
                            </Col>
                            <Col span={8} md={5}>
                                <ProForm.Item name="contract">
                                    <Select
                                        mode="multiple"
                                        variant="borderless"
                                        style={{
                                            flexBasis: "21%",
                                            height: 46,
                                            width: "100%",
                                            background: "#fff",
                                            borderRadius: 5,
                                        }}
                                        placeholder="Tất cả loại hợp đồng"
                                        options={optionContracts}
                                    />
                                </ProForm.Item>
                            </Col>
                            <Col span={8} md={4}>
                                <Button
                                    icon={<FilterTwoTone />}
                                    onClick={resetForm}
                                    style={{
                                        height: 46,
                                        width: "100%",
                                        borderRadius: 5,
                                        border: "none",
                                        fontWeight: 600,
                                        color: "#424242",
                                        fontSize: "16px",
                                        background: "#dbdbdb",
                                    }}
                                    onMouseEnter={(e) => {
                                        const target = e.currentTarget;
                                        target.style.background = "#c4c4c4";
                                    }}
                                    onMouseLeave={(e) => {
                                        const target = e.currentTarget;
                                        target.style.background = "#dbdbdb";
                                    }}
                                >
                                    Xóa bộ lọc
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </ProForm>
            </div>
        </div>
    );
};
export default SearchClient;
