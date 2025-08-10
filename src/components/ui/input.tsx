import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Eye, EyeOff, Search, X } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';

const inputVariants = cva(
  'peer flex w-full rounded-md border border-input transition bg-background px-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive',
  {
    variants: {
      inputSize: {
        default: 'py-2 h-10 text-sm',
        sm: 'py-1.5 text-sm h-9',
        lg: 'py-3 text-base h-12',
      },
    },
    defaultVariants: {
      inputSize: 'default',
    },
  }
);

interface InputComponentProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputComponentProps>(
  ({ className, type, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

const PasswordInput = React.forwardRef<HTMLInputElement, InputComponentProps>(
  ({ className, inputSize, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const disabled =
      props.value === '' || props.value === undefined || props.disabled;

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('hide-password-toggle pr-10', className)}
          inputSize={inputSize}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-transparent focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>
        <style jsx>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export interface SearchInputProps extends InputComponentProps {
  containerClassName?: string;
  hideSearchIcon?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      containerClassName,
      hideSearchIcon = false,
      inputSize,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClear = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
      if (props.onChange) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        props.onChange(event);
      }
    };

    return (
      <div className={cn('relative w-full', containerClassName)}>
        <Input
          type="text"
          className={cn(
            'peer',
            hideSearchIcon ? 'pr-10' : 'px-10 pl-10',
            className
          )}
          inputSize={inputSize}
          ref={(node) => {
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
            (
              inputRef as React.MutableRefObject<HTMLInputElement | null>
            ).current = node;
          }}
          {...props}
        />
        {!hideSearchIcon && (
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
        )}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 block h-full px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-transparent peer-placeholder-shown:hidden"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { Input, PasswordInput, SearchInput };
