import pkg from "crypto-js";
const { SHA256 } = pkg;

import ParticipantsModel from "../models/participantsModel.mjs";
import Transaction from "../models/transactionModel.mjs";
import LoginModel from "../models/loginModel.mjs";
import { generateUserId } from "../helper.mjs";
import { createToken, validateToken } from "../jwt.mjs";

// Create new participant
export const createParticipant = async (req, res) => {
  try {
    const { emailId } = req.body.details;
    const participantFrom = req.body.organization;
    let userId;

    if (req.body.organization == "cegian") {
      userId = req.body.specificDetails.rollNo;
      const alreadyExists = await LoginModel.findOne({
        $or: [{ _id: emailId }, { userId: userId }],
      });
      if (alreadyExists) {
        if (alreadyExists._id == emailId) {
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

    if (participantFrom == "other") {
      userId = await generateUserId("other");
    } else if (participantFrom == "professional") {
      userId = await generateUserId("professional");
    }

    const { password } = req.body.details;
    const hashedPass = SHA256(password).toString();
    const loginDetails = await LoginModel.create({
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

    const token = createToken({
      email: participantDocument.details.emailId,
      uid: userId,
      password: hashedPass,
      userType: "participant",
    });
    // Creating new participant in Participant collection
    try {
      const participant = await ParticipantsModel.create(participantDocument);
      res.status(201).json({ token, userDetails: participant });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error (unique constraint violation)
        res.status(400).json({ errorMessage: "UID already exist" });
      } else {
        // Other Mongoose errors
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
    console.error("Error in loginModelFunc:", error);
    res.status(400).json({ message: error.message });
  }
};

export const loginParticipant = async (req, res) => {
  const { email, password } = req.body;
  const hashedPass = SHA256(password).toString();
  const user = await LoginModel.findOne({
    $and: [{ _id: email }, { password: hashedPass }],
  });
  if (user) {
    try {
      const userDetails = await ParticipantsModel.findOne({ _id: user.userId });
      if (userDetails) {
        const token = createToken({
          email: email,
          uid: user.userId,
          password: hashedPass,
          userType: "participant",
        });
        res.status(201).json({ token, userDetails });
      } else {
        res.status(400).json({ errorMessage: "Could not find user" });
      }
    } catch (error) {
      console.error("Error validating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ errorMessage: "Invalid Credentials!" });
  }
};

export const requestPermit = async (req, res) => {
  try {
    const { permitID, transactionId, transactionDate, paymentType, screenShotSent, validity } = req.body;
    // console.log(permitID, transactionId, transactionDate, paymentType, screenShotSent);
console.log(validity);
    // Check for token in headers
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing", errorMessage:'Unauthorized Request' });
    }

    // Validate token
    const decodedToken = validateToken(token);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const { uid } = decodedToken;
    // console.log(decodedToken, transactionId, uid, transactionDate);

    // Find participant by ID
    const participant = await ParticipantsModel.findById(uid);
    // console.log(participant);
    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    // console.log(participant.permit, permitID);


    // console.log(participant..status);
    // Check if permit exists
    if (
      participant.permit &&
      participant.permit[permitID] &&
      participant.permit[permitID].status &&
      (participant.permit[permitID].status === "applied" || participant.permit.p1.status === "pending" || participant.permit.p1.status === "verified")
    ) {
      // Do not allow the user if his permit is rejected or verified.
      // console.log(true);
      return res.status(400).json({ errorMessage: "Permit already exists" });
    }

    // Add permit if it doesn't exist
    participant.permit = participant.permit || {};
    participant.permit[permitID] = {
      status: "applied",
      transactionId: transactionId,
      transactionDate: transactionDate,
      paymentType: paymentType,
      validity :validity
    };

  
    
    // Attempt to create a new transaction
    try {
      await Transaction.create({
        _id: transactionId,
        userId: uid,
        status: "pending",
        transactionDate: transactionDate,
        permitId: permitID,
        paymentType: paymentType,
        screenShotSent: screenShotSent,
        validity: validity
      });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ errorMessage: "Transaction ID already exists" });
      }
      // throw err;
      console.error(err);
    }

    // Ensure paymentHistory is initialized
    // participant.paymentHistory = participant.paymentHistory || [];

    // Add new entry to paymentHistory
    // participant.paymentHistory.push({
    //   transactionId: transactionId,
    //   transactionDate: transactionDate,
    //   status: "pending",
    // });

    participant.paymentHistory = new Map([
      ...participant.paymentHistory,
      [transactionId, {
        transactionDate: transactionDate,
        status: 'pending',
        paymentType: paymentType,
      }],
    ]);
    
    // Save the participant
    await participant.save();
    
    // const participantT = await ParticipantsModel.findById(uid)
    // console.log(participantT.paymentHistory[transactionId], participantT);
    return res.status(200).json({ message: "Permit added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getDetailsByEmail = async (req, res) => {
  try {
    const { emailId } = req.body;

    if (!emailId) {
      return res.status(400).json({ error: "Email ID is required" });
    }
    const participant = await ParticipantsModel.findOne({
      "details.emailId": emailId,
    });
    if (participant) {
      return res.status(200).json(participant);
    } else {
      return res.status(404).json({ error: "Participant not found" });
    }
  } catch (error) {
    console.error("Error fetching participant details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
