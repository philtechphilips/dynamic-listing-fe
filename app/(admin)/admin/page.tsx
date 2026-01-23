import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppLineChart from "@/components/AppLineChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
      {/* ROW 1 */}
      <div className="bg-primary-foreground p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 2xl:col-span-3">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-6 rounded-2xl border border-gray-100 shadow-sm">
        <CardList title="Latest Comments" />
      </div>

      {/* ROW 2 */}
      <div className="bg-primary-foreground p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
        <AppLineChart />
      </div>
      <div className="bg-primary-foreground p-6 rounded-2xl border border-gray-100 shadow-sm">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-6 rounded-2xl border border-gray-100 shadow-sm">
        <CardList title="Trending Searches" />
      </div>

      {/* ROW 3 */}
      <div className="bg-primary-foreground p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 2xl:col-span-3">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-6 rounded-2xl border border-gray-100 shadow-sm">
        <CardList title="Popular Content" />
      </div>
    </div>
  );
};

export default Homepage;
