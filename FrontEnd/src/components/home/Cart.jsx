const Cart = ({ onSetOpen }) => {
  return (
    <button
      onClick={onSetOpen}
      className="p-3 fixed bottom-43/100 right-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      <i className="fa-solid fa-cart-shopping w-6 h-6 text-center"></i>
    </button>
  )
}
export default Cart
