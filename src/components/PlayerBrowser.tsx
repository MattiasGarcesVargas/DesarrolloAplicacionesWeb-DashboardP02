import { useState } from 'react';
import { Box, Typography, TextField, Chip, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface Player {
  id: string;
  name: string;
  rank: number;
  team: string;
}

interface PlayerBrowserProps {
  onSelectPlayerByName: (name: string) => void;
  selectedTeam: string | null;
  onSelectTeam: (team: string | null) => void;
  players: Player[];
}

export default function PlayerBrowser({ onSelectPlayerByName, selectedTeam, onSelectTeam, players }: PlayerBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const teams = [
    "ATL", "BKN", "BOS", "CHA", "CHI", "CLE", "DAL", "DEN", "DET", "GSW",
    "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK",
    "OKC", "ORL", "PHI", "PHX", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"
  ];

  // If there's a search query or a team filter, search across all players.
  // Otherwise, display the top 20 players as the default list.
  const basePlayers = (searchQuery || selectedTeam) ? players : players.slice(0, 20);

  const filteredRankings = basePlayers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = selectedTeam ? p.team === selectedTeam : true;
    return matchesSearch && matchesTeam;
  });

  return (
    <Box 
      className="glass-panel" 
      sx={{ 
        p: 2.5, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2.5,
        bgcolor: '#0a0d16',
        borderColor: 'rgba(255,255,255,0.06)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 800, 
            letterSpacing: '1px',
            color: '#fff',
            fontSize: '0.9rem',
            textTransform: 'uppercase'
          }}
        >
          🔍 BROWSER DE JUGADORES
        </Typography>
        <Typography variant="caption" sx={{ color: 'var(--nba-orange)', fontWeight: 700 }}>
          LIVE
        </Typography>
      </Box>

      {/* Search Bar - using MUI v9 slotProps for input adornments */}
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar jugador..."
        variant="outlined"
        size="small"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <span style={{ marginRight: 8, opacity: 0.6 }}>🔍</span>
            ),
          }
        }}
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            fontSize: '0.85rem',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--nba-orange)',
            },
          },
        }}
      />

      {/* Teams Grid Selector */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
            EQUIPOS
          </Typography>
          {selectedTeam && (
            <Typography 
              variant="caption" 
              onClick={() => onSelectTeam(null)}
              sx={{ color: 'var(--nba-orange)', fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              Limpiar
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
          {teams.map(team => {
            const isSelected = selectedTeam === team;
            return (
              <Chip
                key={team}
                label={team}
                size="small"
                onClick={() => onSelectTeam(isSelected ? null : team)}
                className="team-chip"
                sx={{
                  fontSize: '0.65rem',
                  height: 22,
                  bgcolor: isSelected ? 'var(--nba-orange)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${isSelected ? 'var(--nba-orange)' : 'rgba(255, 255, 255, 0.08)'}`,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: isSelected ? 'var(--nba-orange)' : 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Top DPM Player List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 200 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--text-secondary)', mb: 1 }}>
          TOP DPM (DARKO PROYECTADO)
        </Typography>
        <Box sx={{ overflowY: 'auto', flexGrow: 1, maxHeight: 350, pr: 0.5 }}>
          {filteredRankings.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'var(--text-muted)', py: 2, textAlign: 'center', fontSize: '0.8rem' }}>
              Ningún jugador coincide.
            </Typography>
          ) : (
            <List dense disablePadding>
              {filteredRankings.map((p) => (
                <ListItem key={p.rank} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton 
                    onClick={() => onSelectPlayerByName(p.name)}
                    sx={{
                      borderRadius: '6px',
                      py: 0.5,
                      px: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.01)',
                      border: '1px solid rgba(255,255,255,0.03)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.06)',
                        borderColor: 'rgba(255, 255, 255, 0.15)',
                      }
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'var(--nba-gold)', width: 22, fontSize: '0.8rem' }}>
                      {p.rank}.
                    </Typography>
                    <ListItemText 
                      primary={
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-sans)' }}>
                          {p.name}
                        </Typography>
                      }
                    />
                    <Chip 
                      label={p.team} 
                      size="small" 
                      sx={{ 
                        height: 16, 
                        fontSize: '0.55rem', 
                        bgcolor: 'rgba(255,255,255,0.05)', 
                        color: 'var(--text-secondary)',
                        fontWeight: 700,
                        border: '1px solid rgba(255,255,255,0.05)'
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
}
