import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IRole } from "@/types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space, Tag, message, notification } from "antd";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { callDeleteRole } from "@/config/api";
import queryString from "query-string";
import { fetchRole, fetchRoleById } from "@/redux/slice/roleSlide";
import ModalRole from "@/components/admin/role/modal.role";
import { ALL_PERMISSIONS } from "@/config/permissions";
import Access from "@/components/share/access";

const PAGE = 1;
const LIMIT = 10;
const RolePage = () => {
    const tableRef = useRef<ActionType>();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState({
        page: new URLSearchParams(window.location.search).get("page") || PAGE,
        limit:
            new URLSearchParams(window.location.search).get("limit") || LIMIT,
    });

    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.role.isFetching);
    const meta = useAppSelector((state) => state.role.meta);
    const roles = useAppSelector((state) => state.role.result);

    useEffect(() => {
        const query = queryString.stringify(searchParams);
        dispatch(fetchRole(query));
    }, [dispatch, searchParams]);

    const handleOnChangePagination = (
        page: number,
        pageSize: number | undefined
    ) => {
        setSearchParams({
            page: page.toString(),
            limit: pageSize?.toString() || LIMIT.toString(),
        });
        const newQuery = queryString.stringify({
            page: page.toString(),
            limit: pageSize?.toString() || LIMIT.toString(),
        });
        // Thay đổi trên URL
        window.history.pushState({}, document.title, `?${newQuery}`);
    };

    const handleDeleteRole = async (_id: string | undefined) => {
        if (_id) {
            const res = await callDeleteRole(_id);
            if (res && res.data) {
                message.success("Xóa Role thành công");
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

    const columns: ProColumns<IRole>[] = [
        {
            title: "Id",
            dataIndex: "_id",
            width: 250,
            render: (text, record, index, action) => {
                return <span>{record._id}</span>;
            },
            hideInSearch: true,
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
        },
        {
            title: "Trạng thái",
            dataIndex: "isActive",
            render(dom, entity, index, action, schema) {
                return (
                    <>
                        <Tag color={entity.isActive ? "lime" : "red"}>
                            {entity.isActive ? "ACTIVE" : "INACTIVE"}
                        </Tag>
                    </>
                );
            },
            hideInSearch: true,
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
                    <Access
                        permission={ALL_PERMISSIONS.ROLES.UPDATE}
                        hideChildren
                    >
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: "#ffa500",
                            }}
                            type=""
                            onClick={() => {
                                dispatch(fetchRoleById(entity._id as string));
                                setOpenModal(true);
                            }}
                        />
                    </Access>
                    <Access
                        permission={ALL_PERMISSIONS.ROLES.DELETE}
                        hideChildren
                    >
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa role"}
                            description={"Bạn có chắc chắn muốn xóa role này ?"}
                            onConfirm={() => handleDeleteRole(entity._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span
                                style={{ cursor: "pointer", margin: "0 10px" }}
                            >
                                <DeleteOutlined
                                    style={{
                                        fontSize: 20,
                                        color: "#ff4d4f",
                                    }}
                                />
                            </span>
                        </Popconfirm>
                    </Access>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Access permission={ALL_PERMISSIONS.ROLES.GET_PAGINATE}>
                <DataTable<IRole>
                    search={false}
                    actionRef={tableRef}
                    headerTitle="Danh sách Roles"
                    rowKey="_id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={roles}
                    request={async (): Promise<any> => {
                        const query = queryString.stringify(searchParams);
                        dispatch(fetchRole(query));
                    }}
                    scroll={{ x: true }}
                    pagination={{
                        current: Number(searchParams.page),
                        pageSize: Number(searchParams.limit),
                        showSizeChanger: true,
                        total: meta.total,
                        onChange: handleOnChangePagination,
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
                        return (
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Thêm mới
                            </Button>
                        );
                    }}
                />
            </Access>
            <ModalRole
                openModal={openModal}
                setOpenModal={setOpenModal}
                reloadTable={reloadTable}
            />
        </div>
    );
};

export default RolePage;
