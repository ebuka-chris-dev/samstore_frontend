// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
import ItemFeatures from './ItemFeatures'
import ProductDetails from './ProductDetails'
import RelatedProducts from './RelatedProducts'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Card, CardBody, Spinner } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../store'

import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
  // ** Vars
  const productId = useParams().product

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get product
  useEffect(() => {
    if (productId) {
      dispatch(getProduct(productId))
    }
  }, [dispatch, productId])

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle='Product Details'
        breadCrumbActive='Details'
      />

      <div className='app-ecommerce-details'>

        {/* Loading */}
        {store.loading ? (
          <div className='d-flex flex-column justify-content-center align-items-center py-5'>
            <Spinner />
            <p className='mt-1'>Loading product...</p>
          </div>

        ) : store.productDetail?.data ? (
          <Card>
            <CardBody>
              <ProductDetails
                dispatch={dispatch}
                productId={productId}
                getProduct={getProduct}
                data={store.productDetail.data}
              />
            </CardBody>
          </Card>

        ) : (
          <div className='d-flex justify-content-center py-5'>
            <p>Product not found</p>
          </div>
        )}

      </div>
    </Fragment>
  )
}

export default Details