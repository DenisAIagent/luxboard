import React from 'react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: ChartData[];
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  height?: number;
  width?: number;
  className?: string;
  showLegend?: boolean;
  showLabels?: boolean;
  showGrid?: boolean;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  type,
  height = 300,
  width = '100%',
  className = '',
  showLegend = true,
  showLabels = true,
  showGrid = true,
}) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderBarChart = () => {
    return (
      <div className="flex h-full items-end space-x-2">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex flex-1 flex-col items-center"
            >
              <div
                className="w-full rounded-t bg-[#1a1a1a] transition-all duration-300 hover:opacity-80"
                style={{ height: `${percentage}%` }}
              />
              {showLabels && (
                <span className="mt-2 text-xs text-gray-500">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderLineChart = () => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 100;
      return `${x},${y}`;
    });

    return (
      <svg className="h-full w-full">
        {showGrid && (
          <g className="text-gray-200">
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
                stroke="currentColor"
                strokeWidth="0.5"
              />
            ))}
          </g>
        )}
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2"
        />
        {showLabels && (
          <g className="text-xs text-gray-500">
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100;
              return (
                <text
                  key={index}
                  x={`${x}%`}
                  y="100%"
                  textAnchor="middle"
                  dy="1em"
                >
                  {item.label}
                </text>
              );
            })}
          </g>
        )}
      </svg>
    );
  };

  const renderPieChart = () => {
    let currentAngle = 0;
    const radius = 100;
    const center = 120;

    return (
      <svg
        viewBox="0 0 240 240"
        className="h-full w-full"
      >
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (currentAngle * Math.PI) / 180;

          const x1 = center + radius * Math.cos(startRad);
          const y1 = center + radius * Math.sin(startRad);
          const x2 = center + radius * Math.cos(endRad);
          const y2 = center + radius * Math.sin(endRad);

          const largeArcFlag = angle > 180 ? 1 : 0;

          const path = [
            `M ${center},${center}`,
            `L ${x1},${y1}`,
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}`,
            'Z',
          ].join(' ');

          return (
            <path
              key={index}
              d={path}
              fill={item.color || '#1a1a1a'}
              className="transition-all duration-300 hover:opacity-80"
            />
          );
        })}
        {showLabels && (
          <g className="text-xs text-gray-500">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const midAngle = currentAngle - angle / 2;
              const rad = (midAngle * Math.PI) / 180;
              const x = center + (radius * 0.7) * Math.cos(rad);
              const y = center + (radius * 0.7) * Math.sin(rad);

              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {item.label}
                </text>
              );
            })}
          </g>
        )}
      </svg>
    );
  };

  const renderDoughnutChart = () => {
    let currentAngle = 0;
    const radius = 100;
    const center = 120;
    const innerRadius = 60;

    return (
      <svg
        viewBox="0 0 240 240"
        className="h-full w-full"
      >
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (currentAngle * Math.PI) / 180;

          const x1 = center + radius * Math.cos(startRad);
          const y1 = center + radius * Math.sin(startRad);
          const x2 = center + radius * Math.cos(endRad);
          const y2 = center + radius * Math.sin(endRad);

          const x3 = center + innerRadius * Math.cos(endRad);
          const y3 = center + innerRadius * Math.sin(endRad);
          const x4 = center + innerRadius * Math.cos(startRad);
          const y4 = center + innerRadius * Math.sin(startRad);

          const largeArcFlag = angle > 180 ? 1 : 0;

          const path = [
            `M ${x1},${y1}`,
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}`,
            `L ${x3},${y3}`,
            `A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 0 ${x4},${y4}`,
            'Z',
          ].join(' ');

          return (
            <path
              key={index}
              d={path}
              fill={item.color || '#1a1a1a'}
              className="transition-all duration-300 hover:opacity-80"
            />
          );
        })}
        {showLabels && (
          <g className="text-xs text-gray-500">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const midAngle = currentAngle - angle / 2;
              const rad = (midAngle * Math.PI) / 180;
              const x = center + (radius * 0.85) * Math.cos(rad);
              const y = center + (radius * 0.85) * Math.sin(rad);

              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {item.label}
                </text>
              );
            })}
          </g>
        )}
      </svg>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      case 'doughnut':
        return renderDoughnutChart();
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <div
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          width: typeof width === 'number' ? `${width}px` : width,
        }}
      >
        {renderChart()}
      </div>
      {showLegend && (
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2"
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color || '#1a1a1a' }}
              />
              <span className="text-sm text-gray-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 