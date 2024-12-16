// src/widgets/cards/statistics-card.jsx

import React from 'react';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';

export function StatisticsCard({ icon, title, value, footer, color }) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <div className="border-t border-blue-gray-50 p-4">{footer}</div>
      )}
    </Card>
  );
}

export default StatisticsCard;
