'use client';

import { cn } from '@/lib/utils';
import React from 'react';

type PasswordStrengthLevel = 'weak' | 'medium' | 'strong' | 'very-strong';

const getPasswordStrength = (password: string): PasswordStrengthLevel | null => {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score === 3) return 'medium';
  if (score === 4) return 'strong';
  return 'very-strong';
};

const strengthConfig: Record<
  PasswordStrengthLevel,
  { text: string; color: string; width: string }
> = {
  weak: { text: 'Weak', color: 'bg-red-500', width: '25%' },
  medium: { text: 'Medium', color: 'bg-yellow-500', width: '50%' },
  strong: { text: 'Strong', color: 'bg-sky-500', width: '75%' },
  'very-strong': { text: 'Very Strong', color: 'bg-green-500', width: '100%' },
};

const PasswordStrengthIndicator = ({ password }: { password?: string }) => {
  const strength = getPasswordStrength(password || '');

  if (!password) return null;

  const config = strength ? strengthConfig[strength] : null;

  return (
    <div className="space-y-2">
      <div className="h-1.5 w-full rounded-full bg-muted">
        <div
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            config?.color
          )}
          style={{ width: config?.width || '0%' }}
        />
      </div>
      {config && (
        <p className="text-xs text-muted-foreground">{config.text}</p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
