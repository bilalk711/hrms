import { FaSpinner } from "react-icons/fa";
import Breadcrumbs from "../components/Breadcrumbs";

const AddPayrollView = ({ form, loading, changeHandler, error, onSubmit }) => (
  <div className="p-8 grid-rows-2 grid-col-1">
    <div className="flex flex-column space-between item-center">
      <div className="text-xl semi-bold">Add New Payroll</div>
    </div>
    <Breadcrumbs
      routes={[
        {
          path: `/payrolls/${form.employee_id}`,
          label: "Payrolls",
        },
        {
          path: `/payrolls/${form.employee_id}/add-payroll`,
          label: "Add Payroll",
        },
      ]}
    />
    <form className="mt flex flex-col" onSubmit={onSubmit}>
      {error &&
        <div className="text-red-400 m-2">{error}</div>
      }
      <label className="m-2" for="from_date">
          From
      </label>
      <input
        required
        id="from_date"
        disabled={loading}
        type="date"
        value={form.pay_period_start}
        name="pay_period_start"
        className="m-2 p-2 border border-gray-200"
        placeholder="Pay Period Start"
        onChange={changeHandler}
      />
      <label className="m-2" for="to_date">
          To
      </label>
      <input
        required
        id="to_date"
        disabled={loading}
        type="date"
        value={form.pay_period_end}
        name="pay_period_end"
        className="m-2 p-2 border border-gray-200"
        placeholder="Pay Period End"
        onChange={changeHandler}
      />
      <label className="m-2" for="bonus">
          Bonus
      </label>
      <input
        required
        id="bonus"
        disabled={loading}
        type="number"
        min="0"
        step="0.01"
        value={form.bonuses}
        name="bonuses"
        className="m-2 p-2 border border-gray-200"
        placeholder="Bonuses"
        onChange={changeHandler}
      />
      <button className="m-2 p-2 ml-auto w-48 bg-emerald-500 text-white text-center justify-center text-lg font-semibold rounded-lg hover:bg-emerald-600">
        {!loading ? (
          "Add"
        ) : (
          <FaSpinner size={28} className="animate-spin m-auto" />
        )}
      </button>
    </form>
  </div>
);

export default AddPayrollView;
