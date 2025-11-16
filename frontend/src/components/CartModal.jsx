import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Minus, Plus, CreditCard } from 'lucide-react';

function CartModal({ cart, onClose, onRemove, onUpdateQuantity, onCheckout }) {
  const [checkingOut, setCheckingOut] = useState(false);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckoutClick = async () => {
    setCheckingOut(true);
    await onCheckout();
    setCheckingOut(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingCart size={32} />
            <div>
              <h2 className="text-3xl font-bold">Your Cart</h2>
              <p className="text-purple-100">Review your sweet selections</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🛒</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Your Cart is Empty</h3>
              <p className="text-gray-500">Go back and add some delicious treats!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-pink-100 w-16 h-16 rounded-xl flex items-center justify-center text-2xl">
                      🍬
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                      <p className="text-pink-600 font-medium">Rs.{item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                        className="p-2 hover:bg-white rounded-md transition-all disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                        className="p-2 hover:bg-white rounded-md transition-all"
                        disabled={item.quantity >= item.stockAvailable}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Total for Item */}
                    <div className="w-24 text-right">
                      <p className="font-bold text-gray-800">
                        Rs.{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemove(item._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t-2 border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 text-lg">Total Amount</span>
              <span className="text-3xl font-bold text-purple-600">Rs.{getTotalPrice()}</span>
            </div>
            <button
              onClick={handleCheckoutClick}
              disabled={checkingOut}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {checkingOut ? (
                <span>Processing...</span>
              ) : (
                <>
                  <CreditCard size={24} />
                  <span>Checkout Now</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;