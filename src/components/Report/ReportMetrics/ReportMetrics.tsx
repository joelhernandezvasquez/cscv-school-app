import StatsMetric from "@/components/ui/stats-metric/StatsMetric";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";

interface Props {
  hasCompleted: number;
  hasNotCompleted: number;
}

const ReportMetrics = ({ hasCompleted, hasNotCompleted }: Props) => {
  const staticsMetricsItems = [
    {
      id: 1,
      background: "#5655D7",
      stats: "Has completed",
      amount: hasCompleted,
      icon: <FaCheck color="white" size={20} />,
      textColor: "#FFF",
      iconBackground: "#ffffff2e",
    },
    {
      id: 2,
      background: "#F5F8FF",
      stats: "Not yet — call list",
      amount: hasNotCompleted,
      icon: <MdOutlineTimer size={25} />,
      textColor: "#11141A",
      iconBackground: "#CDDEFF",
    },
  ];

  return (
    <section className="mt-6">
      <ul className="grid gap-4 md:grid-cols-2">
        {staticsMetricsItems.map((statics) => {
          return (
            <li key={statics.id}>
              <StatsMetric
                background={statics.background}
                stats={statics.stats}
                amount={statics.amount}
                textColor={statics.textColor ?? ""}
                icon={statics.icon}
                iconBackground={statics.iconBackground}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ReportMetrics;
