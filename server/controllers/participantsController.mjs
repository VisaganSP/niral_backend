import ParticipantsModel from '../models/participantsModel.mjs'

// Create new participant
export const createParticipant = async (req, res) => {
  try {
    const participant = await ParticipantsModel.create(req.body)
    res.status(201).json(participant)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get all participants
export const getAllParticipants = async (req, res) => {
  try {
    const participants = await ParticipantsModel.find()
    res.status(200).json(participants)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getDetailsByEmail = async (req, res) => {
  try {
    const { emailId } = req.body

    if (!emailId) {
      return res.status(400).json({ error: 'Email ID is required' })
    }
    const participant = await ParticipantsModel.findOne({ 'details.emailId': emailId })
    if (participant) {
      return res.status(200).json(participant)
    } else {
      return res.status(404).json({ error: 'Participant not found' })
    }
  } catch (error) {
    console.error('Error fetching participant details:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
