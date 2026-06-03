import { Box, Typography } from '@mui/material';

export default function HeaderUI() {
  return (
    <Box sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', width: '100%' }}>
      {/* Top Navbar */}
      <Box sx={{ bgcolor: '#090d16', py: 1.5, px: { xs: 2, md: 4 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4
          }}
        >
          {/* Logo Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: 'var(--font-display)', 
                fontWeight: 900, 
                color: '#fff', 
                letterSpacing: '1px',
                bgcolor: 'var(--nba-blue)',
                px: 1.5,
                py: 0.2,
                borderRadius: '4px',
                borderLeft: '4px solid var(--nba-red)',
                display: 'inline-block'
              }}
            >
              NBA
            </Typography>
          </Box>

          {/* Only Active Dashboard Tab */}
          <Box
            className="tab-active-indicator"
            sx={{
              px: 1.5,
              py: 1,
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#fff',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Dashboard
          </Box>
        </Box>
      </Box>

      {/* Sub Header (Only Title) */}
      <Box sx={{ py: 4, px: { xs: 2, md: 4 }, textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(255, 107, 0, 0.05) 0%, transparent 70%)' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Box 
            component="img" 
            src="/i.png" 
            alt="NBA Logo" 
            sx={{ 
              width: { xs: 36, md: 48 }, 
              height: { xs: 36, md: 48 }, 
              objectFit: 'contain',
              mr: 1.5
            }} 
          />
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              color: '#fff',
              letterSpacing: '-1.5px',
              textTransform: 'uppercase'
            }}
          >
            Player Dashboard
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
