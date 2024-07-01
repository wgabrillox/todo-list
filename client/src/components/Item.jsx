import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Item() {
  const [form, setForm] = useState({
    label: "",
    amount: "",
    notes: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      const response = await fetch(
        `http://localhost:5050/item/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const item = await response.json();
      if (!item) {
        console.warn(`Item with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(item);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const item = { ...form };
    try {
      const response = await fetch(
        `http://localhost:5050/item${params.id ? "/" + params.id : ""}`,
        {
          method: `${params.id ? "PATCH" : "POST"}`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    } finally {
      setForm({ label: "", amount: "", notes: "" });
      navigate("/");
    }
  }

  return (
    <div className="mt-4 bg-slate-100 w-50 p-2 rounded-lg w-fit">
      <h3 className="text-lg font-semibold mx-auto w-fit">
        Create/Update Items
      </h3>
      <form onSubmit={onSubmit}>
        <div>
          <div className="flex">
            <div className="flex">
              <div className="mr-2">
                <label htmlFor="label" className="text-sm text-slate-500">
                  Label
                </label>
                <div className="mt-1">
                  <div className="border-2 rounded-lg">
                    <input
                      className="p-1"
                      type="text"
                      name="label"
                      id="label"
                      placeholder="Item Label"
                      value={form.label}
                      onChange={(e) => updateForm({ label: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="amount" className="text-sm text-slate-500">
                  Amount
                </label>
                <div className="mt-1">
                  <div className="border-2 rounded-lg">
                    <input
                      className="p-1"
                      type="text"
                      name="amount"
                      id="amount"
                      placeholder="Amount"
                      value={form.amount}
                      onChange={(e) => updateForm({ amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="Notes" className="text-sm text-slate-500">
              Notes
            </label>
            <div>
              <textarea
                className="p-1 w-full"
                type="text"
                name="notes"
                id="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => updateForm({ notes: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div>
          <input
            type="submit"
            className="p-2 border border-black rounded-lg cursor-pointer"
            value="Save Item"
          />
        </div>
      </form>
    </div>
  );
}
