import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

import { cn } from '@/utils/cn';
import { truncatePublicKey } from '@/utils/truncatePublicKey';

const WalletMultiButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false },
);

export function PaymentsWalletBar() {
  const { connected, publicKey } = useWallet();
  const address = publicKey?.toBase58();

  return (
    <div
      className={cn(
        'mb-4 flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3',
      )}
    >
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span className="font-medium">Active wallet:</span>
        {connected && address ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-mono">{truncatePublicKey(address, 4)}</span>
          </span>
        ) : (
          <span className="text-slate-500">Not connected</span>
        )}
      </div>

      <div className="ph-no-capture">
        <WalletMultiButton
          style={{
            height: '36px',
            fontWeight: 600,
            fontFamily: 'Inter',
            fontSize: '14px',
          }}
        />
      </div>
    </div>
  );
}
