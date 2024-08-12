<<<<<<< HEAD
import { combineReducers } from '@reduxjs/toolkit'; // Ensure you're using @reduxjs/toolkit
import brandReducer from './productReducer/BrandSlice.jsx';
import imageReducer from './productReducer/ImageSlice.jsx';
import shoeSizeReducer from './productReducer/ShoeSizeSlice.jsx';
import shoeReducer from './productReducer/ShoeSlice.jsx';
import shoeTypeReducer from './productReducer/ShoeTypeSlice.jsx';
import loginReducer from './auth/LoginSlice.jsx';
import colorReducer from './productReducer/ColorSlice.jsx';
import cartReducer from './shopping/CartSlice.jsx';
import orderReducer from './shopping/OrderSlice.jsx';
import accountReducer from './auth/AccountSlice.jsx'; // Import your accountReducer
import feedbackReducer from './other/FeedbackSlice.jsx'; // Import your accountReducer
import voucherReducer from './voucherReducer/VoucherSlice.jsx'
=======
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
import accountReducer from './auth/AccountSlice.jsx' // Import your accountReducer
import feedbackReducer from './other/FeedbackSlice.jsx' // Import your accountReducer
import inventoryReportSlice from './inventoryReducers/InventoryReportSlice.jsx'
import registerReducer from './auth/RegisterReducer.jsx'
>>>>>>> faa277d2e9f0dfc1ba1c74956bfae582b53507b5

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
  vouchers: voucherReducer
});
=======
  registerReducer,
  inventoryReportSlice,
})
>>>>>>> faa277d2e9f0dfc1ba1c74956bfae582b53507b5

export default rootReducer
