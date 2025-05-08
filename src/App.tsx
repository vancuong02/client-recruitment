import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import NotFound from "components/share/not.found";
import LoginPage from "pages/auth/login";
import RegisterPage from "pages/auth/register";
import LayoutAdmin from "components/admin/layout.admin";
import ProtectedRoute from "components/share/protected-route.ts";
import Header from "components/client/header.client";
import Footer from "components/client/footer.client";
import HomePage from "pages/home";
import styles from "styles/app.module.scss";
import DashboardPage from "./pages/admin/dashboard";
import CompanyPage from "./pages/admin/company";
import PermissionPage from "./pages/admin/permission";
import ResumePage from "./pages/admin/resume";
import RolePage from "./pages/admin/role";
import UserPage from "./pages/admin/user";
import LayoutApp from "./components/share/layout.app";
import JobPage from "./pages/admin/job";
import ViewUpsertJob from "./components/admin/job/upsert.job";
import ClientJobPage from "./pages/job";
import ClientJobDetailPage from "./pages/job/detail";
import ClientCompanyPage from "./pages/company";
import ClientCompanyDetailPage from "./pages/company/detail";

const LayoutClient = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [location]);

    return (
        <div className="layout-app">
            <Header />
            <div className={styles["content-app"]}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <LayoutApp>
                    <LayoutClient />
                </LayoutApp>
            ),
            errorElement: <NotFound />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "job", element: <ClientJobPage /> },
                { path: "job/:id", element: <ClientJobDetailPage /> },
                { path: "company", element: <ClientCompanyPage /> },
                { path: "company/:id", element: <ClientCompanyDetailPage /> },
            ],
        },

        {
            path: "/admin",
            element: (
                <LayoutApp>
                    <LayoutAdmin />{" "}
                </LayoutApp>
            ),
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: (
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "company",
                    element: (
                        <ProtectedRoute>
                            <CompanyPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "user",
                    element: (
                        <ProtectedRoute>
                            <UserPage />
                        </ProtectedRoute>
                    ),
                },

                {
                    path: "job",
                    children: [
                        {
                            index: true,
                            element: (
                                <ProtectedRoute>
                                    {" "}
                                    <JobPage />
                                </ProtectedRoute>
                            ),
                        },
                        {
                            path: "upsert",
                            element: (
                                <ProtectedRoute>
                                    <ViewUpsertJob />
                                </ProtectedRoute>
                            ),
                        },
                    ],
                },

                {
                    path: "resume",
                    element: (
                        <ProtectedRoute>
                            <ResumePage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "permission",
                    element: (
                        <ProtectedRoute>
                            <PermissionPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "role",
                    element: (
                        <ProtectedRoute>
                            <RolePage />
                        </ProtectedRoute>
                    ),
                },
            ],
        },

        {
            path: "/login",
            element: <LoginPage />,
        },

        {
            path: "/register",
            element: <RegisterPage />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
