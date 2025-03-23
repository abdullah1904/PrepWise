import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { FormItem, FormLabel, FormControl, FormMessage } from './ui/form'
import { Input } from './ui/input'

type FormFieldProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'file'
}

const FormField = <T extends FieldValues>({ control, name, label, placeholder, type = "text" }: FormFieldProps<T>) => {
    return (
        <Controller name={name} control={control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='label'>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} className='input' {...field} type={type}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />


    )
}

export default FormField