import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPayroll } from "../../firebase/payrolls"; // Assuming you have a function to add new payroll data in your firebase/payrolls.js file
import AddPayrollView from "../views/AddPayroll/AddPayroll";

const AddPayroll = () => {
  const { id } = useParams(); // Getting the employee_id parameter from the URL
  const navigate = useNavigate(); // Using this hook to redirect the user after submitting the form

  const [form, setForm] = useState({
    employee_id: id,
    pay_period_start: "",
    pay_period_end: "",
    bonuses: "",
  }); // Setting initial state for the form fields
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    try{
      e.preventDefault();
      setLoading(true);
      console.log(form);
      await createPayroll(form); // Call your function to add the payroll data to Firebase
      setLoading(false);
      navigate(`/payrolls/${id}`); // Redirect to the payrolls view for this employee
    }
    catch(err){
      setLoading(false);
      console.log(Object.keys(err));
      setError(err.message);
    }
  };

  const changeHandler = (e) => {
    setError(null);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <AddPayrollView
      error={error}
      loading={loading}
      changeHandler={changeHandler}
      form={form}
      onSubmit={onSubmit}
    />
  );
};

export default AddPayroll;
