import { useCallback, useEffect, useRef, useState } from 'react';
import { deletePayroll, getPayrollsByEmployeeId } from '../../firebase/payrolls';
import { useParams } from "react-router-dom";
import PayrollsView from '../views/Payrolls/Payrolls';
import { BiDotsVerticalRounded } from "react-icons/bi";

const Payrolls = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(1);
  const [editing, setEditing] = useState(null);
  
  const payrollDropdown = useRef(null);

  const { id } = useParams();

  const closeDropdowns = (e) => {
    if (payrollDropdown.current && !payrollDropdown.current.contains(e.target)) {
      setEditing(null);
    }
  };

  const fetchPayrolls = useCallback(async () => {
    try {
      setProgress(2);
      const payrolls = await getPayrollsByEmployeeId(id);
      setPayrolls(payrolls);
      setProgress(3);
      setTimeout(()=>{
          setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleDeletePayroll = useCallback(async (payrollId) => {
    try {
      setLoading(true);
      await deletePayroll(payrollId);
      await fetchPayrolls();
    } catch (error) {
      console.log(error);
    }
  }, [fetchPayrolls]);

  useEffect(() => {
    fetchPayrolls();
    document.addEventListener("mousedown", closeDropdowns);
    return () => {
      setEditing(null);
      document.removeEventListener("mousedown", closeDropdowns);
    };
  }, [fetchPayrolls, id]);

  return (
    <PayrollsView
      progress={progress}
      payrolls={payrolls}
      loading={loading}
      renderRow={(payroll) => (
        <tr className="border border-transparent border-b-slate-200" key={payroll.payroll_id}>
            <td className="px-4 py-2 text-slate-600">{payroll.employee_name}</td>
            <td className="px-4 py-2 text-slate-600">${Number(payroll.monthly_salary).toFixed(2)}</td>
            <td className="px-4 py-2 text-slate-600">${Number(payroll.leaves_deduction).toFixed(2)}</td>
            <td className="px-4 py-2 text-slate-600">${Number(payroll.bonuses).toFixed(2)}</td>
            <td className="px-4 py-2 text-slate-600">${Number(payroll.monthly_salary + Number(payroll.bonuses) - payroll.leaves_deduction).toFixed(2)}</td>
            <td className="relative px-4 py-2 text-slate-600">
                <span onClick={()=>setEditing(payroll.payroll_id)} className="z-10 h-46 w-46 cursor-pointer rounded-full hover:bg-slate-200">
                    <BiDotsVerticalRounded />
                </span>
                <div
                      className={`absolute z-20 bg-white top-full left-0 w-full ${
                        payroll.payroll_id !== editing && "hidden"
                      }`}
                    >
                      {payroll.payroll_id === editing &&
                        <div
                          ref={payrollDropdown}
                          className={`z-20 p-2 w-full border-solid border border-b-slate-200 w-full flex flex-col`}
                        >
                          <div onClick={()=>handleDeletePayroll(payroll.payroll_id)} className="cursor-pointer">
                            Delete
                          </div>
                        </div>
                      }
                </div>
            </td>
        </tr>
      )}
      employeeId={id}
    />
  );
};

export default Payrolls;
