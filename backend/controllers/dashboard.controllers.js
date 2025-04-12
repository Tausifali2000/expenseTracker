import { Income } from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";
import { isValidObjectId, Types } from "mongoose";


export async function fetchDashboard(req, res) {

  try {
    const userId = req.user.id;
    const userObject = new Types.ObjectId(String(userId));

    //Get  Total Income
    const totalIncome = await Income.aggregate([
      
        {$match: {userId: userObject}},
        {$group: {_id:null, total: {$sum: "$amount"}}}
      
  ]);

  console.log("TotalIncome", {totalIncome, userId: isValidObjectId(userId)});

  //Get total Expense
  const totalExpense =  await Expense.aggregate([
    {$match: {userId: userObject}},
    {$group: { _id: null, total: {$sum:"$amount"}}},
  ]);

  //Fetch Last  60 Days Income Transactions
  const incomeTransaction60 = await Income.find({
    userId,
    date: {$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)}
  }).sort({date: -1});

  //Fetch Last 60 days Income
  const incomeLast60Days = incomeTransaction60.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  )

  //Fetch Last 30 Days Expense Transactions
  const expenseTransaction30 = await Expense.find({
    userId,
    date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
  }).sort({date: -1});

   //Fetch Last 30 days Expense
   const expenseLast30Days = expenseTransaction30.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  )

  //Fetch last 5 transactions 
  const lastTransactions = [
    ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
      (txt) => ({
        ...txt.toObject(),
        type: "income"
      })
    ),
    ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
      (txt) => ({
        ...txt.toObject(),
        type: "expense"
      })
    ),
  ].sort((a,b) => b.date - a.date); //Sort Latest First

  //Final Response
  res.json({
    totalBalance:
      (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
    totalIncome: totalIncome[0]?.total || 0,
    totalExpense: totalExpense[0]?.total || 0,
    last30daysExpenses: {
      total: expenseLast30Days,
      transactions: expenseTransaction30
    },
    last60DaysIncome: {
      total: incomeLast60Days,
      transactions: incomeTransaction60,
    },
    recentTransactions: lastTransactions
  })


  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}