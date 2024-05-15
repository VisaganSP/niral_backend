import ParticipantsModel from "../models/participantsModel.mjs";
import LoginModel from "../models/loginModel.mjs";
import { generateToken } from "../helper.mjs";

// Create new participant
export const createParticipant = async (req, res) => {
  await loginModelFunc(req, res);
};

const loginModelFunc = async (req, res) => {
  try {
    const { emailId, password } = req.body.details;
    const loginDetails = await LoginModel.create({
      _id: emailId,
      password: password,
    });

    // Getting the token from the helper method according to the participant is where from!...
    // Helper Method Name - generateToken(type);
    const participantFrom = req.body.organization;

    let token;
    if (participantFrom == "other") {
      token = await generateToken("other");
    } else if (participantFrom == "professional") {
      token = await generateToken("professional");
    } else {
      const rollNumber = req.body.details.rollNo;
      token = rollNumber;
    }

    // Update _id to use the generated token
    req.body._id = token;

    // Creating new participant in Participant collection
    try {
      const participant = await ParticipantsModel.create(req.body);
      res.status(201).json(participant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all participants
export const getAllParticipants = async (req, res) => {
  try {
    const participants = await ParticipantsModel.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    return res.status(500).json({ error: "Internal server error" });
  }
};
