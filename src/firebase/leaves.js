import { db } from ".";
import { collection, query, where, getDoc, getDocs, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export const getLeave = async function (id) {
  const docRef = doc(db, "leaves", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const getLeavesByEmployeeId = async function (employeeId=null) {
    let q;
    if(!employeeId) q = query(collection(db, "leaves"));
    else q = query(collection(db, "leaves"), where("employee_id", "==", employeeId));
    const querySnapshot = await getDocs(q);
    const leaves = [];
    querySnapshot.forEach((doc) => {
      leaves.push(doc.data());
    });
    return leaves;
  }
  

export const addLeave = async function (leave) {
  const id = uuidv4();

  await setDoc(doc(db, "leaves", id), {
    leave_id: id,
    employee_id: leave.employee_id,
    start_date: leave.start_date,
    end_date: leave.end_date,
    reason: leave.reason,
    status: "Pending" // set default status to "Pending"
  });
}

export const updateLeaveStatus = async function (id, status) {
    await updateDoc(doc(db, "leaves", id), {
        status: status
    });
}
  

export const deleteLeave = async function (id) {
  await deleteDoc(doc(db, "leaves", id));
}
