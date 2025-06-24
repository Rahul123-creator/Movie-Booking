import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const generateInvoice = (booking) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Movie Ticket Invoice", 14, 22);

  doc.setFontSize(12);
  doc.text(`Name: ${booking.userName || "Guest"}`, 14, 35);
  doc.text(`Movie: ${booking.movieTitle}`, 14, 42);
  doc.text(`Date: ${booking.date}`, 14, 49);
  doc.text(`Time: ${booking.time}`, 14, 56);
  doc.text(`Theatre: ${booking.theatre}`, 14, 63);
  doc.text(`Seats: ${booking.seats.join(", ")}`, 14, 70);
  doc.text(`Payment ID: ${booking.paymentId}`, 14, 77);
  doc.text(`Total Paid: Rs ${booking.amount}`, 14, 84);

  doc.save(`Invoice_${booking.movieTitle}_${booking.paymentId}.pdf`);
};

const MyBookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings/user/${user._id || user.id}`);
        const data = await res.json();
        setMyBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) {
    return <div className="p-8 text-red-600">Please log in to view your bookings</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        {myBookings.length === 0 ? (
          <p className="text-gray-600">No bookings yet.</p>
        ) : (
          <ul className="space-y-4">
            {myBookings.map((booking, index) => (
              <li key={index} className="p-4 border rounded bg-gray-50">
                <p><strong>Movie:</strong> {booking.movieTitle}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
                <p><strong>Payment ID:</strong> {booking.paymentId}</p>
                <p><strong>Total:</strong> Rs {booking.amount}</p>
                <button onClick={() => generateInvoice(booking)}
                 className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"> Download Invoice</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyBookings;