import { useState } from 'react';
import { toast } from 'sonner';

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success('Copied to clipboard!', {
      richColors: true,
      duration: 2000,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return { isCopied, copyToClipboard };
};
