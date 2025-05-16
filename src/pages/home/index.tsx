import { Divider } from "antd";
import styles from "styles/client.module.scss";
import JobCard from "@/components/client/card/job.card";
import SearchClient from "@/components/client/search.client";
import CompanyCard from "@/components/client/card/company.card";

const HomePage = () => {
    return (
        <>
            <SearchClient />
            <div className={`${styles["container"]} ${styles["home-section"]}`}>
                <CompanyCard />
                <Divider style={{ margin: "50px 0" }} />
                <JobCard />
            </div>
        </>
    );
};

export default HomePage;
