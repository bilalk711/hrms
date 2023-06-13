import { useEffect, useRef, useState, useCallback } from "react";
import { getLeavesByEmployeeId, updateLeaveStatus, deleteLeave } from "../../firebase/leaves";
import LeavesView from "../views/Leaves/Leaves";
import { useParams } from "react-router-dom";

const Leaves = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(1);
  const [editing, setEditing] = useState(null);
  
  const leavesDropdown = useRef(null);

  const { id } = useParams();

  const fetchLeaves = useCallback(() => {
    setProgress(2);
    getLeavesByEmployeeId(id).then((leaves) => {
      setList(leaves);
      setProgress(3);
      setTimeout(()=>{
          setLoading(false);
      }, 500);
    });
  }, [id]);

  const handleDeleteLeave = useCallback(async (leaveId) => {
    try {
      await deleteLeave(leaveId);
      fetchLeaves();
    } catch (error) {
      console.log(error);
    }
  }, [fetchLeaves]);

  const handleUpdateLeaveStatus = useCallback(async (leaveId, status) => {
    try {
      await updateLeaveStatus(leaveId, status);
      fetchLeaves();
    } catch (error) {
      console.log(error);
    }
  }, [fetchLeaves]);

  const closeDropdowns = (e) => {
    if (leavesDropdown.current && !leavesDropdown.current.contains(e.target)) {
      setEditing(null);
    }
  };

  useEffect(() => {
    setProgress(1);
    document.addEventListener("mousedown", closeDropdowns);
    fetchLeaves();
    return () => {
      setEditing(null);
      document.removeEventListener("mousedown", closeDropdowns);
    };
  }, [id, fetchLeaves]);

  return (
    <LeavesView
      employeeId={id}
      leavesDropdown={leavesDropdown}
      editing={editing}
      setEditing={setEditing}
      progress={progress}
      leaves={list}
      loading={loading}
      onUpdateLeaveStatus={handleUpdateLeaveStatus}
      onDelete={handleDeleteLeave}
    />
  );
};

export default Leaves;
