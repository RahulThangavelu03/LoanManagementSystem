import { Response } from "express";


import Loan from "../models/loan";

import {
  AuthRequest
} from "../middleware/authMiddleware";

export const applyLoan = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const {
      fullName,
      pan,
      dob,
      monthlySalary,
      employmentMode,
      loanAmount,
      tenureDays
    } = req.body;

    // BRE VALIDATIONS

    const age =
      new Date().getFullYear() -
      new Date(dob).getFullYear();

    if (age < 23 || age > 50) {

      return res.status(400).json({
        message: "Age must be between 23 and 50"
      });
    }

    if (monthlySalary < 25000) {

      return res.status(400).json({
        message: "Salary must be above 25000"
      });
    }

    const panRegex =
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(pan)) {

      return res.status(400).json({
        message: "Invalid PAN format"
      });
    }

    if (
      employmentMode === "UNEMPLOYED"
    ) {

      return res.status(400).json({
        message: "Unemployed applicants not allowed"
      });
    }

    // SIMPLE INTEREST

    const interest =
      (
        loanAmount *
        12 *
        tenureDays
      ) / (365 * 100);

    const totalRepayment =
      loanAmount + interest;

    const loan =
      await Loan.create({

        borrower: req.user.id,

        fullName,
        pan,
        dob,

        monthlySalary,

        employmentMode,

        loanAmount,

        tenureDays,

        interest,

        totalRepayment
      });

    res.status(201).json({
      message: "Loan Applied Successfully",
      loan
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};



export const sanctionLoan = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { id } = req.params;

    const loan =
      await Loan.findById(id);

    if (!loan) {

      return res.status(404).json({
        message: "Loan not found"
      });
    }

    loan.status = "SANCTIONED";

    await loan.save();

    res.json({
      message: "Loan sanctioned",
      loan
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const rejectLoan = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { id } = req.params;

    const { reason } = req.body;

    const loan =
      await Loan.findById(id);

    if (!loan) {

      return res.status(404).json({
        message: "Loan not found"
      });
    }

    loan.status = "REJECTED";

    loan.rejectionReason = reason;

    await loan.save();

    res.json({
      message: "Loan rejected",
      loan
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};