// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
// import UserDropdown from './UserDropdown'
// // import{activeUser}
// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { activeUser } from '../../../../services/utilities'
// ** Reactstrap Imports
import { Button, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUser } from '../../../../views/ecommerce/store' 
import Logo from '../../../../assets/images/logo/samlogo.png'

const NavbarUser = props => {
  const dispatch = useDispatch();
  // ** Props
  const { skin, setSkin } = props
  const isLogin = false
  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }
  
  useEffect(async () => {
    let user = await activeUser();
    dispatch(getLoggedUser(user))
  }, [])

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavItem className='d-none d-lg-block'>
          <NavLink  className='nav-link-style'style={{padding: '0px'}}>
          <Link  to="/shop">
           <img src={Logo} alt='Logo' width='150px'  />
          </Link>
          </NavLink>
        </NavItem>
       
      </div>
      <ul className='nav navbar-nav align-items-center ms-auto'>
      <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </ul>

    </Fragment>
  )
}
export default NavbarUser
