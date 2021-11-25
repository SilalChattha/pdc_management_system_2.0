import React from "react";
import "../profile.css";

export default function Profile(props) {
  return (
    <>
      <div class="footer">PDC 2.0</div>

      <h1>Main Menu</h1>
      <div class="button">
        <button type="button" onclick="alert('This is the Menu for today')">
          View Menu
        </button>

        <button type="button" onclick="alert('You have been logged out')">
          Log Out
        </button>
      </div>
    </>
  );
}
