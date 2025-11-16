import React from 'react';
import SweetCard from './SweetCard';

function SweetGrid({ sweets, user, onPurchase, onAddToCart, onEdit, onDelete, onRestock }) {
  if (sweets.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🍬</div>
          <h3 className="text-3xl font-bold text-gray-700 mb-4">No Sweets Available</h3>
          <p className="text-gray-500">Check back soon for new delicious treats!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            user={user}
            onPurchase={onPurchase}
            onAddToCart={onAddToCart} // Pass the prop down
            onEdit={onEdit}
            onDelete={onDelete}
            onRestock={onRestock}
          />
        ))}
      </div>
    </div>
  );
}

export default SweetGrid;