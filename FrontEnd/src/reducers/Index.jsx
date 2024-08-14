import { combineReducers } from '@reduxjs/toolkit' // Ensure you're using @reduxjs/toolkit
import brandReducer from './productReducer/BrandSlice.jsx'
import imageReducer from './productReducer/ImageSlice.jsx'
import shoeSizeReducer from './productReducer/ShoeSizeSlice.jsx'
import shoeReducer from './productReducer/ShoeSlice.jsx'
import shoeTypeReducer from './productReducer/ShoeTypeSlice.jsx'
import loginReducer from './auth/LoginSlice.jsx'
import colorReducer from './productReducer/ColorSlice.jsx'
import cartReducer from './shopping/CartSlice.jsx'
import orderReducer from './shopping/OrderSlice.jsx'
import accountReducer from './auth/AccountSlice.jsx'
import feedbackReducer from './other/FeedbackSlice.jsx'
import inventoryReportSlice from './inventoryReducers/InventoryReportSlice.jsx'
import registerReducer from './auth/RegisterReducer.jsx'
import voucherReducer from './voucherReducer/VoucherSlice.jsx'
import eventReducer from './eventReducer/EventSlice.jsx'

import shippingFeeReducer from './shopping/ShippingFeeSlice.jsx'
<<<<<<< HEAD
=======
import logoutReducer from './auth/LogoutSlice.jsx'
>>>>>>> da00e05acec6868f2fd0d5aaa308970aa3da7006

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
  accountReducer, // Add accountReducer here
  feedbackReducer,
<<<<<<< HEAD
  vouchers: voucherReducer,
  events: eventReducer,
=======
>>>>>>> da00e05acec6868f2fd0d5aaa308970aa3da7006
  registerReducer,
  inventoryReportSlice,
  vouchers: voucherReducer,
  shippingFees: shippingFeeReducer, // Note the corrected key here
  logoutReducer,
})

export default rootReducer
