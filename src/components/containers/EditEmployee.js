import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEmployee, updateEmployee } from "../../firebase/employees";
import EditEmployeeView from "../views/EditEmployee/EditEmployee";

const EditEmployee = () => {
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
        date_joined: ""
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [progress, setProgress] = useState(1);
    const { id } = useParams();
    useEffect(()=>{
        setProgress(2);
        getEmployee(id).then((data) => {
            const employee = {
                first_name: data.first_name, 
                last_name: data.last_name,
                address: data.address,
                contact: data.contact,
                email: data.email,
                work_branch: data.work_branch,
                work_id: data.work_id,
                report_to: data.report_to,
                designation: data.designation,
                date_joined: data.date_joined
            };
            setProgress(3);
            setForm(employee);
            setTimeout(()=>setFetching(false), 300);
        })
    }, [id]);
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await updateEmployee(form, id);
        setLoading(false);
    }
    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    return <EditEmployeeView id={id} progress={progress} fetching={fetching} setFetching={setFetching} loading={loading} changeHandler={changeHandler} form={form} onSubmit={onSubmit}/>
}

export default EditEmployee;