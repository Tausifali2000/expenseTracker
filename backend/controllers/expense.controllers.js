import xlsx from "xlsx";
import { Expense } from "../models/expense.model.js";



// Add Expense
export async function addExpense(req, res) {

  const userId = req.user.id

  if(!userId) {
    return res.status(404).json({message: "User not found"})
  }

  try {
    const {icon, category, amount, date } = req.body;

    if(!category || !amount || !date) {
      return res.status(400).json({message: "All fields are required"});
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date)
    });

    await newExpense.save();
    
    res.status(200).json(newExpense)

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


//Fetch All Expenses
export async function fetchExpense(req, res) {

  const userId = req.user.id

  try {
    const expense = await Expense.find({userId}).sort({date: -1});
    res.json(expense)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


//Delete Expense Source
export async function deleteExpense(req, res) {


  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({message: "Expense Deleted Sucessfully"})
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function downloadExpense(req, res) {

  const userId = req.user.id

  try {
    const expense = await Expense.find({userId}).sort({date:-1});

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, 'expense_details.xlsx')
    res.download('expense_details.xlsx');
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

