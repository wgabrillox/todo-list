import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Item = (props) => (
  <div className="flex bg-slate-200 mb-2 rounded-lg">
    <div className="grow">
      <Link to={`/edit/${props.item._id}`}>
        <div className="flex border rounded-lg p-1">
          <div className="mr-4 grow">{props.item.label}</div>
          <div>${props.item.amount}</div>
        </div>
      </Link>
    </div>
    <div className="border border-red-400 rounded-lg ml-1 text-red-400 w-4 text-center my-1 cursor-pointer">
      <button
        onClick={() => {
          props.deleteItem(props.item._id);
        }}
      >
        X
      </button>
    </div>
  </div>
);

Item.propTypes = {
  item: {},
  deleteItem: {},
};

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const response = await fetch(`http://localhost:5050/item/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const items = await response.json();
      setItems(items);
    }
    getItems();
    return;
  }, [items.length]);

  async function deleteItem(id) {
    await fetch(`http://localhost:5050/item/${id}`, {
      method: "DELETE",
    });
    const newItems = items.filter((el) => el._id !== id);
    setItems(newItems);
  }

  function itemList() {
    return items.map((item) => (
      <Item
        item={item}
        deleteItem={() => deleteItem(item._id)}
        key={item._id}
      />
    ));
  }

  return (
    <div className="mt-4 bg-slate-100 p-2 w-fit rounded-lg shadow-md">
      <h3 className="font-bold">Items List</h3>
      <div>{itemList()}</div>
    </div>
  );
}
