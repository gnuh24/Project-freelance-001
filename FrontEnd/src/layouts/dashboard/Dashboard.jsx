import AreaChart from '../../components/admin/chart/AreaChart'
import ColumnChart from '../../components/admin/chart/ColumnChart'
import PieChart from '../../components/admin/chart/PieChart'
import DonutChart from '../../components/admin/chart/DonutChart'
const Dashboard = () => {
  return (
    <>
      <div className="flex-auto p-4">
        <div>
          <AreaChart />
        </div>
        <div className="py-4 grid grid-cols-3 gap-4">
          <ColumnChart />
          <PieChart />
          <DonutChart />
        </div>
      </div>
    </>
  )
}
export default Dashboard
