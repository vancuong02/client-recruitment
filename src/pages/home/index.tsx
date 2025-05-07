import { Divider } from "antd";
import styles from "styles/client.module.scss";
import SearchClient from "@/components/client/search.client";
import JobCard from "@/components/client/card/job.card";
import CompanyCard from "@/components/client/card/company.card";
import { useAppSelector } from "@/redux/hooks";

const HomePage = () => {
    const { user } = useAppSelector((state) => state.account);
    console.log("user", user);

    return (
        <>
            <SearchClient />
            <div className={`${styles["container"]} ${styles["home-section"]}`}>
                <CompanyCard />
                <JobCard />
            </div>
        </>
    );
};

export default HomePage;
