import { Col, Row } from 'antd'
import styles from 'styles/client.module.scss'
import JobCard from '@/components/client/card/job.card'
import SearchClient from '@/components/client/search.client'

const ClientJobPage = (props: any) => {
    return (
        <Row gutter={[0, 20]}>
            <Col span={24}>
                <SearchClient />
            </Col>

            <Col span={24}>
                <div className={`${styles['container']}`}>
                    <JobCard showPagination={true} />
                </div>
            </Col>
        </Row>
    )
}

export default ClientJobPage
