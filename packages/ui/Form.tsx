import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps } from "react";
import {
  useForm,
  UseFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { ZodSchema, TypeOf } from "zod";
import { UITypography } from "./Typography";

interface UseZodFormProps<T extends ZodSchema<any>>
  extends UseFormProps<TypeOf<T>> {
  schema: T;
}

const useZodForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseZodFormProps<T>) => {
  return useForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};

interface FieldErrorProps {
  name?: string;
}

function UIFieldError({ name }: FieldErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  const error = errors[name];

  if (!error) return null;

  return (
    <UITypography className="text-xs text-red-500 font-medium">{error.message?.toString()}</UITypography>
  );
}

const hasError = (form: UseFormReturn<any>, name: string): boolean => Boolean(form.formState.errors[name])

interface Props<T extends FieldValues = any>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

const UIForm =({
  form,
  onSubmit,
  children,
  ...props
}: any) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export { UIForm, UIFieldError, useZodForm, hasError }