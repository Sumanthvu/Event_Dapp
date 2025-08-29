import React, { useState } from 'react';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';

/**
 * Component for creating a new event.
 * @param {object} props - The component props.
 * @param {Function} props.setLoading - Function to set the loading state.
 * @param {Function} props.setMessage - Function to set the message displayed to the user.
 * @param {Function} props.setCurrentPage - Function to change the current page.
 * @param {Function} props.refetch - Function to refetch data from the subgraph.
 */
const CreateEventPage = ({ setLoading, setMessage, setCurrentPage, refetch }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    venue: '',
    imageIPFS: '',
    ticketPrice: '',
    totalTickets: '',
    stakeAmount: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleCreateEvent = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    if (!window.ethereum) {
      setMessage("MetaMask not detected. Please install it.");
      setLoading(false);
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const eventContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const platformFee = parseEther("0.01");
    const stakeAmount = parseEther(formData.stakeAmount.toString());
    const totalValue = platformFee + stakeAmount;

    // Convert ticket price to wei, but keep totalTickets as a regular number
    const ticketPrice = parseEther(formData.ticketPrice.toString());
    const totalTickets = parseInt(formData.totalTickets); // This should be a regular number, not wei

    const tx = await eventContract.createEvent(
      formData.name,
      formData.description,
      Math.floor(new Date(formData.date).getTime() / 1000),
      formData.venue,
      formData.imageIPFS,
      totalTickets, // Pass as regular number
      ticketPrice,  // Pass as wei value
      { value: totalValue }
    );

    setMessage("Transaction sent. Waiting for confirmation...");
    await tx.wait();

    setMessage("Event created successfully!");
    setFormData({
      name: '',
      description: '',
      date: '',
      venue: '',
      imageIPFS: '',
      ticketPrice: '',
      totalTickets: '',
      stakeAmount: '',
    });

    // await refetch();
    setCurrentPage('event-list');
  } catch (error) {
    console.error("Error creating event:", error);
    setMessage(`Failed to create event. Error: ${error.reason || error.message}`);
  } finally {
    setLoading(false);
  }
};

  const cardStyle = {
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    maxWidth: '600px',
    margin: '40px auto',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#333333',
    marginBottom: '20px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#555555',
    marginBottom: '8px',
  };

  const inputStyle = {
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    color: '#333333',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
  };

  const buttonStyle = {
    padding: '12px 25px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#6c63ff',
    color: 'white',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#5a53e6',
    transform: 'translateY(-2px)',
  };

  const helpTextStyle = {
    fontSize: '0.85rem',
    color: '#888888',
    marginTop: '5px',
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Create New Event</h2>
      <form onSubmit={handleCreateEvent} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="description" style={labelStyle}>Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            style={textareaStyle}
          ></textarea>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="date" style={labelStyle}>Event Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="venue" style={labelStyle}>Venue</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="imageIPFS" style={labelStyle}>Image IPFS CID</label>
          <input
            type="text"
            id="imageIPFS"
            name="imageIPFS"
            value={formData.imageIPFS}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="ticketPrice" style={labelStyle}>Base Ticket Price (ETH)</label>
          <input
            type="number"
            id="ticketPrice"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            required
            min="0.001"
            step="0.001"
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="totalTickets" style={labelStyle}>Total Tickets</label>
          <input
            type="number"
            id="totalTickets"
            name="totalTickets"
            value={formData.totalTickets}
            onChange={handleChange}
            required
            min="1"
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="stakeAmount" style={labelStyle}>Stake Amount (ETH)</label>
          <input
            type="number"
            id="stakeAmount"
            name="stakeAmount"
            value={formData.stakeAmount}
            onChange={handleChange}
            required
            min="0.001"
            step="0.001"
            style={inputStyle}
          />
          <p style={helpTextStyle}>This is returned after the event, minus a 30% penalty if not claimed.</p>
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;