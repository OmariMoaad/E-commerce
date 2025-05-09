import React, { useState, useEffect } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";

export default function NewCollections() {
  const [new_collection, setNew_Collection] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/newcollection");
        const data = await res.json();
        setNew_Collection(data);
      } catch (err) {
        console.error("Error fetching new collection:", err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="new-collections">
      <h1>New Collections</h1>
      <hr />
      <div className="new-collections-item">
        {new_collection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}
