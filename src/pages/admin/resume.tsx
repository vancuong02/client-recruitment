import dayjs from "dayjs";
import { useState, useRef } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import DataTable from "@/components/client/data-table";
import { message, notification, Popconfirm, Space } from "antd";
import { ActionType, ProColumns } from "@ant-design/pro-components";

import { IResume } from "@/types/backend";
import { callDeleteResume } from "@/config/api";
import Access from "@/components/share/access";
import { ALL_PERMISSIONS } from "@/config/permissions";
import { fetchResume } from "@/redux/slice/resumeSlide";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ViewDetailResume from "@/components/admin/resume/view.resume";

const ResumePage = () => {
    const tableRef = useRef<ActionType>();
    const dispatch = useAppDispatch();

    // Lấy page và limit từ URL hoặc dùng giá trị mặc định
    const [page, setPage] = useState<number>(() => {
        const params = new URLSearchParams(window.location.search);
        return Number(params.get("page")) || 1;
    });
    const [limit, setLimit] = useState<number>(() => {
        const params = new URLSearchParams(window.location.search);
        return Number(params.get("limit")) || 10;
    });

    const handleTableChange = (pagination: any) => {
        const { current, limit } = pagination;
        setPage(current);
        setLimit(limit);

        // Cập nhật URL với page và limit mới
        const params = new URLSearchParams(window.location.search);
        params.set("page", String(current));
        params.set("limit", String(limit));

        // Thay đổi URL mà không reload trang
        window.history.pushState(
            {},
            "",
            `${window.location.pathname}?${params.toString()}`
        );
    };

    const isFetching = useAppSelector((state) => state.resume.isFetching);
    const meta = useAppSelector((state) => state.resume.meta);
    const resumes = useAppSelector((state) => state.resume.result);
    const [dataInit, setDataInit] = useState<IResume | null>(null);
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);

    const handleDeleteResume = async (_id: string | undefined) => {
        if (_id) {
            const res = await callDeleteResume(_id);
            if (res && res.data) {
                message.success("Xóa Resume thành công");
                reloadTable();
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.message,
                });
            }
        }
    };

    const reloadTable = () => {
        tableRef?.current?.reload();
    };

    const columns: ProColumns<IResume>[] = [
        {
            title: "Id",
            dataIndex: "_id",
            width: 250,
            render: (text, record, index, action) => {
                return (
                    <a
                        href="#"
                        onClick={() => {
                            setOpenViewDetail(true);
                            setDataInit(record);
                        }}
                    >
                        {record._id}
                    </a>
                );
            },
            hideInSearch: true,
        },
        {
            title: "Trạng Thái",
            dataIndex: "status",
            hideInSearch: true,
            filters: [
                { text: "PENDING", value: "PENDING" },
                { text: "REVIEWING", value: "REVIEWING" },
                { text: "APPROVED", value: "APPROVED" },
                { text: "REJECTED", value: "REJECTED" },
            ],
            filterMode: "menu",
            filterMultiple: true,
            onFilter: (value: boolean | React.Key, record: IResume) =>
                record.status === value,
        },
        {
            title: "Job",
            dataIndex: ["jobId"],
            hideInSearch: true,
            render: (text, record, index, action) => {
                return <>{record.jobId.name}</>;
            },
        },
        {
            title: "Company",
            dataIndex: ["companyId"],
            hideInSearch: true,
            render: (text, record, index, action) => {
                return <>{record.companyId.name}</>;
            },
        },

        {
            title: "CreatedAt",
            dataIndex: "createdAt",
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss")}</>
                );
            },
            hideInSearch: true,
        },
        {
            title: "UpdatedAt",
            dataIndex: "updatedAt",
            width: 200,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{dayjs(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</>
                );
            },
            hideInSearch: true,
        },
        {
            title: "Chức năng",
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa resume"}
                        description={"Bạn có chắc chắn muốn xóa resume này ?"}
                        onConfirm={() => handleDeleteResume(entity._id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <span style={{ cursor: "pointer", margin: "0 10px" }}>
                            <DeleteOutlined
                                style={{
                                    fontSize: 20,
                                    color: "#ff4d4f",
                                }}
                            />
                        </span>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Access permission={ALL_PERMISSIONS.RESUMES.GET_PAGINATE}>
                <DataTable<IResume>
                    search={false}
                    actionRef={tableRef}
                    headerTitle="Danh sách Resumes"
                    rowKey="_id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={resumes}
                    request={async (params, sort, filter): Promise<any> => {
                        dispatch(fetchResume({ page, limit }));
                    }}
                    scroll={{ x: true }}
                    pagination={{
                        current: page,
                        pageSize: limit,
                        showSizeChanger: true,
                        total: meta.total,
                        onChange: (page, limit) => {
                            handleTableChange({ current: page, limit });
                        },
                        showTotal: (total, range) => {
                            return (
                                <div>
                                    {range[0]}-{range[1]} trên {total} rows
                                </div>
                            );
                        },
                    }}
                    rowSelection={false}
                    toolBarRender={(_action, _rows): any => {
                        return <></>;
                    }}
                />
            </Access>
            <ViewDetailResume
                open={openViewDetail}
                onClose={setOpenViewDetail}
                dataInit={dataInit}
                setDataInit={setDataInit}
                reloadTable={reloadTable}
            />
        </div>
    );
};

export default ResumePage;
