// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, DollarSign, Phone, Share2, Facebook, Twitter, Youtube, Instagram } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  CardText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

const Product = props => {
  // ** Props
  const { data, } = props

  // ** State
  const [featuredImage, setFeaturedImage] = useState(data?.featured_image)
  // ** Renders seller info
  const renderSellerDetails = () => {
    return (
      <div>
        <CardText>
          Username: {data?.user?.username}
        </CardText>
        <CardText>
          Phone Number: +1{data?.user?.phone}
        </CardText>
        {/* <CardText>
          Location: Uni Abuja
        </CardText> */}

      </div>
    )
  }


  const isInCart = true
  // ** Condition btn tag
  const CartBtnTag = isInCart ? Link : 'button'

  const phone = data?.user?.phone?.replace(/\D/g, '')

  const message = `Hello, I'm interested in ${data?.title}, with ID ${data?._id}. Is it still available?`

  const whatsappUrl = `https://wa.me/1${phone}?text=${encodeURIComponent(message)}`

  const displayImageAsFeatured = (image) => {
    setFeaturedImage(image);
  }
  return (
    <Row className='my-2'>
      <Col md='6' xs='12'>
        <Row>
          <Col className='mb-2 mb-md-0' md='4' xs='12'>
            {data?.images.length > 0 ? data.images.map((image, index) => (
              <div className='' key={index} style={{ cursor: 'pointer' }} onMouseEnter={() => displayImageAsFeatured(image)}>
                <img className='img-thumbnail mb-1' src={image} width="100px" alt={data?.title} />
              </div>
            )) : null}
          </Col>
          <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='8' xs='12'>
            <div className='d-flex align-items-center justify-content-center'>
              <img className='img-fluid product-img' src={featuredImage ? featuredImage : data?.featured_image} alt={data?.title} />
            </div>
          </Col>
        </Row>
      </Col>

      <Col md='6' xs='12'>
        <h4>{data?.title}</h4>
        <CardText tag='span' className='item-company'>

          <a className='company-name' href='/' onClick={e => e.preventDefault()}>
            {/* {data.brand} */}
          </a>
        </CardText>
        <div className='ecommerce-details-price d-flex flex-wrap'>
          <h4 className='item-price me-1'>${data?.price}</h4>
          <ul className='unstyled-list list-inline'>
            {new Array(5).fill().map((listItem, index) => {
              return (
                <li key={index} className='ratings-list-item me-25'>
                  <Star
                    className={classnames({
                      'filled-star': index + 1 <= 4,
                      'unfilled-star': index + 1 > 4
                    })}
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <CardText>
          Available -<span className='text-success ms-25'>In stock</span>
        </CardText>
        <CardText dangerouslySetInnerHTML={{ __html: data?.description }} />
        <hr />
        <div className='product-color-options'>
          <h6>Seller Contact </h6>
          <ul className='list-unstyled mb-0'>{renderSellerDetails()}</ul>
        </div>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <a
            className="btn btn-primary btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone className="me-50" size={14} />
            Contact seller
          </a>
          <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
            <DropdownToggle className='btn-icon hide-arrow' color='secondary' caret outline>
              <Share2 size={14} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Facebook size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Twitter size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Youtube size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Instagram size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </Col>
    </Row>
  )
}

export default Product
