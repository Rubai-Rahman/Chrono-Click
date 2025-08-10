'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { cn } from '@/lib/utils';
import { LabelProps } from './label';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<'label'>,
  React.ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        error && 'text-destructive',
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>;

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

interface CommonFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
  label?: React.ReactNode;
  labelPosition?: 'before' | 'after';
  description?: React.ReactNode;
  className?: string;
  children: ControllerProps<TFieldValues, TName>['render'] | React.ReactNode;
  labelProps?: string extends NonNullable<
    CommonFormFieldProps<TFieldValues, TName>['label']
  >
    ? LabelProps
    : never;
  descriptionProps?: string extends NonNullable<
    CommonFormFieldProps<TFieldValues, TName>['description']
  >
    ? Omit<React.HTMLAttributes<HTMLParagraphElement>, 'id'>
    : never;
  formItemProps?: React.HTMLAttributes<HTMLDivElement>;
  formControlProps?: FormControlProps;
}

const CommonFormField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  labelPosition = 'before',
  description,
  children,
  labelProps,
  descriptionProps,
  formItemProps,
  formControlProps,
  ...props
}: CommonFormFieldProps<TFieldValues, TName>) => {
  const renderLabel = label && <FormLabel {...labelProps}>{label}</FormLabel>;

  return (
    <FormField
      {...props}
      render={(fieldProps) => (
        <FormItem {...formItemProps}>
          {labelPosition === 'before' && renderLabel}
          <FormControl {...formControlProps}>
            {typeof children === 'function' ? children(fieldProps) : children}
          </FormControl>
          {labelPosition === 'after' && renderLabel}
          {description && (
            <FormDescription {...descriptionProps}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CustomFormItemProps extends React.PropsWithChildren {
  label?: string;
  showErrorMessage?: boolean;
  className?: string;
}

function CustomFormItem({
  label,
  children,
  showErrorMessage = true,
  className,
}: CustomFormItemProps) {
  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {showErrorMessage && <FormMessage />}
    </FormItem>
  );
}

export {
  CommonFormField,
  CustomFormItem,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
