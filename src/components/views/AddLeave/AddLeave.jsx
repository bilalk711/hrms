import { FaSpinner } from "react-icons/fa";
import Breadcrumbs from "../components/Breadcrumbs";

const AddLeaveView = ({ form, loading, changeHandler, onSubmit }) => (
    <div className="p-8 grid-rows-2 grid-col-1">
        <div className="flex flex-column space-between item-center">
            <div className="text-xl semi-bold">Add New Leave</div>
        </div>
        <Breadcrumbs routes={[
            {
                path: "/leaves",
                label: "Leaves"
            },
            {
                path: `/leaves/${form.employee_id}/add-leave`,
                label: "Add Leave"
            }
        ]}
        />
        <form className="mt-4 flex grid grid-cols-2" onSubmit={onSubmit}>
            <input required disabled={loading} type="date" value={form.start_date} name="start_date" className="m-2 p-2 border border-gray-200" placeholder="Start Date" onChange={changeHandler}/>
            <input required disabled={loading} type="date" value={form.end_date} name="end_date" className="m-2 p-2 border border-gray-200" placeholder="End Date" onChange={changeHandler}/>
            <textarea required disabled={loading} value={form.reason} name="reason" className="m-2 p-2 border border-gray-200" placeholder="Reason for Leave" rows="4" onChange={changeHandler}/>
            <select required disabled={loading} value={form.status} name="status" className="max-h-12 m-2 p-2 border border-gray-200" onChange={changeHandler}>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
            </select>
            <div></div>
            <button className="m-2 ml-auto w-32 p bg-emerald-500 text-white text-center justify-center text-lg font-semibold rounded-lg hover:bg-emerald-600">
                {!loading ?
                    "Add"
                    :
                    <FaSpinner size={28} className="animate-spin m-auto" />}
            </button>
        </form>
    </div>
);

export default AddLeaveView;
