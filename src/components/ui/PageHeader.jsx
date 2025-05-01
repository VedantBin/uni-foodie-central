
import React from 'react';

const PageHeader = ({ title, description, action }) => {
  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b">
      <div>
        <h1 className="text-3xl font-bold text-university-dark">{title}</h1>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;
