import React from 'react';

const Input	= ({ name, label, error, smallLabel, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				{...rest}
				className="form-control"
				aria-describedby="inputHelp"
			/>
			{ error && <div className='alert alert-danger'>{error}</div> }
		    <small id="inputHelp" className="form-text text-muted">{smallLabel}</small>
		  </div>
	);
}

export default Input;