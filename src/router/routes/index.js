import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - samStore'

// ** Default Route
const DefaultRoute = '/shop'

// ** Merge Routes
const Routes = [
  {
    path: '/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/shop'))
  },
  {
    path: '/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/detail')),
    meta: {
      navLink: '/ecommerce/product-detail'
    }
  }, 

  {
    path: '/coming-soon',
    component: lazy(() => import('../../views/misc/ComingSoon')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  // products
  {
    path: '/dashboard',
     exact: true,
    component: lazy(() => import('../../views/products/list'))
  },
  
  // end
  {
    path: '/login',
    component: lazy(() => import('../../views/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },

  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/authentication/ForgotPasswordCover.js')),
    layout: 'BlankLayout'
  },
  {
    path: '/reset-password/:id',
    component: lazy(() => import('../../views/authentication/ResetPasswordCover')),
    layout: 'BlankLayout'
  },
  {
    path: '/error', 
    component: lazy(() => import('../../views/authentication/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
