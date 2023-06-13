import { FaSpinner } from "react-icons/fa";
import Breadcrumbs from "../components/Breadcrumbs";

const AddEmployeeView = ({ form, loading, changeHandler, onSubmit}) => (
    <div className="p-8 grid-rows-2 grid-col-1">
    <div className="flex flex-column space-between item-center">
        <div className="text-xl semi-bold">Add New Employee</div>
    </div>
    <Breadcrumbs routes={[
        {
            path: "/employees", 
            label: "Employees"
        },
        {
            path: "/employees/add",
            label: "Add Employee"
        }
    ]}
    />
    <form className="mt-4 flex grid grid-cols-2" onSubmit={onSubmit}>
        <input required disabled={loading} value={form.first_name} name="first_name" className="m-2 p-2 border border-gray-200" placeholder="First Name" onChange={changeHandler}/>
        <input required disabled={loading} value={form.last_name} name="last_name" className="m-2 p-2 border border-gray-200" placeholder="Last Name" onChange={changeHandler}/>
        <input required disabled={loading} value={form.address} name="address" className="m-2 p-2 border border-gray-200" placeholder="Address" onChange={changeHandler}/>
        <input required disabled={loading} value={form.contact} name="contact" className="m-2 p-2 border border-gray-200" placeholder="Contact" onChange={changeHandler}/>
        <input required disabled={loading} type="email" value={form.email} name="email" className="m-2 p-2 border border-gray-200" placeholder="Email" onChange={changeHandler}/>
        <input required disabled={loading} value={form.work_branch} name="work_branch" className="m-2 p-2 border border-gray-200" placeholder="Work Branch" onChange={changeHandler}/>
        <input required disabled={loading} value={form.report_to} name="report_to" className="m-2 p-2 border border-gray-200" placeholder="Report To" onChange={changeHandler}/>
        <input required disabled={loading} value={form.designation} name="designation" className="m-2 p-2 border border-gray-200" placeholder="Designation" onChange={changeHandler}/>
        <input required type="number" min="1000" max="1000000" disabled={loading} value={form.monthly_salary} name="monthly_salary" className="m-2 p-2 border border-gray-200" placeholder="Monthly Salary" onChange={changeHandler}/>
        <input required disabled={loading} type="date" value={form.date_joined} name="date_joined" className="m-2 p-2 border border-gray-200" placeholder="Joining Date" onChange={changeHandler}/>
        <div/>
        <button className="m-2 ml-auto w-32 p bg-emerald-500 text-white text-center justify-center text-lg font-semibold rounded-lg hover:bg-emerald-600">
                    {!loading ? 
                        "Add"
                        :
                    <FaSpinner size={28} className="animate-spin m-auto"/>}
        </button>
    </form>
</div>
);

export default AddEmployeeView;