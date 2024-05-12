// src/controllers/participantsController.mjs

import Participant from "../models/participantModel.mjs";

export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createParticipant = async (req, res) => {
  const participant = new Participant(req.body);
  try {
    const newParticipant = await participant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }
    res.json(participant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateParticipantById = async (req, res) => {
  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }
    res.json(updatedParticipant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteParticipantById = async (req, res) => {
  try {
    const deletedParticipant = await Participant.findByIdAndDelete(
      req.params.id
    );
    if (!deletedParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }
    res.json({ message: "Participant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
