import { BiDotsVerticalRounded, BiCheckCircle, BiXCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader";

const LeavesView = ({ leavesDropdown, leaves, employeeId, loading, onDelete, progress, editing, setEditing, onUpdateLeaveStatus }) => {
  if (loading) {
    return <Loader progress={progress} />;
  }

  return (
    <div className="p-8 grid-rows-2 grid-col-1">
      <div className="flex flex-column space-between item-center">
        <div className="text-xl semi-bold">Leave Requests</div>
        {employeeId &&
          <NavLink
            to={`/leaves/${employeeId}/add-leave`}
            className="ml-auto rounded-md bg-emerald-700 hover:bg-emerald-800 hover:shadow-md p-2 text-white"
          >
            + Add Leave
          </NavLink>
        }
      </div>
      {leaves.length === 0 && !loading ? (
        <div className="flex justify-center items-center h-48 text-lg text-slate-600">
          No Leave Data Found
        </div>
      ) : (
        <div className="bg-white mt-4 shadow-md">
          <table className="table-auto md:table-fixed w-full">
            <thead>
              <tr className="bg-emerald-700">
                <th className="px-4 py-2 text-left text-white">Start Date</th>
                <th className="px-4 py-2 text-left text-white">End Date</th>
                <th className="px-4 py-2 text-left text-white">Reason</th>
                <th className="px-4 py-2 text-left text-white">Status</th>
                <th className="px-4 py-2 text-left text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr
                  key={leave.leave_id}
                  className="border border-transparent border-b-slate-200"
                >
                  <td className="px-4 py-2 text-slate-600">
                    {leave.start_date}
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    {leave.end_date}
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    {leave.reason}
                  </td>
                  <td className="px-4 py-2 text-slate-600">{leave.status}</td>
                  <td className="relative">
                    <span
                      onClick={() => setEditing(leave.leave_id)}
                      className="z-10 h-46 w-46 cursor-pointer rounded-full hover:bg-slate-200"
                    >
                      <BiDotsVerticalRounded />
                    </span>
                    <div
                      className={`absolute z-20 bg-white top-full left-0 w-full ${
                        leave.leave_id !== editing && "hidden"
                      }`}
                    >
                      {leave.leave_id === editing &&
                        <div
                          ref={leavesDropdown}
                          className={`z-20 p-2 w-full border-solid border border-b-slate-200 w-full flex flex-col`}
                        >
                          <NavLink to={`leaves/edit/${leave.leave_id}`}>
                            Edit
                          </NavLink>
                          <div
                            className="cursor-pointer"
                            onClick={() => onDelete(leave.leave_id)}
                          >
                            Delete
                          </div>
                          {leave.status === "Pending" &&
                            <>
                              <div
                                className="cursor-pointer"
                                onClick={() => onUpdateLeaveStatus(leave.leave_id, "Accepted")}
                              >
                                <BiCheckCircle className="inline-block mr-1" />
                                Accept
                              </div>
                              <div
                                className="cursor-pointer"
                                onClick={() => onUpdateLeaveStatus(leave.leave_id, "Declined")}
                              >
                                <BiXCircle className="inline-block mr-1" />
                                Decline
                              </div>
                            </>
                          }
                        </div>
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeavesView;
