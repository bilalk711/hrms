import { db, auth } from ".";
import { collection, query, getDocs, setDoc, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';

export const getEmployee = async function (id) {
    const docRef = doc(db, "employees", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export const getAllEmployees = async function () {
    const q = query(collection(db, "employees"));
    const querySnapshot = await getDocs(q);
    const employees = [];
    querySnapshot.forEach((doc) => {
      employees.push(doc.data());
    });
    return employees;
}

export const addEmployee = async function (employee) {
    const id = uuidv4();
    const password = uuidv4();  // generates a new random password

    const dailyWage = employee.monthly_salary / 30; // assuming 30 days in a month

    await setDoc(doc(db, "employees", id), {
        employee_id: id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        address: employee.address,
        contact: employee.contact,
        email: employee.email,
        work_branch: employee.work_branch,
        work_id: employee.work_id,
        report_to: employee.report_to || "",
        designation: employee.designation,
        date_joined: employee.date_joined,
        documents: employee.documents || {},
        monthly_salary: employee.monthly_salary,
        daily_wage: dailyWage
    });

    const userCredentials = await createUserWithEmailAndPassword(auth, employee.email, password);
    await setDoc(doc(collection(db, "user-credentials"), userCredentials.user.uid), {
        role: "employee",
        employee_id: id,
        password: password  
    });
}



export const updateEmployee = async function (employee, id) {
    const dailyWage = employee.monthly_salary / 30; // assuming 30 days in a month

    await updateDoc(doc(db, "employees", id), {
        employee_id: id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        address: employee.address,
        contact: employee.contact,
        email: employee.email,
        work_branch: employee.work_branch,
        work_id: employee.work_id,
        report_to: employee.report_to || "",
        designation: employee.designation,
        date_joined: employee.date_joined,
        documents: employee.documents || {},
        monthly_salary: employee.monthly_salary,
        daily_wage: dailyWage
    });
}


export const deleteEmployee = async function (id) {
    const employee = await getEmployee(id);
    await deleteUser(auth, employee.email);
    await deleteDoc(doc(db, "employees", id));
    await deleteDoc(doc(collection(db, "user-credentials"), employee.employee_id));
}
