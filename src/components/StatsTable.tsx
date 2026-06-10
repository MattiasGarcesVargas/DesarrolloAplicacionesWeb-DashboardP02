import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Chip } from '@mui/material';

interface PlayerRow {
  name: string;
  team: string;
  age: number;
  gp: number;
  min: number;
  pts: number;
  reb: number;
  ast: number;
  fgPct: number;
  threePct: number;
  plusMinus: number;
}

interface StatsTableProps {
  onSelectPlayerByName: (name: string) => void;
  selectedTeam: string | null;
  players: PlayerRow[];
}

export default function StatsTable({ onSelectPlayerByName, selectedTeam, players }: StatsTableProps) {
  const filteredDataset = selectedTeam 
    ? players.filter(player => player.team === selectedTeam)
    : players;

  return (
    <Box 
      className="glass-panel" 
      sx={{ 
        p: 2.5, 
        bgcolor: '#0a0d16',
        borderColor: 'rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 800, 
            color: '#fff',
            fontSize: '1rem'
          }}
        >
          🏀 LÍDERES DE ESTADÍSTICAS AVANZADAS
        </Typography>
        {selectedTeam && (
          <Chip 
            label={`Filtrado: ${selectedTeam}`} 
            size="small" 
            sx={{ bgcolor: 'rgba(255,107,0,0.15)', color: 'var(--nba-orange)', fontWeight: 700 }}
          />
        )}
      </Box>

      <TableContainer sx={{ maxHeight: 310, overflowY: 'auto', bgcolor: 'transparent' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: '#0d121f', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>PLAYER</TableCell>
              <TableCell sx={{ bgcolor: '#0d121f', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>TEAM</TableCell>
              <TableCell sx={{ bgcolor: '#0d121f', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }} align="right">GP</TableCell>
              <TableCell sx={{ bgcolor: '#0d121f', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }} align="right">MIN</TableCell>
              <TableCell sx={{ bgcolor: '#0d121f', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }} align="right">PTS</TableCell>
              <TableCell sx={{ bgcolor: '#0d121f', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }} align="right">REB</TableCell>
              <TableCell sx={{ bgcolor: '#0d121f', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }} align="right">AST</TableCell>
              <TableCell sx={{ bgcolor: '#0d121f', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }} align="right">FG%</TableCell>
              <TableCell sx={{ bgcolor: '#0d121f', color: 'var(--text-secondary)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }} align="right">+/-</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDataset.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ color: 'var(--text-muted)', py: 4 }}>
                  No hay datos para el equipo seleccionado.
                </TableCell>
              </TableRow>
            ) : (
              filteredDataset.map((row) => (
                <TableRow 
                  key={row.name}
                  hover
                  onClick={() => onSelectPlayerByName(row.name)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.03) !important'
                    },
                    '& td': {
                      borderColor: 'rgba(255,255,255,0.04)',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      py: 1
                    }
                  }}
                >
                  <TableCell sx={{ fontWeight: '700 !important', color: '#fff !important' }}>{row.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.team} 
                      size="small" 
                      sx={{ 
                        height: 18, 
                        fontSize: '0.6rem', 
                        fontWeight: 800, 
                        bgcolor: 'rgba(255,255,255,0.04)', 
                        color: 'var(--text-secondary)',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right">{row.gp}</TableCell>
                  <TableCell align="right">{row.min}</TableCell>
                  <TableCell align="right" sx={{ color: 'var(--nba-orange) !important', fontWeight: '700 !important' }}>{row.pts}</TableCell>
                  <TableCell align="right">{row.reb}</TableCell>
                  <TableCell align="right">{row.ast}</TableCell>
                  <TableCell align="right">{row.fgPct}%</TableCell>
                  <TableCell align="right" sx={{ color: row.plusMinus > 0 ? 'var(--nba-green) !important' : 'var(--nba-red) !important', fontWeight: '700 !important' }}>
                    {row.plusMinus > 0 ? `+${row.plusMinus}` : row.plusMinus}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
