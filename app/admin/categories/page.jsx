"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Controls whether the form is shown
  const [showForm, setShowForm] = useState(false);

  // The category being edited (null = adding new)
  const [editingCategory, setEditingCategory] = useState(null);

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    setCategories(data ?? []);
    setLoading(false);
  }

  function openAddForm() {
    setEditingCategory(null);
    setName("");
    setError("");
    setShowForm(true);
  }

  function openEditForm(category) {
    setEditingCategory(category);
    setName(category.name);
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingCategory(null);
    setName("");
    setError("");
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from("categories")
          .update({ name })
          .eq("id", editingCategory.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("categories").insert({ name });
        if (error) throw error;
      }

      closeForm();
      fetchCategories();
    } catch (err) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this category? Menu items using it will lose their category."))
      return;

    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Categories</h1>
          <p className="text-text/50 text-sm mt-0.5">
            {categories.length} categories
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
        >
          + Add Category
        </button>
      </div>

      {/* Categories list */}
      {loading ? (
        <p className="text-text/40 text-sm">Loading…</p>
      ) : categories.length === 0 ? (
        <p className="text-text/40 text-sm">No categories yet.</p>
      ) : (
        <div className="bg-card border border-text/10 rounded-2xl overflow-hidden shadow-sm max-w-lg">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`flex items-center justify-between px-5 py-4 ${
                index !== categories.length - 1 ? "border-b border-text/5" : ""
              }`}
            >
              <span className="font-medium text-primary">{cat.name}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => openEditForm(cat)}
                  className="text-xs font-semibold text-text/50 hover:text-primary transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm">
            <div className="p-6 border-b border-text/10 flex items-center justify-between">
              <h2 className="font-bold text-primary text-lg">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>
              <button
                onClick={closeForm}
                className="text-text/40 hover:text-primary text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text/50 uppercase tracking-widest">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Coffee"
                  className="border border-text/15 rounded-lg px-3 py-2.5 text-sm text-text bg-background focus:outline-none focus:border-accent"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3 pt-1">
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
