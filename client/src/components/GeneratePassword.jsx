import React, { useState } from "react";
import {AiFillCopy} from 'react-icons/ai'
import {BiSolidCheckboxChecked} from 'react-icons/bi'
const GeneratePassword = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const generateRandomPassword = () => {
    if (passwordLength > 20) {
      alert("Please Reduce the size and try again");
    } else if (passwordLength < 8) {
      alert("Please Increase the size and try again");
    } else {
      const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      const specialChars = "@#$%&";
      const numberChars = "0123456789";

      let password = "";

      const allChars =
        uppercaseChars + lowercaseChars + specialChars + numberChars;

      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars.charAt(randomIndex);
      }

      setGeneratedPassword(password);
      setIsCopied(false);
    }
  };
  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.log('Failed to copy password to clipboard:', error);
      });
  };

  return (
    <div className="password-generator">
      <h2 className="title">Generate a Password</h2>
      <h4 className="title">!Password Size lies between 8 to 20!</h4>
      <div className="form-group">
        <label htmlFor="passwordLength">Password Length:</label>
        <input
          type="number"
          id="passwordLength"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          className="input-field"
        />
      </div>

      <button className="generate-btn" onClick={generateRandomPassword}>
        Generate Password
      </button>

      {generatedPassword && (
        <>
        <div className="generated-password">
          <h3>This Can be your password-:</h3>
          <h2 className="password-text">{generatedPassword}</h2>
        </div>
          <button className="copy-btn" onClick={copyPasswordToClipboard}>
            {isCopied ? <BiSolidCheckboxChecked/> : <AiFillCopy/>}
          </button>
        </>
      )}
    </div>
  );
};

export default GeneratePassword;
