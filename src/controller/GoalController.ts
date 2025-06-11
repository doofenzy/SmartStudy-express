import { Goal } from '../model/Goal';

const createGoal = async (req: any, res: any) => {
  const {
    subject,
    weeklyTargetHours,
    completedHours,
    weekStartDate,
    weekEndDate,
  } = req.body;
  const userId = req.user.id;
  const goal = await Goal.create({
    subject,
    weeklyTargetHours,
    completedHours,
    weekStartDate,
    weekEndDate,
    userId,
  });
  res.status(201).json({
    message: 'Goal created successfully',
    goal,
  });
  try {
  } catch (error) {}
};

const updateGoal = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    subject,
    weeklyTargetHours,
    completedHours,
    weekStartDate,
    weekEndDate,
  } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        message: 'Goal ID is required',
      });
    }

    const updatedFields: any = {};
    if (subject !== undefined) updatedFields.subject = subject;
    if (weeklyTargetHours !== undefined)
      updatedFields.weeklyTargetHours = weeklyTargetHours;
    if (completedHours !== undefined)
      updatedFields.completedHours = completedHours;
    if (weekStartDate !== undefined)
      updatedFields.weekStartDate = weekStartDate;
    if (weekEndDate !== undefined) updatedFields.weekEndDate = weekEndDate;

    const goal = await Goal.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json({
      message: 'Goal updated successfully',
      goal,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error updating goal',
      error: error.message,
    });
  }
};
const getGoal = async (req: any, res: any) => {
  const userId = req.user.id;

  try {
    if (!userId) {
      return res.status(400).json({
        message: 'User ID is required',
      });
    }

    const goals = await Goal.find({ userId: userId });
    if (goals.length === 0) {
      return res.status(404).json({
        message: 'No goals found for this user',
      });
    }

    res.status(200).json({
      message: 'Goals fetched successfully',
      goals,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching goals',
      error: error.message,
    });
  }
};
const deleteGoal = async (req: any, res: any) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    if (!id) {
      return res.status(400).json({
        message: 'Goal ID is required',
      });
    }

    const goal = await Goal.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    if (!goal) {
      return res.status(404).json({
        message: 'Goal not found',
      });
    }

    res.status(200).json({
      message: 'Goal deleted successfully',
      goal,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error deleting goal',
      error: error.message,
    });
  }
};

export { createGoal, updateGoal, getGoal, deleteGoal };
