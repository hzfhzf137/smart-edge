// pages/checkout/SuccessModal.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SuccessModal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-700">✅ Payment Successful!</h2>
        <p className="mt-2">Thank you for your order. You will be redirected shortly.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
