import { useEffect, useRef, useState } from "react";
import { deleteEmployee, getAllEmployees } from "../../firebase/employees";
import EmployeesView from "../views/Employees/Employees";

const Employees = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(1);
    const [editing, setEditing] = useState(null);
    const employeeDropdown = useRef(null);
    const fetchEmployees = () => {
        setProgress(2);
        getAllEmployees().then((employees)=>{
            setList(employees);
            setProgress(3);
            setTimeout(()=>{
                setLoading(false);
            }, 500);
        });
    }
    const onDelete = async (id) => {
        setEditing(false);
        await deleteEmployee(id);
        setLoading(true);
        fetchEmployees();
    }
    const closeDropdowns = (e) => {
        if(employeeDropdown.current && !employeeDropdown.current.contains(e.target)) setEditing(null);
    }
    useEffect(()=>{
        setProgress(1);
        document.addEventListener("mousedown", closeDropdowns);
        fetchEmployees();
        return () => {
            setEditing(null);
            document.removeEventListener("mousedown", closeDropdowns);
        }
    }, []);
    return <EmployeesView employeeDropdown={employeeDropdown} onDelete={onDelete} editing={editing} setEditing={setEditing} employees={list} loading={loading} progress={progress}/>;
};

export default Employees;