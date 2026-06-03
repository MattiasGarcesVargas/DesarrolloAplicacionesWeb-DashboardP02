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
}

export default function StatsTable({ onSelectPlayerByName, selectedTeam }: StatsTableProps) {
  // Prepopulated mock player list reflecting actual values in 2023_nba_player_stats.csv
  const dataset: PlayerRow[] = [
    { name: "Jayson Tatum", team: "BOS", age: 25, gp: 74, min: 36.9, pts: 30.1, reb: 8.8, ast: 4.6, fgPct: 46.6, threePct: 35.0, plusMinus: 470 },
    { name: "Joel Embiid", team: "PHI", age: 29, gp: 66, min: 34.6, pts: 33.1, reb: 10.2, ast: 4.2, fgPct: 54.8, threePct: 33.0, plusMinus: 424 },
    { name: "Luka Doncic", team: "DAL", age: 24, gp: 66, min: 36.2, pts: 32.4, reb: 8.6, ast: 8.0, fgPct: 49.6, threePct: 34.2, plusMinus: 128 },
    { name: "Shai Gilgeous-Alexander", team: "OKC", age: 24, gp: 68, min: 35.5, pts: 31.4, reb: 4.8, ast: 5.5, fgPct: 51.0, threePct: 34.5, plusMinus: 149 },
    { name: "Giannis Antetokounmpo", team: "MIL", age: 28, gp: 63, min: 32.1, pts: 31.1, reb: 11.8, ast: 5.7, fgPct: 55.3, threePct: 27.5, plusMinus: 341 },
    { name: "Anthony Edwards", team: "MIN", age: 21, gp: 79, min: 36.0, pts: 24.6, reb: 5.8, ast: 4.4, fgPct: 45.9, threePct: 36.9, plusMinus: 97 },
    { name: "Julius Randle", team: "NYK", age: 28, gp: 77, min: 35.5, pts: 25.1, reb: 10.0, ast: 4.1, fgPct: 45.9, threePct: 34.3, plusMinus: 170 },
    { name: "Donovan Mitchell", team: "CLE", age: 26, gp: 68, min: 35.8, pts: 28.3, reb: 4.3, ast: 4.4, fgPct: 48.4, threePct: 38.6, plusMinus: 338 },
    { name: "Trae Young", team: "ATL", age: 24, gp: 73, min: 34.8, pts: 26.2, reb: 3.0, ast: 10.2, fgPct: 42.9, threePct: 33.5, plusMinus: 100 },
    { name: "Zach LaVine", team: "CHI", age: 28, gp: 77, min: 35.9, pts: 24.8, reb: 4.5, ast: 4.2, fgPct: 48.5, threePct: 37.5, plusMinus: 18 }
  ];

  const filteredDataset = selectedTeam 
    ? dataset.filter(player => player.team === selectedTeam)
    : dataset;

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
