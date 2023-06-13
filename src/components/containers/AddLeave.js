import { useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using the useParams hook for getting the employee_id parameter
import { addLeave } from "../../firebase/leaves";
import AddLeaveView from "../views/AddLeave/AddLeave";

const AddLeave = () => {
    const { id } = useParams(); // Getting the employee_id parameter from the URL

    const [form, setForm] = useState({ 
        employee_id: id,
        start_date: "",
        end_date: "",
        reason: "",
        status: "Pending"
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await addLeave(form);
        setLoading(false);
    }

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return <AddLeaveView loading={loading} changeHandler={changeHandler} form={form} onSubmit={onSubmit}/>
}

export default AddLeave;
