import { loadScript } from '../utils/helpers';

// Razorpay की स्क्रिप्ट लोड करें
export const loadRazorpay = async () => {
  return await loadScript('https://checkout.razorpay.com/v1/checkout.js');
};

// Razorpay पेमेंट शुरू करें
export const initiateRazorpayPayment = async (orderData) => {
  try {
    await loadRazorpay();
    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount * 100, // पैसे में बदलने के लिए
      currency: 'INR',
      name: 'हमारा स्टोर',
      description: `ऑर्डर #${orderData.orderId}`,
      image: '/logo.png',
      order_id: orderData.razorpayOrderId,
      handler: function (response) {
        // पेमेंट सफल होने पर
        if (typeof orderData.onSuccess === 'function') {
          orderData.onSuccess(response);
        }
      },
      prefill: {
        name: orderData.customerName,
        email: orderData.customerEmail,
        contact: orderData.customerPhone
      },
      notes: {
        address: orderData.customerAddress
      },
      theme: {
        color: '#3b82f6'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    
    rzp.on('payment.failed', function (response) {
      if (typeof orderData.onFailure === 'function') {
        orderData.onFailure(response);
      }
    });

    return rzp;
  } catch (error) {
    console.error('रजोरपे पेमेंट इनिशियलाइजेशन में त्रुटि:', error);
    throw error;
  }
};

// PayPal पेमेंट के लिए (वैकल्पिक)
export const initiatePaypalPayment = async (orderData) => {
  // PayPal इंटीग्रेशन का कोड यहाँ आएगा
  console.log('PayPal पेमेंट इनिशियलाइज़ करना:', orderData);
};