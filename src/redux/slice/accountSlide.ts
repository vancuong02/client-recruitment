import { createSlice } from '@reduxjs/toolkit'

interface IState {
    isAuthenticated: boolean
    isLoading: boolean
    isRefreshToken: boolean
    errorRefreshToken: string
    user: {
        _id: string
        email: string
        name: string
        role: {
            _id: string
            name: string
        }
        permissions: {
            _id: string
            name: string
            apiPath: string
            method: string
            module: string
        }[]
    }
    activeMenu: string
}

const initialState: IState = {
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: '',
    user: {
        _id: '',
        email: '',
        name: '',
        role: {
            _id: '',
            name: '',
        },
        permissions: [],
    },

    activeMenu: 'home',
}

export const accountSlide = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload
        },
        setUserLoginInfo: (state, action) => {
            state.isAuthenticated = true
            state.isLoading = false
            state.user = {
                ...state.user,
                _id: action?.payload?._id ?? state.user._id,
                email: action?.payload?.email ?? state.user.email,
                name: action?.payload?.name ?? state.user.name,
                role: action?.payload?.role ?? state.user.role,
                permissions: action?.payload?.permissions ?? state.user.permissions,
            }
        },
        setLogoutAction: (state, action) => {
            localStorage.removeItem('access_token')
            state.isAuthenticated = false
            state.user = {
                _id: '',
                email: '',
                name: '',
                role: {
                    _id: '',
                    name: '',
                },
                permissions: [],
            }
        },
        setRefreshTokenAction: (state, action) => {
            state.isRefreshToken = action.payload?.status ?? false
            state.errorRefreshToken = action.payload?.message ?? ''
        },
    },
})

export const { setActiveMenu, setUserLoginInfo, setLogoutAction, setRefreshTokenAction } = accountSlide.actions

export default accountSlide.reducer
