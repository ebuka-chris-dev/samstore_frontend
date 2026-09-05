// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { API_URI } from '../../../services/constants'

export const getProducts = createAsyncThunk(
  'appEcommerce/getProducts',
  async (params, { rejectWithValue }) => {
    try {
      if (params.filteredArray?.length >= 1) {
        return {
          params,
          data: params.filteredArray
        }
      }

      const response = await axios.get(
        `${API_URI}/products?q=${params.q}&categoryId=${params.categoryId}&page=1&perPage=${params.perPage}`
      )

      return {
        params,
        data: response.data
      }
    } catch (err) {
      console.log(err)

      return rejectWithValue(
        err.response?.data?.message || 'Failed to load products'
      )
    }
  }
)
export const getProductFiltered = async params => {
  try {
    const response = await axios.get(`${API_URI}/products?q=${params.q}&categoryId=${params.categoryId}&page=1&perPage=9`)
    return { params, data: response.data }
  } catch (err) {
    console.log(err);
  }
}
export const getProduct = createAsyncThunk('appEcommerce/getProduct', async id => {
  try {
    const response = await axios.get(`${API_URI}/products/${id}`)
    console.log(response.data, 'response.data')
    return { product: response.data }
  } catch (err) {
    console.log(err);
  }
})

export const deleteProduct = createAsyncThunk(
  'appEcommerce/deleteProductItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URI}/products/${id}`)

      return {
        id,
        data: response.data
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete product'
      )
    }
  }
)
export const getActiveUser = createAsyncThunk('appEcommerce/getActiveUser', async (userId) => {
  return userId
})

export const getCategory = createAsyncThunk('appEcommerce/getCategory', async () => {
  const response = await axios.get(`${API_URI}/category`)
  let res = response.data.map((e) => {
    let x = { value: e._id, label: e.name }
    return x;
  })
  return res;
})
export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get('/api/users/user', { id })
  return response.data.user
})
export const getLoggedUser = createAsyncThunk('appUsers/getLoggedUser', user => {
  return user
})
// export const addToCart = createAsyncThunk('appEcommerce/addToCart', async (id, { dispatch, getState }) => {
//   const response = await axios.post('/ecommerce/cart', { productId: id })
//   await dispatch(getProducts(getState().ecommerce.params))
//   return response.data
// })

// export const getWishlistItems = createAsyncThunk('appEcommerce/getWishlistItems', async () => {
//   const response = await axios.get('/ecommerce/wishlist')
//   return response.data
// })

// export const deleteWishlistItem = createAsyncThunk('appEcommerce/deleteWishlistItem', async (id, { dispatch }) => {
//   const response = await axios.delete(`/ecommerce/wishlist/${id}`)
//   dispatch(getWishlistItems())
//   return response.data
// })

// export const getCartItems = createAsyncThunk('appEcommerce/getCartItems', async () => {
//   const response = await axios.get('/ecommerce/cart')
//   return response.data
// })



// export const addToWishlist = createAsyncThunk('appEcommerce/addToWishlist', async id => {
//   await axios.post('/ecommerce/wishlist', { productId: id })
//   return id
// })

// export const deleteCartItem = createAsyncThunk('appEcommerce/deleteCartItem', async (id, { dispatch }) => {
//   await axios.delete(`/ecommerce/cart/${id}`)
//   dispatch(getCartItems())
//   return id
// })

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    loading: false,
    error: null,
    params: {},
    products: [],
    totalProducts: 0,
    productDetail: {},
    allCategory: [],
    category: [],
    activeUser: {},
    selectedUser: null,
    loggedUser: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false
        state.params = action.payload.params
        state.products = action.payload.data.data.reverse()
        state.totalProducts = action.payload.data.pagination.total
        state.pagination = action.payload.data.pagination

      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Get Product
      .addCase(getProduct.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false
        state.productDetail = action.payload.product
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.allCategory = action.payload
      })
      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.loggedUser = action.payload
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(getActiveUser.fulfilled, (state, action) => {
        state.activeUser = action.payload
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.payload.id

        state.products = state.products.filter(
          product => product._id !== deletedId
        )

        state.totalProducts = state.totalProducts - 1
      })
    // .addCase(getWishlistItems.fulfilled, (state, action) => {
    //   state.wishlist = action.payload.products
    // })
    // .addCase(getCartItems.fulfilled, (state, action) => {
    //   state.cart = action.payload.products
    // })

  }
})

export default appEcommerceSlice.reducer
