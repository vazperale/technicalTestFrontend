import React from 'react';

export default function SelectComponent ({
  options,           
  selectedValue,     
  handleChange,      
  label,            
  placeholder       
}){
  return (
    <div>
      <strong className="text-primary">{label.toUpperCase()}</strong>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="form-select"
      >
        {options.length > 1 && (
          <option value="">{`Seleccione ${placeholder}`}</option>
        )}
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

