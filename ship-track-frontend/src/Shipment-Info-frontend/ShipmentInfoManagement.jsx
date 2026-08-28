import { useState, useMemo } from "react";
import {
  Package,
  Search,
  Plus,
  X,
  MapPin,
  User,
  Users,
  ChevronRight,
  Trash2,
  Pencil,
  Truck,
} from "lucide-react";


const STATUSES = [
  "Created",
  "Picked Up",
  "In Transit",
  "Out for Delivery",
  "Delivered",
  "Failed Delivery",
];

const STATUS_STYLE = {
  Created: { ink: "#5B6472", bg: "#EEF1EF", dot: "#5B6472" },
  "Picked Up": { ink: "#0F3D2E", bg: "#DFF3E7", dot: "#16A34A" },
  "In Transit": { ink: "#0F3D2E", bg: "#DCF2E3", dot: "#16A34A" },
  "Out for Delivery": { ink: "#8A5A00", bg: "#FBEBCF", dot: "#F2A93B" },
  Delivered: { ink: "#0F3D2E", bg: "#CFEDDB", dot: "#0F9D58" },
  "Failed Delivery": { ink: "#8C2A12", bg: "#FBE1D7", dot: "#C1440E" },
};

function genTrackingNumber() {
  const rand = Math.floor(1e9 + Math.random() * 8.9e9);
  return `STP-${rand}`;
}

const SEED = [
  {
    id: "1",
    trackingNumber: "STP-4021557831",
    status: "In Transit",
    sender: { name: "Aarav Mehta", phone: "+91 98200 11223", company: "Meridian Textiles" },
    receiver: { name: "Priya Nair", phone: "+91 90040 55667" },
    package: { description: "Cotton fabric rolls", weightKg: "18.4", dimensions: "60x40x35 cm" },
    address: { line1: "Flat 302, Willow Residency", city: "Pune", state: "MH", zip: "411045", country: "India" },
  },
  {
    id: "2",
    trackingNumber: "STP-7710239944",
    status: "Out for Delivery",
    sender: { name: "Meridian Textiles Pvt Ltd", phone: "+91 22 4009 1200", company: "Meridian Textiles" },
    receiver: { name: "Rohan Iyer", phone: "+91 98765 43210" },
    package: { description: "Sample kit — 3 boxes", weightKg: "4.1", dimensions: "30x30x20 cm" },
    address: { line1: "12 Lake Terrace", city: "Bengaluru", state: "KA", zip: "560034", country: "India" },
  },
  {
    id: "3",
    trackingNumber: "STP-1183820071",
    status: "Delivered",
    sender: { name: "Kavya Studio", phone: "+91 90123 44556", company: "Kavya Studio" },
    receiver: { name: "Devika Rao", phone: "+91 99887 66554" },
    package: { description: "Framed prints (fragile)", weightKg: "2.6", dimensions: "45x35x8 cm" },
    address: { line1: "88 Palm Court, Sector 12", city: "Gurugram", state: "HR", zip: "122001", country: "India" },
  },
];

const emptyDraft = () => ({
  id: null,
  trackingNumber: genTrackingNumber(),
  status: "Created",
  sender: { name: "", phone: "", company: "" },
  receiver: { name: "", phone: "" },
  package: { description: "", weightKg: "", dimensions: "" },
  address: { line1: "", city: "", state: "", zip: "", country: "" },
});



function StatusStamp({ status, size = "sm" }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.Created;
  const pad = size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${pad}`}
      style={{ color: s.ink, backgroundColor: s.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {status}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-medium uppercase tracking-wide text-[#7B8580] mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full bg-white border border-[#DEE3DF] rounded-lg px-3 py-2 text-sm text-[#0B1F17] placeholder-[#A2ACA6] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/30 focus:border-[#16A34A] transition-colors";



export default function ShipmentInfoManagement() {
  const [shipments, setShipments] = useState(SEED);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(SEED[0].id);
  const [draft, setDraft] = useState(null); // non-null while creating/editing
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shipments.filter((s) => {
      const matchesStatus = statusFilter === "All" || s.status === statusFilter;
      const matchesQuery =!q || s.trackingNumber.toLowerCase().includes(q) || s.sender.name.toLowerCase().includes(q) ||s.receiver.name.toLowerCase().includes(q) ||s.address.city.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [shipments, query, statusFilter]);

  const selected = shipments.find((s) => s.id === selectedId) ?? null;

  function startCreate() {
    setDraft(emptyDraft());
  }

  function startEdit(shipment) {
    setDraft(JSON.parse(JSON.stringify(shipment)));
  }

  function cancelDraft() {
    setDraft(null);
  }

  function saveDraft() {
    if (!draft.trackingNumber.trim() || !draft.sender.name.trim() || !draft.receiver.name.trim()) return;
    if (draft.id) {
      setShipments((prev) => prev.map((s) => (s.id === draft.id ? draft : s)));
      setSelectedId(draft.id);
    } else {
      const withId = { ...draft, id: crypto.randomUUID?.() ?? String(Date.now()) };
      setShipments((prev) => [withId, ...prev]);
      setSelectedId(withId.id);
    }
    setDraft(null);
  }

  function removeShipment(id) {
    setShipments((prev) => prev.filter((s) => s.id !== id));
    setConfirmDeleteId(null);
    if (selectedId === id) setSelectedId(null);
  }

  function setDraftField(section, key, value) {
    setDraft((prev) =>
      section
        ? { ...prev, [section]: { ...prev[section], [key]: value } }
        : { ...prev, [key]: value }
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F4F7F5] text-[#0B1F17]" style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}>
      {/* Header — matches the ShipTrack Pro marketing nav */}
      <header className="bg-white border-b border-[#E3E8E5] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#0F3D2E] flex items-center justify-center shadow-sm shrink-0">
              <Truck size={22} strokeWidth={2.25} className="text-white" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#16A34A] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              </span>
            </div>
            <div className="leading-none">
              <span className="text-[18px] font-extrabold tracking-tight text-[#16A34A]">
                Shipment Information Management
              </span>
              <p className="text-[11px] text-[#7B8580] mt-1">ShipTrack Pro · Manifest Console</p>
            </div>
          </div>
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#129046] text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Shipment
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">
        {/* List column */}
        <section className="bg-white border border-[#E3E8E5] rounded-2xl overflow-hidden flex flex-col shadow-sm">
          <div className="p-3.5 border-b border-[#E3E8E5] space-y-2.5 bg-white">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8FA098]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tracking #, name, city…"
                className="w-full bg-[#F4F7F5] border border-[#E3E8E5] rounded-lg pl-9 pr-3 py-2 text-sm placeholder-[#8FA098] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/30 focus:border-[#16A34A]"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["All", ...STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-colors ${
                    statusFilter === s
                      ? "bg-[#0F3D2E] text-white border-[#0F3D2E]"
                      : "bg-white text-[#5B6472] border-[#E3E8E5] hover:border-[#16A34A]/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <ul className="overflow-y-auto max-h-[70vh] divide-y divide-[#F0F3F1]">
            {filtered.length === 0 && (
              <li className="p-6 text-center text-sm text-[#8FA098]">
                No shipments match this search or filter.
              </li>
            )}
            {filtered.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setSelectedId(s.id)}
                  className={`w-full text-left px-4 py-3.5 flex items-center gap-3 hover:bg-[#F4F7F5] transition-colors ${
                    selectedId === s.id ? "bg-[#EDF8F1] border-l-2 border-[#16A34A]" : "border-l-2 border-transparent"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[13px] font-semibold text-[#0B1F17] truncate">
                        {s.trackingNumber}
                      </span>
                      <ChevronRight size={14} className="text-[#B7C0BA] shrink-0" />
                    </div>
                    <p className="text-[12.5px] text-[#5B6472] truncate mt-0.5">
                      {s.sender.name} → {s.receiver.name}
                    </p>
                    <div className="mt-1.5">
                      <StatusStamp status={s.status} />
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Detail / form column */}
        <section className="bg-white border border-[#E3E8E5] rounded-2xl p-5 shadow-sm">
          {draft ? (
            <ShipmentForm
              draft={draft}
              setDraftField={setDraftField}
              onCancel={cancelDraft}
              onSave={saveDraft}
            />
          ) : selected ? (
            <ShipmentDetail
              shipment={selected}
              onEdit={() => startEdit(selected)}
              onDelete={() => setConfirmDeleteId(selected.id)}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-[#8FA098]">
              <Package size={28} className="mb-3" />
              <p className="text-sm">Select a shipment from the manifest, or create a new one.</p>
            </div>
          )}
        </section>
      </main>

      {/* Delete confirmation */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-20">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full border border-[#E3E8E5] shadow-lg">
            <h3 className="font-bold text-[15px] mb-1.5 text-[#0B1F17]">Delete shipment record?</h3>
            <p className="text-sm text-[#5B6472] mb-4">
              This removes the shipment and its details from the manifest. This can't be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="text-sm font-medium px-3.5 py-2 rounded-lg border border-[#E3E8E5] hover:bg-[#F4F7F5]"
              >
                Cancel
              </button>
              <button
                onClick={() => removeShipment(confirmDeleteId)}
                className="text-sm font-medium px-3.5 py-2 rounded-lg bg-[#C1440E] text-white hover:bg-[#a83a0c]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Detail view 

function ShipmentDetail({ shipment, onEdit, onDelete }) {
  const s = shipment;
  return (
    <div>
      <div className="flex items-start justify-between border-b border-[#E3E8E5] pb-4 mb-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-[#7B8580] mb-1">
            Tracking Number
          </p>
          <p className="font-mono text-2xl font-bold tracking-tight text-[#0B1F17]">
            {s.trackingNumber}
          </p>
          <div className="mt-2.5">
            <StatusStamp status={s.status} size="md" />
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-lg border border-[#E3E8E5] hover:bg-[#F4F7F5]"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-lg border border-[#F2D2C2] text-[#C1440E] hover:bg-[#FBE1D7]"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <InfoBlock icon={<User size={14} />} title="Sender">
          <p className="font-medium">{s.sender.name || "—"}</p>
          {s.sender.company && <p className="text-[#5B6472]">{s.sender.company}</p>}
          <p className="text-[#5B6472]">{s.sender.phone || "—"}</p>
        </InfoBlock>

        <InfoBlock icon={<Users size={14} />} title="Receiver">
          <p className="font-medium">{s.receiver.name || "—"}</p>
          <p className="text-[#5B6472]">{s.receiver.phone || "—"}</p>
        </InfoBlock>

        <InfoBlock icon={<Package size={14} />} title="Package">
          <p className="font-medium">{s.package.description || "—"}</p>
          <p className="text-[#5B6472]">
            {s.package.weightKg ? `${s.package.weightKg} kg` : "— kg"} · {s.package.dimensions || "—"}
          </p>
        </InfoBlock>

        <InfoBlock icon={<MapPin size={14} />} title="Delivery address">
          <p className="font-medium">{s.address.line1 || "—"}</p>
          <p className="text-[#5B6472]">
            {[s.address.city, s.address.state, s.address.zip].filter(Boolean).join(", ") || "—"}
          </p>
          <p className="text-[#5B6472]">{s.address.country || "—"}</p>
        </InfoBlock>
      </div>
    </div>
  );
}

function InfoBlock({ icon, title, children }) {
  return (
    <div className="border border-[#E3E8E5] rounded-xl p-4 bg-[#FBFDFC]">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-[#7B8580] mb-2">
        <span className="text-[#16A34A]">{icon}</span>
        {title}
      </div>
      <div className="text-sm text-[#0B1F17] leading-relaxed">{children}</div>
    </div>
  );
}

//  Create / edit form 

function ShipmentForm({ draft, setDraftField, onCancel, onSave }) {
  const isNew = !draft.id;
  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#E3E8E5] pb-4 mb-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-[#7B8580] mb-1">
            {isNew ? "New Shipment" : "Editing Shipment"}
          </p>
          <p className="font-mono text-xl font-bold text-[#0B1F17]">{draft.trackingNumber}</p>
        </div>
        <button onClick={onCancel} className="text-[#8FA098] hover:text-[#0B1F17] p-1">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Tracking Number">
            <input
              className={inputCls + " font-mono"}
              value={draft.trackingNumber}
              onChange={(e) => setDraftField(null, "trackingNumber", e.target.value)}
            />
          </Field>
          <Field label="Shipment Status">
            <select
              className={inputCls}
              value={draft.status}
              onChange={(e) => setDraftField(null, "status", e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#0F3D2E] mb-2 flex items-center gap-1.5">
            <User size={13} /> Sender details
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Full name">
              <input
                className={inputCls}
                value={draft.sender.name}
                onChange={(e) => setDraftField("sender", "name", e.target.value)}
              />
            </Field>
            <Field label="Company (optional)">
              <input
                className={inputCls}
                value={draft.sender.company}
                onChange={(e) => setDraftField("sender", "company", e.target.value)}
              />
            </Field>
            <Field label="Phone">
              <input
                className={inputCls}
                value={draft.sender.phone}
                onChange={(e) => setDraftField("sender", "phone", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#0F3D2E] mb-2 flex items-center gap-1.5">
            <Users size={13} /> Receiver details
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Full name">
              <input
                className={inputCls}
                value={draft.receiver.name}
                onChange={(e) => setDraftField("receiver", "name", e.target.value)}
              />
            </Field>
            <Field label="Phone">
              <input
                className={inputCls}
                value={draft.receiver.phone}
                onChange={(e) => setDraftField("receiver", "phone", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#0F3D2E] mb-2 flex items-center gap-1.5">
            <Package size={13} /> Package details
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Description">
              <input
                className={inputCls}
                value={draft.package.description}
                onChange={(e) => setDraftField("package", "description", e.target.value)}
              />
            </Field>
           <Field label="Weight (kg)">
              <input
                type="number"
                min="0"
                step="0.1"
                className={inputCls}
                value={draft.package.weightKg}
                onChange={(e) => setDraftField("package", "weightKg", e.target.value)}
              />
            </Field>
            <Field label="Dimensions">
              <input
                placeholder="LxWxH cm"
                className={inputCls}
                value={draft.package.dimensions}
                onChange={(e) => setDraftField("package", "dimensions", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#0F3D2E] mb-2 flex items-center gap-1.5">
            <MapPin size={13} /> Delivery address
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Address line">
              <input
                className={inputCls}
                value={draft.address.line1}
                onChange={(e) => setDraftField("address", "line1", e.target.value)}
              />
            </Field>
            <Field label="City">
              <input
                className={inputCls}
                value={draft.address.city}
                onChange={(e) => setDraftField("address", "city", e.target.value)}
              />
            </Field>
            <Field label="State">
              <input
                className={inputCls}
                value={draft.address.state}
                onChange={(e) => setDraftField("address", "state", e.target.value)}
              />
            </Field>
            <Field label="ZIP / Postal code">
              <input
                className={inputCls}
                value={draft.address.zip}
                onChange={(e) => setDraftField("address", "zip", e.target.value)}
              />
            </Field>
            <Field label="Country">
              <input
                className={inputCls}
                value={draft.address.country}
                onChange={(e) => setDraftField("address", "country", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#E3E8E5]">
          <button
            onClick={onCancel}
            className="text-sm font-medium px-4 py-2 rounded-lg border border-[#E3E8E5] hover:bg-[#F4F7F5]"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-[#16A34A] hover:bg-[#129046] text-white shadow-sm"
          >
            Save Shipment
          </button>
        </div>
      </div>
    </div>
  );
}