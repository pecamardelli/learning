import React from 'react';

const Select	= ({ name, label, error, smallLabel, options, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<select id={name} name={name} {...rest} aria-describedby="selectHelp" className="form-control">
				<option key='none' value='' />
				{options.map(o => <option key={o._id} value={o._id}>{o.name}</option>)}
			</select>
			{ error && <div className='alert alert-danger'>{error}</div> }
			<small id="selectHelp" className="form-text text-muted">{smallLabel}</small>
		</div>
	);
}

export default Select;