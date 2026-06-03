import { Box, Typography } from '@mui/material';

interface PlayerProps {
  id: string;
  name: string;
  rank: number;
  rating: string;
  team: string;
  gradient: string;
  isSelected: boolean;
  onClick: () => void;
}

export function PlayerCard({ name, rank, rating, team, gradient, isSelected, onClick }: PlayerProps) {
  // Extract initials for the visual silhouette fallback
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <Box 
      onClick={onClick}
      className="glass-panel"
      sx={{
        width: 140,
        minWidth: 140,
        height: 200,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: isSelected 
          ? '2.5px solid var(--nba-orange)' 
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isSelected 
          ? '0 0 20px rgba(255, 107, 0, 0.3), inset 0 0 10px rgba(255, 107, 0, 0.1)' 
          : 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 1.5,
        borderRadius: '12px',
        bgcolor: isSelected ? 'rgba(255, 107, 0, 0.04)' : 'var(--bg-card)',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: isSelected ? 'var(--nba-orange)' : 'rgba(255, 255, 255, 0.25)',
          boxShadow: isSelected 
            ? '0 0 20px rgba(255, 107, 0, 0.4)' 
            : '0 8px 24px rgba(0,0,0,0.4)',
        }
      }}
    >
      {/* Top Badges */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <Box sx={{ bgcolor: 'rgba(0,0,0,0.6)', px: 0.8, py: 0.2, borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--nba-gold)' }}>
            #{rank}
          </Typography>
        </Box>
        <Box sx={{ bgcolor: rating.startsWith('+') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', px: 0.8, py: 0.2, borderRadius: '4px' }}>
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: rating.startsWith('+') ? 'var(--nba-green)' : 'var(--nba-red)' }}>
            {rating}
          </Typography>
        </Box>
      </Box>

      {/* Profile Photo Graphic representation with team gradient background */}
      <Box 
        sx={{ 
          width: 80, 
          height: 80, 
          borderRadius: '50%', 
          alignSelf: 'center',
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          my: 1,
          border: '2px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          zIndex: 1
        }}
      >
        {/* Visual basketball court grid lines inside the background */}
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        
        {/* Visual representation of player's face profile / jersey */}
        <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', opacity: 0.95, letterSpacing: '-1.5px', fontFamily: 'var(--font-display)' }}>
          {initials}
        </Typography>

        {/* Small Team Badge */}
        <Box sx={{
          position: 'absolute',
          bottom: -4,
          right: -4,
          bgcolor: '#0f1420',
          color: '#fff',
          fontSize: '0.55rem',
          fontWeight: 800,
          px: 0.6,
          py: 0.2,
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.12)'
        }}>
          {team}
        </Box>
      </Box>

      {/* Name Area */}
      <Box sx={{ zIndex: 2, textAlign: 'center' }}>
        <Typography 
          sx={{ 
            fontSize: '0.85rem', 
            fontWeight: 700, 
            color: '#fff', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-display)'
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
}

interface AddPlayerProps {
  onClick: () => void;
}

export function AddPlayerCard({ onClick }: AddPlayerProps) {
  return (
    <Box 
      onClick={onClick}
      sx={{
        width: 140,
        minWidth: 140,
        height: 200,
        cursor: 'pointer',
        border: '2px dashed rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: 'rgba(255, 255, 255, 0.02)',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'var(--nba-orange)',
          boxShadow: '0 0 15px rgba(255, 107, 0, 0.15)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box sx={{ 
        width: 44, 
        height: 44, 
        borderRadius: '50%', 
        bgcolor: 'rgba(255, 255, 255, 0.05)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <Typography sx={{ fontSize: '1.6rem', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 0, mt: -0.3 }}>+</Typography>
      </Box>
      <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Add Player</Typography>
      <Typography sx={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Press 1</Typography>
    </Box>
  );
}
