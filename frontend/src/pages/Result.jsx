// Thao Linh Nguyen
// 103843952
// Result page

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Result.css";
const Result = () => {

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const handleOption3Change = (event) => {
    setOption3(event.target.value);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="result-container">
        <h1 className="center-heading ">Result</h1>
        <p className="result-p">Contract name: Audit #1</p>
        <p className="result-p">Contract ID: 12344567899</p>
        <details className="collapsible">
          <summary>Reentrancy Attacks</summary>
          <div className="paragraph-content">
            Reentrancy attack vectors exist because Solidity smart contracts
            execute imperatively: Each line of code must execute before the next
            one starts. This means that when a contract makes an external call
            to a different contract, the calling contract's execution is paused
            until the call returns. This effectively gives the called contract
            temporary control over what happens next, creating the possibility
            of an infinite loop.
            <br />
            <br />
            Fix: This vulnerability occurs when the code logic of a smart
            contract is flawed. Developers need to carefully design external
            calls and always check and update the contract's state, such as
            decreasing the Ether balance before fulfilling requests to send
            funds. Adding a reentrancy guard can prevent more than one function
            from being executed at a time by locking the contract. Various audit
            tools, such as Slither, Mythril and Securify, can check for the
            presence of the different types of reentrancy vulnerabilities.
          </div>
        </details>
        <details className="collapsible">
          <summary>Integer Overflow/Underflow</summary>
          <div className="paragraph-content">
            Integer underflows and overflows occur when the result of an
            arithmetic operation falls outside the fixed-size range of values: 0
            to 255 in the case of integer type uint8. Values higher than 255
            overflow and are reset to 0, while values lower than 0 reset to 255.
            This causes unexpected changes to a contract's state variables and
            logic and triggers invalid operations.
            <br />
            <br />
            Fix: Since version 0.8.0, the Solidity compiler no longer allows
            code that could result in integer underflows and overflows. Check
            any contracts compiled with earlier versions for functions involving
            arithmetic operations or use a library, such as SafeMath, to check
            for underflow and overflow issues.
          </div>
        </details>
        <details className="collapsible">
          <summary>Gas Griefing</summary>
          <div className="paragraph-content">
            To perform a transaction or execute a smart contract on the Ethereum
            blockchain platform, users must pay a gas fee. It is paid to
            incentivize validators (miners) to commit the resources needed to
            verify transactions. The price of gas is determined by supply,
            demand and network capacity at the time of the transaction.
            <br />
            <br />
            Gas griefing occurs when a user sends the amount of gas required to
            execute the target smart contract but not enough to execute subcalls
            -- calls it makes to other contracts. If the contract does not check
            if the required gas to execute a subcall is available, the subcall
            will not execute as expected. This can have a significant effect on
            the application's logic.
            <br />
            <br />
            Fix: No effective technique to prevent gas griefing exists. All a
            developer can do is code the contract so it sets the amount of gas
            to be sent, not the user. A rise in gas costs, however, could mean
            that the transaction fails.
          </div>
        </details>
        <p className="result-p" id="result-p">
          3 vulnerabilities found
        </p>
        <br/> 
        <br/> 
        <br/> 
        <br/> 
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Result;
