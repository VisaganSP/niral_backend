// controllers/adminsController.mjs

import Transaction from '../models/transactionModel.mjs'


export const AdminLogin = (req, res) => {
  // Logic to get all participants
}

// Function to get all participants
export const getAllParticipants = (req, res) => {
  // Logic to get all participants
}

export const getParticipantsByUserId = (req, res) => {
  const userId = req.params.userId
  // Logic to get all participants by userId
}

// Function to get all participants by email
export const getParticipantsByEmail = (req, res) => {
  const email = req.params.email
  // Logic to get all participants by email
}
// Function to add participant
export const addParticipant = (req, res) => {
  // Logic to add participant
}

// Function to manage participants
export const manageParticipants = (req, res) => {
  // Logic to manage participants
}

// Function to remove participant
export const removeParticipant = (req, res) => {
  // Logic to remove participant
}

// Function to get all admins
export const getAllAdmins = (req, res) => {
  // Logic to get all admins
}

// Function to add admin
export const addAdmin = (req, res) => {
  // Logic to add admin
}

// Function to manage admins
export const manageAdmins = (req, res) => {
  // Logic to manage admins
}

// Function to remove admin
export const removeAdmin = (req, res) => {
  // Logic to remove admin
}

export const getAll = async (req, res) => {
  // Logic to get all payments
  try {
    // Find all transactions
    const transactions = await Transaction.find()
    console.log('trans: ', transactions)
    // Send the transactions as a response
    res.status(200).json({ transactions })
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message })
  }
}

// Function to manage payments
export const getPending = async (req, res) => {
  try {
    // Find all transactions with status set to false
    const transactions = await Transaction.find({ status: 'pending' })
    console.log('trans: ', transactions)
    // Send the transactions as a response
    res.status(200).json({ transactions })
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message })
  }
}

export const setStatus = async (req, res) => {
  try {
    const transactionStatusList = req.body || [];

    // Create an array of promises for updating each document
    const updatePromises = transactionStatusList.map(async element => {
      const docs = await Transaction.findOneAndUpdate(
        { userId: element.userId },
        { status: element.newStatus },
        { new: true }
      );
      console.log(`userID: ${docs.userId} status: ${docs.status}`);
      // console.log( element.userId, element. newStatus);
    });

    // Wait for all promises to resolve
    await Promise.all(updatePromises);

    // Send the status as a response
    res.status(200).json({ message: "Status Update Successful" });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
};

// Function to manage events
export const manageEvents = (req, res) => {
  // Logic to manage events
}
