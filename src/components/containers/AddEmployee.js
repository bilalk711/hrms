import { useState } from "react";
import { addEmployee } from "../../firebase/employees";
import AddEmployeeView from "../views/AddEmployee/AddEmployee";

const AddEmployee = () => {
    const [form, setForm] = useState({ 
        first_name: "", 
        last_name: "",
        address: "",
        contact: "",
        email: "",
        work_branch: "",
        work_id: "",
        report_to: "",
        designation: "",
        monthly_salary: 1000,
        date_joined: ""
    });
    const [loading, setLoading] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await addEmployee(form);
        setLoading(false);
    }
    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    return <AddEmployeeView loading={loading} changeHandler={changeHandler} form={form} onSubmit={onSubmit}/>
}

export default AddEmployee;