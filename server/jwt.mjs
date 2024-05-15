import LoginModel from "./models/loginModel.mjs";
import jwt from "jsonwebtoken";
import Participant from "./models/participantsModel.mjs";

const secretKey = "AbishekAndVisaganTheLegends";

export const login = async (req, res) => {
  try {
    const { _id, password } = req.body;

    // Check if email and password are provided
    if (!_id || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists by _id
    const loginUser = await LoginModel.findOne({ _id: _id });

    if (!loginUser) {
      return res.status(404).json({ error: "Participant not found" });
    }

    // Compare passwords without hashing
    if (loginUser.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign({ email: loginUser._id, password }, secretKey, {
      expiresIn: "3d",
    });

    // Extract required details from the participant object
    const { details, permit, paymentHistory } = await Participant.findOne({
      "details.emailId": _id,
    });

    // Construct the response object with required details
    const response = {
      token,
      formDetails: details,
      paymentDetails: paymentHistory,
      passDetails: permit,
    };

    // Respond with the constructed response object
    res.status(200).json(response);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
