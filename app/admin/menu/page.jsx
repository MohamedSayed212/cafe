"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

// The empty form state — used when adding a new item
const emptyForm = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  image_url: "",
};

export default function AdminMenuPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Controls whether the form modal is open
  const [showForm, setShowForm] = useState(false);

  // The item currently being edited (null = adding new)
  const [editingItem, setEditingItem] = useState(null);

  // Form field values
  const [form, setForm] = useState(emptyForm);

  // The image file picked by the user (before upload)
  const [imageFile, setImageFile] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load menu items and categories when page opens
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data: menuData } = await supabase
      .from("menu_items")
      .select("*, categories(name)")
      .order("created_at", { ascending: false });

    const { data: catData } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    setItems(menuData ?? []);
    setCategories(catData ?? []);
    setLoading(false);
  }

  // Open the form to add a new item
  function openAddForm() {
    setEditingItem(null);
    setForm(emptyForm);
    setImageFile(null);
    setError("");
    setShowForm(true);
  }

  // Open the form pre-filled with an existing item's data
  function openEditForm(item) {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category_id: item.category_id,
      image_url: item.image_url,
    });
    setImageFile(null);
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingItem(null);
    setImageFile(null);
    setError("");
  }

  // Update form state when any input changes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Upload the selected image to Supabase Storage and return the public URL
  async function uploadImage(file) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("menu-images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("menu-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      let imageUrl = form.image_url;

      // If a new image file was picked, upload it first
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category_id: form.category_id || null,
        image_url: imageUrl,
      };

      if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from("menu_items")
          .update(payload)
          .eq("id", editingItem.id);

        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase.from("menu_items").insert(payload);
        if (error) throw error;
      }

      closeForm();
      fetchData();
    } catch (err) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this item?")) return;

    await supabase.from("menu_items").delete().eq("id", id);
    fetchData();
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Menu</h1>
          <p className="text-text/50 text-sm mt-0.5">{items.length} items</p>
        </div>
        <button
          onClick={openAddForm}
          className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
        >
          + Add Item
        </button>
      </div>

      {/* Items table */}
      {loading ? (
        <p className="text-text/40 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-text/40 text-sm">No menu items yet.</p>
      ) : (
        <div className="bg-card border border-text/10 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-text/10 text-left">
                <th className="px-5 py-3 font-semibold text-text/50 text-xs uppercase tracking-widest">
                  Item
                </th>
                <th className="px-5 py-3 font-semibold text-text/50 text-xs uppercase tracking-widest hidden md:table-cell">
                  Category
                </th>
                <th className="px-5 py-3 font-semibold text-text/50 text-xs uppercase tracking-widest">
                  Price
                </th>
                <th className="px-5 py-3 font-semibold text-text/50 text-xs uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-text/5 last:border-0 hover:bg-text/2"
                >
                  {/* Name + image */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {item.image_url ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-text/5 shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-primary">{item.name}</p>
                        <p className="text-text/40 text-xs line-clamp-1 max-w-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-text/60 hidden md:table-cell">
                    {item.categories?.name ?? "—"}
                  </td>
                  <td className="px-5 py-3 font-medium text-accent">
                    {item.price} EGP
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => openEditForm(item)}
                      className="text-xs font-semibold text-text/50 hover:text-primary transition-colors mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-text/10 flex items-center justify-between">
              <h2 className="font-bold text-primary text-lg">
                {editingItem ? "Edit Item" : "Add Item"}
              </h2>
              <button
                onClick={closeForm}
                className="text-text/40 hover:text-primary text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              {/* Name */}
              <Field label="Name">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Spanish Latte"
                  className={inputClass}
                />
              </Field>

              {/* Description */}
              <Field label="Description">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="A short description…"
                  className={inputClass}
                />
              </Field>

              {/* Price */}
              <Field label="Price (EGP)">
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                  placeholder="110"
                  className={inputClass}
                />
              </Field>

              {/* Category */}
              <Field label="Category">
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">No category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Image */}
              <Field label="Image">
                {/* Show current image if editing */}
                {form.image_url && !imageFile && (
                  <div className="relative w-full h-36 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={form.image_url}
                      alt="Current image"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="text-sm text-text/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                />
                {imageFile && (
                  <p className="text-xs text-text/40 mt-1">{imageFile.name}</p>
                )}
              </Field>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 border border-text/15 text-text/60 text-sm font-semibold py-2.5 rounded-lg hover:bg-text/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Small wrapper to keep form fields DRY
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-text/50 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "border border-text/15 rounded-lg px-3 py-2.5 text-sm text-text bg-background focus:outline-none focus:border-accent w-full";
