import React, { useState } from 'react';
import './AddNewStarshipModal.css';
import PropTypes from 'prop-types';

const AddNewStarshipModal = ({ onSubmit: onAddStarship, isOpen: isOpen, onClose: onClose }) => {
  const [starship, setStarship] = useState({
    name: '',
    model: '',
    manufacturer: '',
    cost_in_credits: '',
    crew: '',
      passengers: '',
      url: 'https://swapi.dev/api/starships/#',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStarship((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStarship(starship);
    setStarship({
      name: '',
      model: '',
      manufacturer: '',
      cost_in_credits: '',
      crew: '',
        passengers: '',
        url: 'https://swapi.dev/api/starships/#'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Starship</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={starship.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Model:
            <input
              type="text"
              name="model"
              value={starship.model}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Manufacturer:
            <input
              type="text"
              name="manufacturer"
              value={starship.manufacturer}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Cost in Credits:
            <input
              type="number"
              name="cost_in_credits"
              value={starship.cost_in_credits}
              onChange={handleChange}
            />
          </label>
          <label>
            Crew:
            <input
              type="number"
              name="crew"
              value={starship.crew}
              onChange={handleChange}
            />
          </label>
          <label>
            Passengers:
            <input
              type="number"
              name="passengers"
              value={starship.passengers}
              onChange={handleChange}
            />
            </label>
            <label>
                URL:
                <input
                    type="string"
                    name="passengers"
                    value={starship.url}
                    onChange={handleChange}
                          defaultValue="https://swapi.dev/api/starships/#"
                />
            </label>
          <div className="modal-actions">
            <button type="submit">Add Starship</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddNewStarshipModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddStarship: PropTypes.func.isRequired,
};

export default AddNewStarshipModal;