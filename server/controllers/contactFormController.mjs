import Contact from '../models/contactModel.mjs';
import express from 'express';

const router = express.Router();

const saveQuery = async (req, res) => {
  try {
    const { name, email, message, mobile } = req.body;
    console.log(name, email, message, mobile);

    const newQuery = {
      name,
      email,
      message,
      mobile,
    };

    const contact = new Contact({ query: [newQuery] });

    await contact.save();

    res.status(201).json({ message: 'Query saved successfully' });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const saveCollaborate = async (req, res) => {
  try {
    const { name, email, message, mobile, org } = req.body;
    console.log(name, email, message, mobile, org);

    const newCollaborate = {
      name,
      email,
      message,
      mobile,
      org,
    };

    const contact = new Contact({ collaborate: [newCollaborate] });

    await contact.save();

    res.status(201).json({ message: 'Collaboration saved successfully' });
  } catch (error) {
    console.error('Error saving collaboration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

router.post('/query', saveQuery);
router.post('/collaborate', saveCollaborate);

export default router;
