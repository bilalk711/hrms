import { db } from ".";
import { collection, query, where, getDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

// Create
export const createPayroll = async function (payroll) {
    const id = uuidv4();
  
    // Get employee data from "employees" collection
    const employeeRef = doc(db, "employees", payroll.employee_id);
    const employeeSnap = await getDoc(employeeRef);
    const employeeData = employeeSnap.data();
  
    // Calculate leaves deduction based on leaves in "leaves" collection
    const leavesQuery = query(collection(db, "leaves"), where("employee_id", "==", payroll.employee_id));
    const leavesSnapshot = await getDocs(leavesQuery);
    let totalLeavesDeduction = 0;
    leavesSnapshot.forEach((leaveDoc) => {
      const leaveData = leaveDoc.data();
      const leaveDaysCount = Math.ceil((new Date(leaveData.end_date) - new Date(leaveData.start_date)) / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include start and end date
      totalLeavesDeduction += employeeData.daily_wage * leaveDaysCount;
    });
  
    // Calculate from and to month based on pay period
    const fromMonth = new Date(payroll.pay_period_start).getUTCMonth() + 1; // Add 1 to match MM format
    const toMonth = new Date(payroll.pay_period_end).getUTCMonth() + 1; // Add 1 to match MM format
    const year = new Date().getFullYear();
    if(fromMonth === toMonth) throw Error("Error: Payroll should have a period of atleast one month!");

    const payrollQuery = query(
          collection(db, "payrolls"), 
          where("employee_id", "==", payroll.employee_id), 
          where("from_month", "==", fromMonth), 
          where("to_month", "==", toMonth), 
          where("year", "==", year)
        );
    const payrollSnap = await getDocs(payrollQuery);
    if(!payrollSnap.empty) throw Error("Error: Payroll for this date range already created!");

    // Add new payroll document with from_month and to_month
    await setDoc(doc(db, "payrolls", id), {
      payroll_id: id,
      employee_id: payroll.employee_id,
      employee_name: employeeData.first_name + " " + employeeData.last_name,
      monthly_salary: employeeData.monthly_salary,
      leaves_deduction: totalLeavesDeduction,
      bonuses: payroll.bonuses,
      from_month: fromMonth,
      to_month: toMonth,
      year: year
    });
  }


// Read
export const getPayroll = async function (id) {
  const docRef = doc(db, "payrolls", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const getPayrollsByEmployeeId = async function (employeeId=null) {
  let q;
  if(!employeeId) q = query(collection(db, "payrolls"));
  else q = query(collection(db, "payrolls"), where("employee_id", "==", employeeId));
  const querySnapshot = await getDocs(q);
  const payrolls = [];
  querySnapshot.forEach((doc) => {
    payrolls.push(doc.data());
  });
  return payrolls;
}

// Delete
export const deletePayroll = async function (id) {
  await deleteDoc(doc(db, "payrolls", id));
}
