import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requestId: { type: String, required: true, unique: true, trim: true },
    studentId: { type: String, required: true, trim: true, index: true },
    document: { type: String, required: true },
    documentType: { type: String, required: true },
    semester: { type: String, required: true },
    purpose: { type: String, required: true, trim: true },
    notes: { type: String, default: "", trim: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Approved", "Rejected"] },
    date: { type: String, required: true },
    submittedOn: { type: String, required: true },
    expectedDelivery: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
