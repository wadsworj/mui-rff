import React from 'react';

import { DateTimePicker as MuiDateTimePicker, DateTimePickerProps as MuiDateTimePickerProps } from '@mui/lab';

import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import { ShowErrorFunc, showErrorOnChange } from './Util';
import { TextField } from '@mui/material';
import pickerProviderWrapper from './PickerProvider';

export interface DateTimePickerProps extends Partial<Omit<MuiDateTimePickerProps, 'onChange'>> {
	name: string;
	locale?: any;
	fieldProps?: Partial<FieldProps<any, any>>;
	showError?: ShowErrorFunc;
}

export function DateTimePicker(props: DateTimePickerProps) {
	const { name, fieldProps, ...rest } = props;

	return (
		<Field
			name={name}
			render={(fieldRenderProps) => <DateTimePickerWrapper {...fieldRenderProps} {...rest} />}
			{...fieldProps}
		/>
	);
}

interface DateTimePickerWrapperProps extends FieldRenderProps<MuiDateTimePickerProps> {
	locale?: any;
}

function DateTimePickerWrapper(props: DateTimePickerWrapperProps) {
	const {
		input: { name, onChange, value, ...restInput },
		meta,
		locale,
		showError = showErrorOnChange,
		...rest
	} = props;

	const { error, submitError } = meta;
	const isError = showError({ meta });

	const { helperText, ...lessrest } = rest;

	return pickerProviderWrapper(
		<MuiDateTimePicker
			onChange={onChange}
			value={(value as any) === '' ? null : value}
			{...lessrest}
			renderInput={(props) => (
				<TextField
					fullWidth={true}
					helperText={isError ? error || submitError : helperText}
					error={isError}
					name={name}
					{...restInput}
					{...props}
				/>
			)}
		/>,
		locale,
	);
}
