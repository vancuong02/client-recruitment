import { Button, Col, Form, Row, Select } from 'antd'
import { FilterTwoTone } from '@ant-design/icons'
import { LEVEL_LIST, LOCATION_LIST, SKILLS_LIST, TYPE_CONTRACT_LIST, TYPE_WORK_LIST } from '@/config/utils'
import { ProForm } from '@ant-design/pro-components'
import { FaSearch } from 'react-icons/fa'
import styles from 'styles/client.module.scss'
import { useNavigate } from 'react-router-dom'

interface SearchQuery {
    skills?: string[]
    location?: string
    levels?: string[]
    typeWorks?: string[]
    typeContracts?: string[]
}

const SearchClient = () => {
    const optionsSkills = SKILLS_LIST
    const optionsLocations = LOCATION_LIST
    const optiontypeWorks = TYPE_WORK_LIST
    const optionLevels = LEVEL_LIST
    const optionContracts = TYPE_CONTRACT_LIST
    const [form] = Form.useForm()

    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        const data: SearchQuery = {
            skills: values.skills,
            location: values.location,
            levels: values.levels,
            typeWorks: values.typeWorks,
            typeContracts: values.typeContracts,
        }
        const searchParams = new URLSearchParams()
        for (const key in data) {
            const value = data[key as keyof SearchQuery]
            if (value) {
                if (Array.isArray(value)) {
                    searchParams.append(key, value.join(','))
                } else {
                    searchParams.append(key, value)
                }
            }
        }

        navigate(`/job?${searchParams.toString()}`)
    }

    const resetForm = () => {
        form.resetFields()
        navigate('/job')
    }

    return (
        <div className={`${styles['search-content']}`}>
            <div className={`${styles['container']}`}>
                <ProForm
                    form={form}
                    onFinish={onFinish}
                    submitter={{
                        render: () => <></>,
                    }}
                >
                    <Row gutter={[10, 10]}>
                        <Col span={24}>
                            <strong style={{ fontSize: '24px' }}>Tìm kiếm</strong>
                        </Col>
                        <Col span={24}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: '#fff',
                                    borderRadius: 5,
                                }}
                            >
                                <ProForm.Item name="skills" style={{ width: '100%', margin: 0 }}>
                                    <Select
                                        style={{
                                            height: 42,
                                            width: '100%',
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
                                        background: '#dc3545',
                                        color: 'white',
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
                                    variant="borderless"
                                    style={{
                                        height: 46,
                                        width: '100%',
                                        borderRadius: 5,
                                        background: '#fff',
                                    }}
                                    defaultValue="ALL"
                                    placeholder="Tất cả địa điểm"
                                    options={optionsLocations}
                                />
                            </ProForm.Item>
                        </Col>
                        <Col span={12} md={5}>
                            <ProForm.Item name="levels">
                                <Select
                                    mode="multiple"
                                    variant="borderless"
                                    style={{
                                        height: 46,
                                        width: '100%',
                                        background: '#fff',
                                        borderRadius: 5,
                                    }}
                                    placeholder="Tất cả cấp bậc"
                                    options={optionLevels}
                                />
                            </ProForm.Item>
                        </Col>
                        <Col span={8} md={5}>
                            <ProForm.Item name="typeWorks">
                                <Select
                                    mode="multiple"
                                    variant="borderless"
                                    style={{
                                        height: 46,
                                        width: '100%',
                                        background: '#fff',
                                        borderRadius: 5,
                                    }}
                                    placeholder="Tất cả loại công việc"
                                    options={optiontypeWorks}
                                />
                            </ProForm.Item>
                        </Col>
                        <Col span={8} md={5}>
                            <ProForm.Item name="typeContracts">
                                <Select
                                    mode="multiple"
                                    variant="borderless"
                                    style={{
                                        flexBasis: '21%',
                                        height: 46,
                                        width: '100%',
                                        background: '#fff',
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
                                    width: '100%',
                                    borderRadius: 5,
                                    border: 'none',
                                    fontWeight: 600,
                                    color: '#424242',
                                    fontSize: '16px',
                                    background: '#dbdbdb',
                                }}
                                onMouseEnter={(e) => {
                                    const target = e.currentTarget
                                    target.style.background = '#c4c4c4'
                                }}
                                onMouseLeave={(e) => {
                                    const target = e.currentTarget
                                    target.style.background = '#dbdbdb'
                                }}
                            >
                                Xóa bộ lọc
                            </Button>
                        </Col>
                    </Row>
                </ProForm>
            </div>
        </div>
    )
}
export default SearchClient
