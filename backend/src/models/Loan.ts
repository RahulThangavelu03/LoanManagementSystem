import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(

  {
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fullName: {
      type: String,
      required: true
    },

    pan: {
      type: String,
      required: true
    },

    dob: {
      type: String,
      required: true
    },

    monthlySalary: {
      type: Number,
      required: true
    },

    employmentMode: {
      type: String,

      enum: [
        "SALARIED",
        "SELF_EMPLOYED",
        "UNEMPLOYED"
      ],

      required: true
    },

    loanAmount: {
      type: Number,
      required: true
    },

    tenureDays: {
      type: Number,
      required: true
    },

    interest: {
      type: Number,
      required: true
    },

    totalRepayment: {
      type: Number,
      required: true
    },

    status: {
      type: String,

      enum: [
        "APPLIED",
        "SANCTIONED",
        "REJECTED",
        "DISBURSED",
        "CLOSED"
      ],

      default: "APPLIED"
    },
    rejectionReason: {
  type: String
}
  },

  

  {
    timestamps: true
  }
);

export default mongoose.model(
  "Loan",
  loanSchema
);