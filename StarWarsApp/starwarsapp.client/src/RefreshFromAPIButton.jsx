import React from 'react';

/**
 * RefreshFromAPIButton
 * A button component that triggers a refresh from the API.
 *
 * Props:
 * - onRefresh: function to call when the button is clicked
 * - disabled: boolean to disable the button
 */
const RefreshFromAPIButton = ({ disabled = false, handleCompleted }) => {

    const triggerEvent = async () => {
        try {
            const response = await fetch('starship/APIUpdate', {
                method: 'GET', // or 'POST', 'PUT', 'DELETE'
            });

            const data = await response.json();

            if (data.length > 0) {
                handleCompleted(data.length + " starships arrived.");
            } else {
                handleCompleted('Failed to refresh data.');
            }
        } catch (error) {
            handleCompleted('Error calling API:', error);
        }
    };


  return (
    <button
      type="button"
      onClick={triggerEvent}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        backgroundColor: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      aria-label="Refresh data from API"
    >
      Refresh from API
    </button>
  );
};



export default RefreshFromAPIButton;