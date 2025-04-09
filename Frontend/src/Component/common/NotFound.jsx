import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package } from 'lucide-react';

const FunEcommerce404 = () => {
  const [rotation, setRotation] = useState(0);
  const [bouncePos, setBouncePos] = useState(0);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCart(true), 500);

    let direction = 1;
    const bounceInterval = setInterval(() => {
      setBouncePos((prev) => {
        if (prev > 10) direction = -1;
        if (prev < -10) direction = 1;
        return prev + direction;
      });
    }, 50);

    const rotationInterval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 100);

    return () => {
      clearInterval(bounceInterval);
      clearInterval(rotationInterval);
    };
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light p-4">
      <div
        className="card shadow-lg w-100"
        style={{
          maxWidth: '600px',
          position: 'relative',
          backgroundColor: '#f9fafb',
          color: '#374151',
          borderRadius: '16px'
        }}
      >
        {showCart && (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              animation: 'bounce 1s infinite'
            }}
          >
            <ShoppingCart color="#9333ea" size={32} />
          </div>
        )}

        {/* Header with gradient */}
        <div
          className="card-header text-center"
          style={{
            background: 'linear-gradient(to right, #374151, #111827)',
            color: '#fff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px'
          }}
        >
          <h1 className="display-5 fw-bold mb-1">Oops!</h1>
          <p className="mb-0">We couldn't find that page</p>
        </div>

        {/* Main Content */}
        <div className="card-body text-center">
          <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
            <div
              className="fw-bold"
              style={{
                fontSize: '5rem',
                color: '#9333ea',
                transform: `rotate(${rotation / 10}deg)`
              }}
            >
              4
            </div>
            <div
              style={{
                fontSize: '5rem',
                color: '#ec4899',
                position: 'relative',
                top: `${bouncePos}px`
              }}
            >
              <Package size={80} />
            </div>
            <div
              className="fw-bold"
              style={{
                fontSize: '5rem',
                color: '#9333ea',
                transform: `rotate(${-rotation / 10}deg)`
              }}
            >
              4
            </div>
          </div>

          <p className="fs-5 mb-4 text-muted">
            Sorry, this page wasn't found in our warehouse!
          </p>

          <div className="d-flex justify-content-center">
            <button
              onClick={() => (window.location.href = '/')}
              className="btn d-flex align-items-center justify-content-center gap-2"
              style={{
                backgroundColor: '#9333ea',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '500'
              }}
            >
              <ShoppingCart size={18} />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* Bounce Animation */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default FunEcommerce404;
