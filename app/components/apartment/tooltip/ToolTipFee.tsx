'use client';

import { Button, Tooltip } from 'flowbite-react';
import { FiHelpCircle } from 'react-icons/fi';

export default function TooltipFee() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tooltip
        className="w-[50%]"
        content="This helps us operate our platform and provide services like 24/7 support during your trip."
        animation={false}
      >
        <FiHelpCircle />
      </Tooltip>
    </div>
  );
}
