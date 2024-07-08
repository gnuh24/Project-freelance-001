import { combineReducers } from 'redux'
import counterReducer from './Example.jsx'
import brandReducer from './productReducer/BrandSlice.jsx'
import imageReducer from './productReducer/ImageSlice.jsx'
import shoeSizeReducer from './productReducer/ShoeSizeSlice.jsx'
import shoeReducer from './productReducer/ShoeSlice.jsx'
import shoeTypeReducer from './productReducer/ShoeTypeSlice.jsx'
const rootReducer = combineReducers({
  counterReducer,
  brandReducer,
  imageReducer,
  shoeSizeReducer,
  shoeReducer,
  shoeTypeReducer,
})

export default rootReducer
