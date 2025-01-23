import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PrivacyPolicyModal from '../../PrivacyModal/PrivacyModal';
import { Ref, useState } from 'react';

interface ConsentCheckboxProps {
  ref?: Ref<HTMLInputElement>;
  className?: string;
  name: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  errors?: FieldErrors;
  required?: boolean;
}

export const ConsentCheckbox = ({
  ref,
  className,
  name,
  autoComplete,
  onChange,
  onBlur,
  errors,
  required = false,
}: ConsentCheckboxProps) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <>
      <label className={className}>
        <div className="flex items-center">
          <input
            required={required}
            ref={ref}
            id={name}
            className="mr-2 h-4 w-4 text-primary border-gray-300 rounded-sm"
            name={name}
            type="checkbox"
            autoComplete={autoComplete}
            onChange={onChange}
            onBlur={onBlur}
          />
          <span>
            <FormattedMessage id={'privacyPolicy.checkbox.text'} />{' '}
            <button
              type="button"
              className="text-white underline"
              onClick={() => setShowPrivacyModal(true)}
            >
              <FormattedMessage id={'privacyPolicy.checkbox.link'} />
            </button>
            <span className="text-red-500"> *</span>
          </span>
        </div>
        {errors && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-base text-red-500 mt-1">{message}</p>
            )}
          />
        )}
      </label>
      <PrivacyPolicyModal
        open={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </>
  );
};
