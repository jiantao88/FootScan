import { client } from '@/app/client';
import { ConnectButton as ThirdwebConnectButton } from 'thirdweb/react';

export function ConnectButton() {
  return (
    <ThirdwebConnectButton
      client={client}
      theme={{
        colors: {
          modalBg: '#ffffff',
          dropdownBg: '#ffffff',
          borderColor: '#e5e7eb',
          text: '#000000',
          secondaryText: '#6b7280',
          primaryButtonBg: '#3b82f6',
          primaryButtonText: '#ffffff',
          secondaryButtonBg: '#f3f4f6',
          secondaryButtonText: '#374151',
          connectorBg: '#ffffff',
          connectorText: '#000000',
          tooltipBg: '#ffffff',
          tooltipText: '#000000',
        },
        radii: {
          modal: '12px',
          dropdown: '12px',
          button: '8px',
          connector: '8px',
        },
      }}
      style={{
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '8px 16px',
      }}
    />
  );
}
