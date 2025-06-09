import { Session } from '../model/Session';

const createSession = async (req: any, res: any) => {
  const { subject, topic, startTime, endTime, notes } = req.body;
  const userId = req.user.id;

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const duration = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60)
  );

  if (!subject || !topic || !startTime || !endTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (duration <= 0 || startDate >= endDate) {
    return res.status(400).json({ message: 'Invalid start/end time' });
  }

  try {
    const session = await Session.create({
      userId,
      subject,
      topic,
      startTime: startDate,
      endTime: endDate,
      notes,
      duration,
    });
    res.status(201).json({ message: 'Session created successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Error creating session', error });
  }
};

const deleteSession = async (req: any, res: any) => {
  const sessionId = req.params.id;
  const userId = req.user;

  try {
    const session = await Session.findOneAndDelete({
      id: sessionId,
      userId: userId,
    });
    res.status(200).json({ message: 'Session deleted successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting session', error });
  }
};

const getSession = async (req: any, res: any) => {
  const userId = req.user;

  try {
    const sessions = await Session.find({ userId: userId.userId });
    res
      .status(200)
      .json({ message: 'Sessions fetched successfully', sessions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions', error });
  }
};

export { createSession, deleteSession, getSession };
