import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Stulist from "../Studlist";

export default function Page() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [list, setList] = useState(Stulist);
  const [editItemId, setEditItemId] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const idValue = uuid();
    const sliceId = idValue.slice(0, 4);
    const newItem = {
      id: sliceId,
      firstname: firstname,
      lastname: lastname,
    };
    setList([...list, newItem]);
    setFirstname("");
    setLastname("");
  };

  const handleDelete = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const handleEdit = (id) => {
    setEditItemId(id);
  };

  const handleSave = (id) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          firstname: firstname,
          lastname: lastname,
        };
      }
      return item;
    });
    setList(updatedList);
    setEditItemId(null);
    setFirstname("");
    setLastname("");
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editItemId === item.id ? (
                    <input
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  ) : (
                    item.firstname
                  )}
                </td>
                <td>
                  {editItemId === item.id ? (
                    <input
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  ) : (
                    item.lastname
                  )}
                </td>
                <td>
                  {editItemId === item.id ? (
                    <button type="button" onClick={() => handleSave(item.id)}>
                      Save
                    </button>
                  ) : (
                    <button type="button" onClick={() => handleEdit(item.id)}>
                      Edit
                    </button>
                  )}
                </td>
                <td>
                  <button type="button" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

