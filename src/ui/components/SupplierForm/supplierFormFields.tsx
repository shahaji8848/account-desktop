export const InputField = ({ label, type, isIndented = false, firstAddressFormInputRef, firstBankFormInputRef, onKeyDown, value, name, onFocus, onChange }: any) => (
    <div className="row d-flex mt-1">
        <label className={isIndented ? "label-indent ms-4" : "label-width"}>{label}</label>
        <span className="colon-span">:</span>
        <input
            type="text"
            className="form-control input-width"
            ref={(label === "GSTIN" && type === 'address') ? firstAddressFormInputRef : (label === "Account Name" && type === 'bank') ? firstBankFormInputRef : null}
            onKeyDown={onKeyDown}
            value={value}
            name={name}
            onFocus={onFocus}
            onChange={onChange}
        />
    </div>
);

export const SectionTitle = ({ title, marginTop }: any) => (
    <div className="row" style={{ marginTop }}>
        <label className="section-title">{title}</label>
    </div>
);