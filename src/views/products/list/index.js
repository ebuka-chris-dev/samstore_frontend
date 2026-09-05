// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, Input, Card, CardBody, Button } from 'reactstrap'
// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { Target } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
// ** Styles
import '@styles/react/apps/app-users.scss'

const Index = () => {
  const store = useSelector(state => state.ecommerce);
  const dispatch = useDispatch()
  

  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='6' sm='6' >
          <StatsHorizontal
            color='primary'
            statTitle='Total Products'
            icon={<Target size={20} />}
            renderStats={
              <h3 className='fw-bolder mb-75'>
                {store?.totalProducts ?? 0}
              </h3>
            } />

        </Col>

      </Row>
      <Table />
    </div>
  )
}

export default Index
