import { useEffect, useState } from 'react';
import RefreshFromAPIButton from './RefreshFromAPIButton';
import AddNewStarshipModal from './AddNewStarshipModal';
import './App.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FadeLoader } from "react-spinners";

function App() {
    const [data, setStarShips] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        const fetchRowsWithRetry = async () => {
            while (!isCancelled && data.length === 0) {
                try {
                    const res = await axios.get('/starship');
                    setStarShips(res.data);
                    setLoading(false);
                    break;
                } catch (error) {
                    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 sec
                }
            }
        };

        fetchRowsWithRetry();

        return () => {
            isCancelled = true; // cleanup on unmount
        };
    }, []);

    const handleEdit = (row) => setEditingRow({ ...row });

    const handleNotification = (message) => {
        toast.info(message, { position: 'top-center' });
        fetchRows();
    }

    const handleDelete = async (id) => {
        await axios.delete(`/starship/${id}`)
            .then(response => {
                console.log('Resource deleted successfully:', response.data);
                toast.info('Pew Pew!!! ' + response.data[0].name + ' deleted successfully', {
                    position: 'top-center',
                });
            })
            .catch(error => {
                console.error('Error deleting resource:', error);
            });            ;
        fetchRows();
    };

    const handleUpdate = async () => {
        await axios.put(`/starship/${editingRow.id}`, editingRow)
            .then(response => {
                console.log('Resource updated successfully:', response.data);
                toast.success('Updated successfully', {
                    position: 'top-center',
                });
            })
            .catch(error => {
                console.error('Error updating resource:', error);
            });
        setEditingRow(null);
        fetchRows();
    };

    const handleAdd = async (data) => {
        await axios.post('/starship/addstarship', data).then(response => {
            toast.success(data.name + ' added successfully', {
                position: 'top-center',
            });
        })
            .catch(error => {
                console.error('Error adding starship:', error);
            });
        setEditingRow(null);
        fetchRows();
    }

    const handleInputChange = (e, setter) => {
        const { name, value } = e.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const TableComponent = () => {
  /*      const [data, setStarShips] = useState([]);*/
        const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
        const [filter, setFilter] = useState('');

        const handleSort = (key) => {
            let direction = 'ascending';
            if (sortConfig.key === key && sortConfig.direction === 'ascending') {
                direction = 'descending';
            }

            const sortedData = [...data].sort((a, b) => {
                let left, right;
                const number_fields = new Set(['cost_In_Credits', 'length', 'max_Atmosphering_Speed', 'crew', 'passengers', 'cargo_Capacity']);
                if (number_fields.has(key)) {
                    left = a[key] === "unknown" || a[key] === null || isNaN(a[key].replace(/,/g, '')) ? 0 : Number(a[key].replace(/,/g, ''));
                    right = b[key] === "unknown" || b[key] === null || isNaN(b[key].replace(/,/g, '')) ? 0 : Number(b[key].replace(/,/g, ''));
                }
                else {
                    left = a[key];
                    right = b[key];
                }
                if (left < right) return direction === 'ascending' ? -1 : 1;
                if (left > right) return direction === 'ascending' ? 1 : -1;
                return 0;
            });

            setSortConfig({ key, direction });
            setStarShips(sortedData);
        };

        const filteredData = data.filter((item) =>
            Object.values(item).some((val) =>
                val.toString().toLowerCase().includes(filter.toLowerCase())
            )
        );

        // Modal state management
        const [isModalOpen, setIsModalOpen] = useState(false);

        const handleOpen = () => setIsModalOpen(true);
        const handleClose = () => setIsModalOpen(false);

        const handleFormSubmit = (data) => {
            console.log("Form submitted:", data);
            handleClose();
        };

        return (
            <div className="table-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-input"
                />
                
                <div className="add-record">
                    <button onClick={handleOpen}>Add New Starship</button>
                    <AddNewStarshipModal isOpen={isModalOpen} onClose={handleClose} onSubmit={handleAdd} />
                </div>
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>
                                Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('model')}>
                                Model {sortConfig.key === 'model' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('manufacturer')}>
                                Manufacturer {sortConfig.key === 'manufacturer' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('cost_In_Credits')}>
                                Cost {sortConfig.key === 'cost_In_Credits' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('length')}>
                                Length {sortConfig.key === 'length' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('max_Atmosphering_Speed')}>
                                Max Atmosphering Speed {sortConfig.key === 'max_Atmosphering_Speed' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('crew')}>
                                Crew {sortConfig.key === 'crew' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('passengers')}>
                                Passengers {sortConfig.key === 'passengers' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </th>
                            <th onClick={() => handleSort('cargo_Capacity')}>
                                Cargo Capacity {sortConfig.key === 'cargo_Capacity' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </th>
                            <th>Consumbles</th>
                            <th>Hyperdrive Rating</th>
                            <th>MGLT</th>
                            <th>Starship Class</th>
                            {/*<th>Pilots</th>*/}
                            {/*<th>Films</th>*/}
                            {/*<th>Created</th>*/}
                            {/*<th>Edited</th>*/}
                            {/*<th>Url</th>*/}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((row, index) => (
                                <tr key={index} onDoubleClick={() => handleEdit(row)}>
                                    <td>{editingRow?.id === row.id ? (
                                        <input
                                            name="name"
                                            value={editingRow.name}
                                            onChange={(e) => handleInputChange(e, setEditingRow)}
                                        />
                                    ) : row.name}</td>
                                    <td>{editingRow?.id === row.id ? (
                                        <input
                                            name="model"
                                            value={editingRow.model}
                                            onChange={(e) => handleInputChange(e, setEditingRow)}
                                        />
                                    ) : row.model}</td>
                                    <td>{editingRow?.id === row.id ? (
                                        <input
                                            name="manufacturer"
                                            value={editingRow.manufacturer}
                                            onChange={(e) => handleInputChange(e, setEditingRow)}
                                        />
                                    ) : row.manufacturer}</td>
                                    <td>{editingRow?.id === row.id ? (
                                        <input
                                            name="cost_In_Credits"
                                            value={editingRow.cost_In_Credits}
                                            onChange={(e) => handleInputChange(e, setEditingRow)}
                                        />
                                    ) : row.cost_In_Credits}</td>
                                    <td>{editingRow?.id === row.id ? (
                                        <input
                                            name="length"
                                            value={editingRow.length}
                                            onChange={(e) => handleInputChange(e, setEditingRow)}
                                        />
                                    ) : row.length}</td>
                                    <td>{editingRow?.id === row.id ? (
                                        <input
                                            name="max_Atmosphering_Speed"
                                            value={editingRow.max_Atmosphering_Speed}
                                            onChange={(e) => handleInputChange(e, setEditingRow)}
                                        />
                                    ) : row.max_Atmosphering_Speed}</td>
                                    <td>{editingRow?.id === row.id ? (
                                        <input
                                            name="crew"
                                            value={editingRow.crew}
                                            onChange={(e) => handleInputChange(e, setEditingRow)}
                                        />
                                    ) : row.crew}</td>
                                    <td>{editingRow?.id === row.id ? (
                                        <input
                                            name="passengers"
                                            value={editingRow.passengers}
                                            onChange={(e) => handleInputChange(e, setEditingRow)}
                                        />
                                    ) : row.passengers}</td>
                                    <td>{editingRow?.id === row.id ? (
                                        <input
                                            name="cargo_Capacity"
                                            value={editingRow.cargo_Capacity}
                                            onChange={(e) => handleInputChange(e, setEditingRow)}
                                        />
                                    ) : row.cargo_Capacity}</td>
                                    {/*<td>{row.pilots}</td>*/}
                                    {/*<td>{row.films}</td>*/}
                                    <td>{row.consumables}</td>
                                    <td>{row.hyperdrive_Rating}</td>
                                    <td>{row.mglt}</td>
                                    <td>{row.starship_Class}</td>
                                    <td>
                                        {editingRow?.id === row.id ? (
                                            <>
                                                <button onClick={handleUpdate}>Save</button>
                                                <button onClick={() => setEditingRow(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                    <button onClick={() => handleEdit(row)}><FontAwesomeIcon icon={faEdit} /></button>

                                                    <button onClick={() => handleDelete(row.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="no-results">No matching results</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };
    

    return (
        <div>
            <ToastContainer />
            <div className="heading-container">
                <h1>Starships</h1>
                <p>Welcome to your Starship catalog.</p>

                <RefreshFromAPIButton handleCompleted={handleNotification}></RefreshFromAPIButton>
            </div>
            {TableComponent()}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <FadeLoader
                color="blue"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            /></div>
 

        </div>
    );
    
    async function fetchRows() {
        try {
            const res = await axios.get('/starship');

            setStarShips(res.data);
        } catch (err) { }
    }
}

export default App;