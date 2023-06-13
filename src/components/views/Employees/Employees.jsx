import { BiDotsVerticalRounded } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader";

const EmployeesView = ({ employeeDropdown, employees, loading, onDelete, progress, editing, setEditing }) => {
  if (loading) {
    return <Loader progress={progress} />;
  }

  return (
    <div className="p-8 grid-rows-2 grid-col-1">
      <div className="flex flex-column space-between item-center">
        <div className="text-xl semi-bold">Employees</div>
        <NavLink
          to="/employees/add"
          className="ml-auto rounded-md bg-emerald-700 hover:bg-emerald-800 hover:shadow-md p-2 text-white"
        >
          + Add Employee
        </NavLink>
      </div>
      <div className="bg-white mt-4 shadow-md">
        <table className="table-auto md:table-fixed w-full">
          <thead>
            <tr className="bg-emerald-700">
              <th className="px-4 py-2 text-left text-white">Name</th>
              <th className="px-4 py-2 text-left text-white">Contact</th>
              <th className="px-4 py-2 text-left text-white">Email</th>
              <th className="px-4 py-2 text-left text-white">Joining Date</th>
              <th className="px-4 py-2 text-left text-white">Designation</th>
              <th className="px-4 py-2 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.employee_id || employee.name}
                className="border border-transparent border-b-slate-200"
              >
                <td className="px-4 py-2 text-slate-600">
                  {employee.first_name + " " + employee.last_name}
                </td>
                <td className="px-4 py-2 text-slate-600">{employee.contact}</td>
                <td className="px-4 py-2 text-slate-600">{employee.email}</td>
                <td className="px-4 py-2 text-slate-600">
                  {employee.date_joined}
                </td>
                <td className="px-4 py-2 text-slate-600">
                  {employee.designation}
                </td>
                <td className="relative">
                  <span
                    onClick={() => setEditing(employee.employee_id)}
                    className="z-10 h-46 w-46 cursor-pointer rounded-full hover:bg-slate-200"
                  >
                    <BiDotsVerticalRounded />
                  </span>
                  <div
                    className={`absolute z-20 bg-white top-full left-0 w-full ${
                      employee.employee_id !== editing && "hidden"
                    }`}
                  >
                    {employee.employee_id === editing &&
                      <div
                        ref={employeeDropdown}
                        className={`z-20 p-2 w-full border-solid border border-b-slate-200 w-full flex flex-col`}
                      >
                        <NavLink to={`edit/${employee.employee_id}`}>
                          Edit
                        </NavLink>
                        <NavLink to={`/leaves/${employee.employee_id}`}>
                          Leaves
                        </NavLink>
                        <NavLink to={`/payrolls/${employee.employee_id}`}>
                          Payroll
                        </NavLink>
                        <div
                          className="cursor-pointer"
                          onClick={() => onDelete(employee.employee_id)}
                        >
                          Delete
                        </div>
                      </div>
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesView;
