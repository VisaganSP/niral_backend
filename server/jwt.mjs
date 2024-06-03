import jwt from 'jsonwebtoken'
import LoginModel from './models/loginModel.mjs'
import Participant from './models/participantsModel.mjs'

const secretKey = 'AbishekAndVisaganTheLegends'

export const partcipantLogin = async (req, res) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token missing' })
    }

    const decodedToken = validateToken(token)

    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }

    const { email, password } = decodedToken

    const loginUser = await LoginModel.findOne({ _id: email })

    if (!loginUser) {
      return res.status(404).json({ error: 'Participant not found' })
    }

    if (loginUser.password !== password) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const userDetails = await Participant.findOne({ _id: loginUser.userId })
    if (userDetails) {
      const token = createToken({ email: email, uid: loginUser.userId, password: loginUser.password, userType: 'participant' })
      return res.status(201).json({ token, userDetails })
    } else {
      return res.status(404).json({ error: 'User details not found' })
    }
  } catch (error) {
    console.error('Error logging in:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export function createToken(payload, expiresIn = '3d') {
  return jwt.sign(payload, secretKey, { expiresIn })
}

export function validateToken(token) {
  try {
    return jwt.verify(token, secretKey)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}
