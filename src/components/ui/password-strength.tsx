'use client';

import { useMemo } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  {
    label: 'At least 6 characters',
    test: (password) => password.length >= 6,
  },
  {
    label: 'Contains uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'Contains lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'Contains number',
    test: (password) => /\d/.test(password),
  },
];

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' };

    const passedRequirements = requirements.filter((req) =>
      req.test(password)
    ).length;

    if (passedRequirements <= 1) {
      return { score: 1, label: 'Weak', color: 'bg-red-500' };
    } else if (passedRequirements <= 2) {
      return { score: 2, label: 'Fair', color: 'bg-orange-500' };
    } else if (passedRequirements <= 3) {
      return { score: 3, label: 'Good', color: 'bg-yellow-500' };
    } else {
      return { score: 4, label: 'Strong', color: 'bg-green-500' };
    }
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      {/* Strength Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-muted rounded-full h-2">
          <div
            className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${(strength.score / 4) * 100}%` }}
          />
        </div>
        <span
          className={`text-xs font-medium ${
            strength.score === 1
              ? 'text-red-600'
              : strength.score === 2
              ? 'text-orange-600'
              : strength.score === 3
              ? 'text-yellow-600'
              : 'text-green-600'
          }`}
        >
          {strength.label}
        </span>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        {requirements.map((requirement, index) => {
          const passed = requirement.test(password);
          return (
            <div
              key={index}
              className={`flex items-center gap-2 text-xs transition-colors ${
                passed ? 'text-green-600' : 'text-muted-foreground'
              }`}
            >
              {passed ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
              <span>{requirement.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
