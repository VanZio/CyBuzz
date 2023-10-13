// Thao Linh Nguyen
// 103843952
// Payment page

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import paymentBackground from "../images/payment-background.jpg";
import "./Payment.css";

const Payment = () => {
  // tabld data is kept in a seperate const for easy maintainance and customisation
  const tableData = [
    {
      basic:
        "For individuals or teams just getting started with project management.",
      premium:
        "For teams and companies that need to manage work across initiatives.",
      business:
        "For teams and companies that need to manage work across initiatives.",
      enterprise:
        "For organizations that need additional security, control, and support.",
    },
    {
      basic: <strong>Free</strong>,
      premium: <strong>$8 /mo</strong>,
      business: <strong>$16 /mo</strong>,
      enterprise: <strong>Let's talk!</strong>,
    },
    {
      basic: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
      premium: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
      business: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
      enterprise: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    },
    {
      basic: <button className="table-button">Learn More</button>,
      premium: <button className="table-button">Learn More</button>,
      business: <button className="table-button">Learn More</button>,
      enterprise: <button className="table-button">Learn More</button>,
    },
    {
      basic: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
      premium: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
      business: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
      enterprise: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
    },
    {
      basic: "✓ rem ipsum dolor sit amet",
      premium: "✓ Lorem ipsum dolor sit amet",
      business: "✓ Lorem ipsum dolor sit amet",
      enterprise: "✓ Lorem ipsum dolor sit amet",
    },
    {
      basic: "✓ rem ipsum dolor sit amet",
      premium: "✓ Lorem ipsum dolor sit amet",
      business: "✓ Lorem ipsum dolor sit amet",
      enterprise: "✓ Lorem ipsum dolor sit amet",
    },
    {
      basic: "✓ rem ipsum dolor sit amet",
      premium: "✓ Lorem ipsum dolor sit amet",
      business: "✓ Lorem ipsum dolor sit amet",
      enterprise: "✓ Lorem ipsum dolor sit amet",
    },

    {
      basic: "✓ rem ipsum dolor sit amet",
      premium: "✓ Lorem ipsum dolor sit amet",
      business: "✓ Lorem ipsum dolor sit amet",
      enterprise: "✓ Lorem ipsum dolor sit amet",
    },
    {
      basic: "✓ rem ipsum dolor sit amet",
      premium: "✓ Lorem ipsum dolor sit amet",
      business: "✓ Lorem ipsum dolor sit amet",
      enterprise: "✓ Lorem ipsum dolor sit amet",
    },
    {
      basic: "✓ rem ipsum dolor sit amet",
      premium: "✓ Lorem ipsum dolor sit amet",
      business: "✓ Lorem ipsum dolor sit amet",
      enterprise: "✓ Lorem ipsum dolor sit amet",
    },
  ];
  return (
    <div>
      <Navbar></Navbar>
      <div
        className="payment-container"
        style={{ backgroundImage: `url(${paymentBackground})` }}
      >
        <h1 className="h1">Pricing</h1>
        <h3>Your journey with us starts here!</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="buttons-container">
          <button className="learn-more-button button">Learn More</button>
          <button className="get-started-button button">Get Started</button>
        </div>
      </div>
      <div className="plan-price">
        <h2>
          Choose a plan
          <br />
          that's right for your
        </h2>
        <p className="para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="table-container">
        <table className="payment-table">
          <thead className="thead">
            <tr>
              <th className="th">Basic</th>
              <th className="selected">Premium</th>
              <th className="th">Business</th>
              <th className="th">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {/* data is mapped to table rows from outside */}
            {tableData.map((item) => (
              <tr key={item.basic}>
                <td>{item.basic}</td>
                <td className="selected">{item.premium}</td>
                <td>{item.business}</td>
                <td>{item.enterprise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Payment;
