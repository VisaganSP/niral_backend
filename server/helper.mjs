import SequenceModel from './models/sequenceModel.mjs'

// Function to generate a token
export const generateUserId = async (type) => {
  try {
    let sequence = await SequenceModel.findOne()

    // If sequence doesn't exist, create one
    if (!sequence) {
      sequence = await SequenceModel.create({ otherCollege: 'niral24ot001', workingProfessional: 'niral24wp001' })
    }

    // Get the current token and increment it
    let token
    if (type === 'other') {
      const currentToken = sequence.otherCollege
      const numberPart = parseInt(currentToken.substring(9)) // Extract the numeric part
      const newNumberPart = numberPart + 1
      token = `niral24ot${newNumberPart.toString().padStart(3, '0')}`
      sequence.otherCollege = token
    } else if (type === 'professional') {
      const currentToken = sequence.workingProfessional
      const numberPart = parseInt(currentToken.substring(9)) // Extract the numeric part
      const newNumberPart = numberPart + 1
      token = `niral24wp${newNumberPart.toString().padStart(3, '0')}`
      sequence.workingProfessional = token
    }

    // Update the sequence with the new token
    await sequence.save()

    return token
  } catch (error) {
    console.error('Error generating token:', error)
    throw error
  }
}
