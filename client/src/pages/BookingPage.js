import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/movies";

const theatres = [
  { name: "PVR Cinemas", price: 250 },
  { name: "INOX", price: 220 },
  { name: "Carnival", price: 200 },
];

const generateSeatOptions = () => {
  const rows = ["A", "B", "C", "D", "E"];
  const seats = [];
  rows.forEach((row) => {
    for (let i = 1; i <= 10; i++) {
      seats.push(`${row}${i}`);
    }
  });
  return seats;
};

const getNextFourDays = () => {
  const days = [];
  for (let i = 0; i < 4; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push(date.toISOString().split("T")[0]);
  }
  return days;
};

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(id));
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatOptions = generateSeatOptions();
  const availableDates = getNextFourDays();
  const selectedTheatreDetails = theatres.find((t) => t.name === selectedTheatre);
  const ticketPrice = selectedTheatreDetails?.price || 0;
  const totalAmount = selectedSeats.length * ticketPrice;

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handlePayment = async () => {
    if (!user || !selectedSeats.length || !selectedDate || !selectedTime || !selectedTheatre) {
      alert("Please fill all booking details and login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const orderData = await res.json();

      const options = {
        key: "rzp_test_1nIt8zqW78l94z",
        amount: orderData.amount,
        currency: "INR",
        name: "Movie Booking",
        description: "Movie Ticket Booking",
        order_id: orderData.id,
        handler: async function (response) {
          const booking = {
            userId: user._id || user.id,
            userName: user.name,
            movieId: movie.id,
            movieTitle: movie.title,
            theatre: selectedTheatre,
            date: selectedDate,
            time: selectedTime,
            seats: selectedSeats,
            amount: totalAmount,
            paymentId: response.razorpay_payment_id,
          };

          await fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking),
          });

          alert("Booking successful!");
          navigate("/my-bookings");
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#1e40af" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Book Tickets for {movie.title}</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Select Theatre</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={selectedTheatre}
            onChange={(e) => setSelectedTheatre(e.target.value)}
          >
            <option value="">Select</option>
            {theatres.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} (₹{t.price})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Select Date</label>
          <div className="flex gap-2 flex-wrap">
            {availableDates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-3 py-1 rounded border ${
                  selectedDate === date ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {new Date(date).toDateString()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold">Select Time</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="10:00 PM">10:00 PM</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Select Seats</label>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {seatOptions.map((seat) => (
              <button
                key={seat}
                onClick={() => toggleSeat(seat)}
                className={`px-3 py-1 border rounded ${
                  selectedSeats.includes(seat)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {seat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-lg font-semibold">
          Total Amount: ₹{totalAmount}
        </div>

        <div className="mt-4">
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Pay & Book ({selectedSeats.length} seat
            {selectedSeats.length !== 1 ? "s" : ""})
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;