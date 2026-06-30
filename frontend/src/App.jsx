import React, { useState } from 'react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1); // 1 = Register, 2 = Book, 3 = Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [bookingData, setBookingData] = useState({ eventName: 'Coldplay World Tour', ticketPrice: 150 });

  const GATEWAY_URL = 'http://localhost:8090';

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${GATEWAY_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      if (!response.ok) throw new Error('Registration failed. Email may already be in use.');
      
      const data = await response.json();
      setUserId(data.id);
      setCurrentStep(2); // Move to booking step
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = { ...bookingData, userId };
      const response = await fetch(`${GATEWAY_URL}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to book the ticket. Please try again.');
      
      setCurrentStep(3); // Move to success step
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        
        {/* Header */}
        <div className="card-header">
          <div style={{ fontSize: '40px' }}>🎫</div>
          <h1>Book Your Ticket</h1>
        </div>

        {/* Body */}
        <div className="card-body">
          {error && (
            <div className="error-box">
              ⚠️ {error}
            </div>
          )}

          {/* STEP 1: REGISTRATION */}
          {currentStep === 1 && (
            <form onSubmit={handleRegister}>
              <h2 className="step-title">👤 Create Account</h2>
              
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  required
                  className="form-control"
                  placeholder="Username"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  required
                  className="form-control"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  required
                  className="form-control"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </form>
          )}

          {/* STEP 2: BOOKING */}
          {currentStep === 2 && (
            <form onSubmit={handleBook}>
               <h2 className="step-title">🎵 Select Event</h2>
              
              <div className="form-group">
                <label>Event Name</label>
                <select 
                  className="form-control"
                  value={bookingData.eventName}
                  onChange={(e) => setBookingData({...bookingData, eventName: e.target.value})}
                >
                  <option value="Coldplay World Tour">Coldplay World Tour</option>
                  <option value="Taylor Swift Eras Tour">Taylor Swift Eras Tour</option>
                  <option value="Ed Sheeran Live">Ed Sheeran Live</option>
                </select>
              </div>
              
              <div className="price-display">
                <span>Total Price:</span>
                <strong>${bookingData.ticketPrice}</strong>
              </div>

              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </form>
          )}

          {/* STEP 3: SUCCESS */}
          {currentStep === 3 && (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <h2>Booking Confirmed!</h2>
              <p>
                Your ticket for <strong>{bookingData.eventName}</strong> has been secured. You will receive an email notification shortly.
              </p>
              <button 
                onClick={() => {
                  setRegisterData({ username: '', email: '', password: '' });
                  setCurrentStep(1);
                }}
                className="btn-link"
              >
                Book another ticket
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}