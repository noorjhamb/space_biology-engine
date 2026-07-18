
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-nasa-medium-gray mb-1">{label}</label>
      <div className="relative">
        <select
          className="appearance-none block w-full bg-nasa-dark border border-nasa-border rounded-md py-2 px-3 text-nasa-light-gray focus:outline-none focus:ring-2 focus:ring-nasa-blue"
          {...props}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-nasa-medium-gray">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
