import "./inputForm.css";

const InputForm = ({ label, placeholder, require, name, value, onChange }) => {
  return (
    <div className="containerInputForm">
      <label htmlFor="">{label}</label>
      <input
        placeholder={placeholder}
        required={require}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputForm;
