import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';

interface AlertConfig {
  description: string;
  variant?: 'standard' | 'filled' | 'outlined';
  severity?: 'success' | 'info' | 'warning' | 'error';
}

export default function AlertUI(config: AlertConfig) {
  // Default values to remain compatible with standard guide requirements
  const severityVal = config.severity || "success";
  const variantVal = config.variant || "outlined";

  return (
    <Box sx={{ width: '100%', my: 1 }}>
      <Alert 
        variant={variantVal} 
        severity={severityVal}
        sx={{
          bgcolor: severityVal === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
          color: '#fff',
          border: `1px solid ${severityVal === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          borderRadius: '10px',
          fontWeight: 500,
          fontSize: '0.875rem',
          '.MuiAlert-icon': {
            color: severityVal === 'success' ? 'var(--nba-green) !important' : 'var(--nba-red) !important'
          }
        }}
      >
        {config.description}
      </Alert>
    </Box>
  );
}
