import { Session } from '../model/Session';
import { Goal } from '../model/Goal';

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

    const goal = await Goal.findOne({
      userId: userId,
      subject: subject,
      weekStartDate: { $lte: startDate },
      weekEndDate: { $gte: startDate },
    });

    if (goal) {
      goal.completedHours = Number(goal.completedHours) + duration / 60;
      await goal.save();
    }

    res.status(201).json({ message: 'Session created successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Error creating session', error });
  }
};

const deleteSession = async (req: any, res: any) => {
  const sessionId = req.params.id;
  const userId = req.user.id;

  try {
    const session = await Session.findOneAndDelete({
      _id: sessionId,
      userId: userId,
    });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting session', error });
  }
};

const getSession = async (req: any, res: any) => {
  const userId = req.user.id;

  try {
    const sessions = await Session.find({ userId: userId });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions', error });
  }
};

const updateSession = async (req: any, res: any) => {
  const { subject, topic, startTime, endTime, notes } = req.body;
  const userId = req.user.id;
  const sessionId = req.query.id;

  try {
    const oldSession = await Session.findOne({
      _id: sessionId,
      userId: userId,
    });

    if (!oldSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // old values
    const oldDuration = oldSession.duration;
    const oldStartTime = oldSession.startTime;
    const oldSubject = oldSession.subject;

    // new values
    const newStartDate = new Date(startTime);
    const newEndDate = new Date(endTime);
    const newDuration = Math.round(
      (newEndDate.getTime() - newStartDate.getTime()) / (1000 * 60)
    );

    if (newDuration <= 0) {
      return res.status(400).json({ message: 'Duration myst be above 0' });
    }

    const oldGoal = await Goal.findOne({
      userId: userId,
      subject: oldSubject,
      weekStartDate: { $lte: oldStartTime },
      weekEndDate: { $gte: oldStartTime },
    });

    if (oldGoal) {
      oldGoal.completedHours =
        Number(oldGoal.completedHours) - oldDuration / 60;
      await oldGoal.save();
    }

    const updatedSession = await Session.findOneAndUpdate(sessionId, {
      subject,
      topic,
      startTime: newStartDate,
      endTime: newEndDate,
      notes,
      duration: newDuration,
    });
    res.status(200).json({
      message: 'Session updated successfully',
      updatedSession,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating session', error });
  }
};

export { createSession, deleteSession, getSession, updateSession };
