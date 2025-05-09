export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    };
    result: T[];
}

export interface IAccount {
    access_token: string;
    user: {
        _id: string;
        email: string;
        name: string;
        role: {
            _id: string;
            name: string;
        };
        permissions: {
            _id: string;
            name: string;
            apiPath: string;
            method: string;
            module: string;
        }[];
    };
}

export interface IGetAccount extends Omit<IAccount, "access_token"> {}

export interface ICompany {
    _id?: string;
    name?: string;
    location?: string;
    logo: string;
    description?: string;
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    age: number;
    gender: string;
    address: string;
    role?: {
        _id: string;
        name: string;
    };

    companyId?: {
        _id: string;
        name: string;
    };
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IJob {
    _id?: string;
    name: string;
    skills: string[];
    locations: string[];
    levels: string[];
    typeConstracts: string[];
    typeWords: string[];
    salary: string;
    quantity: number;
    description: string;
    companyId: {
        _id: string;
        name: string;
        logo: string;
    };
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IBodyJobRes {
    name: string;
    skills: string[];
    locations: string[];
    levels: string[];
    typeConstracts: string[];
    typeWorks: string[];
    salary: string;
    quantity: number;
    description: string;
    companyId: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}

export interface IResume {
    _id?: string;
    email: string;
    userId: string;
    url: string;
    status: string;
    companyId: {
        _id: string;
        name: string;
        logo: string;
    };
    jobId: {
        _id: string;
        name: string;
    };
    history?: {
        status: string;
        updatedAt: Date;
        updatedBy: { _id: string; email: string };
    }[];
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPermission {
    _id?: string;
    name?: string;
    apiPath?: string;
    method?: string;
    module?: string;

    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IRole {
    _id?: string;
    name: string;
    description: string;
    isActive: boolean;
    permissions: IPermission[] | string[];

    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface ISubscribers {
    _id?: string;
    name?: string;
    email?: string;
    skills: string[];
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IBodyUpdateUser {
    name?: string;
    age?: number;
    gender?: string;
    address?: string;
}

export interface IBodyAdminUpdateUser {
    email?: string;
    name?: string;
    age?: number;
    gender?: string;
    role?: string;
    companyId?: string;
    address?: string;
}

interface IQuery {
    page?: number;
    limit?: number;
}
