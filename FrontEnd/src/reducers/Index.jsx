import { combineReducers } from 'redux'
import brandReducer from './productReducer/BrandSlice.jsx'
import imageReducer from './productReducer/ImageSlice.jsx'
import shoeSizeReducer from './productReducer/ShoeSizeSlice.jsx'
import shoeReducer from './productReducer/ShoeSlice.jsx'
import shoeTypeReducer from './productReducer/ShoeTypeSlice.jsx'
import loginReducer from './auth/LoginSlice.jsx'
import colorReducer from './productReducer/ColorSlice.jsx'
import cartReducer from './shopping/CartSlice.jsx'
import orderReducer from './shopping/OrderSlice.jsx'
const rootReducer = combineReducers({
  brandReducer,
  imageReducer,
  shoeSizeReducer,
  shoeReducer,
  shoeTypeReducer,
  loginReducer,
  colorReducer,
  cartReducer,
  orderReducer,
})

export default rootReducer
