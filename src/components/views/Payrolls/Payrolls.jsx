import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";

const PayrollsView = ({ employeeId, payrolls, loading, progress, renderRow }) => {
  if (loading) {
    return <Loader progress={progress} />;
  }

  return (
    <div className="p-8">
      <div className="flex flex-column space-between item-center">
            <div className="text-xl font-semibold mb-4">Payroll Data</div>
            {employeeId &&
              <NavLink
                  to={`/payrolls/${employeeId}/add-payroll`}
                  className="ml-auto rounded-md bg-emerald-700 hover:bg-emerald-800 hover:shadow-md p-2 text-white"
              >
                  + Add Payroll
              </NavLink>
            }
        </div>
      {payrolls.length === 0 && !loading ? (
        <div className="flex justify-center items-center h-48 text-lg text-gray-600">
          No payroll data found
        </div>
      ) : (
        <div className="bg-white mt-4 shadow-md">
          <table className="table-auto md:table-fixed w-full">
            <thead>
              <tr className="bg-emerald-700 text-white">
                <th className="px-4 py-2 text-left">Employee Name</th>
                <th className="px-4 py-2 text-left">Monthly Salary ($)</th>
                <th className="px-4 py-2 text-left">Leaves Deduction ($)</th>
                <th className="px-4 py-2 text-left">Bonuses ($)</th>
                <th className="px-4 py-2 text-left">Total ($)</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map(renderRow)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PayrollsView;
