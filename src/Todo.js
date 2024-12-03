import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './Todo.css'; 

function Todo() {
  const [items, setItems] = useState([]);  // State to hold list of items
  const [title, setTitle] = useState('');  // State to hold new item's title
  const [content, setContent] = useState(''); // State to hold new item's content

  // Function to fetch all items from the API (GET)
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/react_app/items/');
      setItems(response.data);  // Set items in state
    } catch (error) {
      console.error('There was an error fetching the items:', error);
    }
  };

  // Fetch items on initial render
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to handle adding new items (POST)
  const handleAdd = async () => {
    if (title && content) {
      try {
        const newItem = { title, description: content };  // Send description instead of content
        const response = await axios.post('http://127.0.0.1:8000/react_app/items/', newItem);
        setItems([...items, response.data]);  // Add the new item to the state
        setTitle('');  // Clear input field after successful add
        setContent('');  // Clear content field
      } catch (error) {
        console.error('There was an error adding the item:', error);
      }
    }
  };

  // Function to handle deleting an item (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/react_app/items/${id}/`);
      setItems(items.filter(item => item.id !== id));  // Remove the deleted item from state
    } catch (error) {
      console.error('There was an error deleting the item:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <h3>Add Content</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
        ></textarea>
        <button onClick={handleAdd} className="add-button">
          Add
        </button>
      </div>

      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} className="content-box">
            <h4>{item.title}</h4>
            <p>{item.description}</p>  {/* Display description as the content */}
            <button onClick={() => handleDelete(item.id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
