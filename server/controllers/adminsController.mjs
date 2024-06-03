// controllers/adminsController.mjs

import Transaction from "../models/transactionModel.mjs";
import Participant from "../models/participantsModel.mjs";
import LoginModel from "../models/loginModel.mjs";
import Admin from "../models/adminsModel.mjs";
import { generateUserId } from "../helper.mjs";

import pkg from "crypto-js";
const { SHA256 } = pkg;

export const AdminLogin = async (req, res) => {
  try {
    const { adminName, adminPassword } = req.body;

    // Find admin by adminName
    const admin = await Admin.findOne({ adminName });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin name or password' });
    }

    // Hash the provided password and compare with stored hash
    const hashedPassword = SHA256(adminPassword).toString();
    if (hashedPassword !== admin.adminPassword) {
      return res.status(401).json({ message: 'Invalid admin name or password' });
    }

    // Retrieve all participants if login is successful
    const participants = await Participant.find();

    res.status(200).json({ message: 'Login successful', participants });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all participants
export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (error) {
    console.error("Error fetching all participants:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getParticipantByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const participant = await Participant.findOne({ _id: userId }).exec();

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json(participant);
  } catch (error) {
    console.error("Error retrieving participant:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Function to get all participants by email
export const getParticipantsByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const participant = await Participant.findOne({
      "details.emailId": email,
    }).exec();

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json(participant);
  } catch (error) {
    console.error("Error retrieving participant:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Function to add participant
export const addParticipant = async (req, res) => {
  try {
    const { emailId } = req.body.details;
    const participantFrom = req.body.organization;
    let userId;

    if (req.body.organization === "cegian") {
      userId = req.body.specificDetails.rollNo;
      const alreadyExists = await LoginModel.findOne({
        $or: [{ _id: emailId }, { userId: userId }],
      });
      if (alreadyExists) {
        if (alreadyExists._id === emailId) {
          return res
            .status(400)
            .json({ errorMessage: "Email already exists!" });
        } else {
          return res
            .status(400)
            .json({ errorMessage: "RollNo already registered!" });
        }
      }
    } else {
      const alreadyExists = await LoginModel.findById(emailId);

      if (alreadyExists) {
        return res.status(400).json({ errorMessage: "Email already exists!" });
      }
    }

    if (participantFrom === "other") {
      userId = await generateUserId("other");
    } else if (participantFrom === "professional") {
      userId = await generateUserId("professional");
    }

    const { password } = req.body.details;
    const hashedPass = SHA256(password).toString();
    await LoginModel.create({
      _id: emailId,
      password: hashedPass,
      userId: userId,
    });

    const participantDocument = {
      _id: userId,
      details: {
        emailId: req.body.details.emailId,
        firstName: req.body.details.firstName,
        lastName: req.body.details.lastName,
        mobileNo: req.body.details.mobileNo,
        dateOfBirth: req.body.details.dateOfBirth,
      },
      organization: req.body.organization,
    };

    const specificDetails = req.body.specificDetails;
    participantDocument.details = {
      ...participantDocument.details,
      ...specificDetails,
    };

    // Creating new participant in Participant collection
    try {
      await Participant.create(participantDocument);
      res.status(201).json({ message: "Participant created successfully" });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error (unique constraint violation)
        res.status(400).json({ errorMessage: "UID already exists" });
      } else {
        // Other Mongoose errors
        console.error("Error creating participant:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
    console.error("Error in createParticipant function:", error);
    res.status(400).json({ message: error.message });
  }
};

// Function to manage participants
export const manageParticipants = async (req, res) => {
  try {
    const userId = req.body._id;
    // console.log(userId);
    const updateData = req.body.details;

    // Find the participant by userId and update their details
    const updatedParticipant = await Participant.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json({ message: "Participant updated successfully" });
  } catch (error) {
    console.error("Error updating participant:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to remove participant
export const removeParticipant = (req, res) => {
  // Logic to remove participant
  // need to change DELETED-TIMESTAMP in Participant and Login model in db
};

// Function to get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error retrieving admins:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get admin by id
export const getAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error retrieving admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to add admin
export const addAdmin = async (req, res) => {
  try {
    const adminData = req.body;

    // Hash the adminPassword before saving
    adminData.adminPassword = SHA256(adminData.adminPassword).toString();

    const newAdmin = new Admin(adminData);
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error adding admin:', error);
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: 'Admin with given ID already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Function to manage admins
export const manageAdmins = async (req, res) => {
  const { adminId } = req.params;
  const updateData = req.body;

  console.log(adminId);
  console.log(updateData);

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin updated successfully'});
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to remove admin
export const removeAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin removed successfully' });
  } catch (error) {
    console.error('Error removing admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAll = async (req, res) => {
  // Logic to get all payments
  try {
    // Find all transactions
    const transactions = await Transaction.find();
    console.log("trans: ", transactions);
    // Send the transactions as a response
    res.status(200).json({ transactions });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
};

// Function to manage payments
export const getPending = async (req, res) => {
  try {
    // Find all transactions with status set to false
    const transactions = await Transaction.find({ status: "pending" });
    console.log("trans: ", transactions);
    // Send the transactions as a response
    res.status(200).json({ transactions });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
};

export const setStatus = async (req, res) => {
  try {
    const {pendingList, verifiedList, rejectedList, deletedlist} = req.body;
pendingListTransactionId = pendingList.filter((transaction)=> transaction.status === "pending")
verifiedListTransactionId = verifiedList.filter((transaction)=> transaction.status === "verified")
rejectedListTransactionId = rejectedList.filter((transaction)=> transaction.status === "rejected")
deletedlistTransactionId = deletedlist.filter((transaction)=> transaction.status === "deleted")

    await Transaction.updateMany({ _id: { $in: pendingListTransactionId } }, { status: "pending" });
    await Transaction.updateMany({ _id: { $in: verifiedListTransactionId } }, { status: "verified" });
    await Transaction.updateMany({ _id: { $in: rejectedListTransactionId } }, { status: "rejected" });

   
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
};

// Function to manage events
export const manageEvents = (req, res) => {
  // Logic to manage events
};
