import { Grid, Box, Typography, Container } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import { PlayerCard, AddPlayerCard } from './components/PlayerCard';
import PlayerBrowser from './components/PlayerBrowser';
import StatsChart from './components/StatsChart';
import StatsTable from './components/StatsTable';

interface PlayerData {
  id: string;
  name: string;
  rank: number;
  rating: string;
  team: string;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  gradient: string;
  color: string;
}

export default function AppEsqueleto() {
  // NBA Player dataset mockup reflecting the CSV stats
  const allPlayers: PlayerData[] = [
    { id: '1', name: 'Luka Doncic', rank: 6, rating: '+4.4', team: 'DAL', pts: 32.4, reb: 8.6, ast: 8.0, stl: 1.4, blk: 0.5, gradient: 'linear-gradient(135deg, #00538c 0%, #1e3a8a 100%)', color: '#3b82f6' },
    { id: '2', name: 'Donovan Mitchell', rank: 7, rating: '+3.9', team: 'CLE', pts: 28.3, reb: 4.3, ast: 4.4, stl: 1.5, blk: 0.4, gradient: 'linear-gradient(135deg, #860038 0%, #4c0519 100%)', color: '#ec4899' },
    { id: '3', name: 'Karl-Anthony Towns', rank: 8, rating: '+3.6', team: 'MIN', pts: 20.8, reb: 8.1, ast: 4.8, stl: 0.7, blk: 0.6, gradient: 'linear-gradient(135deg, #0c2340 0%, #061126 100%)', color: '#10b981' },
    { id: '4', name: 'Cade Cunningham', rank: 9, rating: '+3.6', team: 'DET', pts: 19.9, ast: 6.0, reb: 6.2, stl: 0.8, blk: 0.6, gradient: 'linear-gradient(135deg, #1d428a 0%, #ed174c 100%)', color: '#ef4444' },
    { id: '5', name: 'Anthony Edwards', rank: 10, rating: '+3.6', team: 'MIN', pts: 24.6, reb: 5.8, ast: 4.4, stl: 1.6, blk: 0.7, gradient: 'linear-gradient(135deg, #236192 0%, #0c2340 100%)', color: '#10b981' },
    { id: '6', name: 'O.G. Anunoby', rank: 11, rating: '+3.5', team: 'NYK', pts: 16.8, ast: 2.0, reb: 5.0, stl: 1.2, blk: 0.7, gradient: 'linear-gradient(135deg, #f58426 0%, #006bb6 100%)', color: '#f58426' },
    { id: '7', name: 'Jayson Tatum', rank: 12, rating: '+3.4', team: 'BOS', pts: 30.1, reb: 8.8, ast: 4.6, stl: 1.1, blk: 0.7, gradient: 'linear-gradient(135deg, #008348 0%, #0d5c34 100%)', color: '#008348' },
    { id: '8', name: 'Jalen Brunson', rank: 13, rating: '+3.3', team: 'NYK', pts: 24.0, ast: 6.2, reb: 3.5, stl: 0.9, blk: 0.2, gradient: 'linear-gradient(135deg, #006bb6 0%, #1e3a8a 100%)', color: '#3b82f6' },
    { id: '9', name: 'Kevin Durant', rank: 14, rating: '+3.2', team: 'PHX', pts: 29.1, ast: 5.0, reb: 6.7, stl: 0.7, blk: 1.4, gradient: 'linear-gradient(135deg, #1d428a 0%, #fdb927 100%)', color: '#eab308' }
  ];

  // Static pre-selected player IDs (no State, purely visual)
  const selectedPlayerIds: string[] = []; // No players selected on start

  // Static Alert Config
  const alertConfig = {
    description: "Éxito: Estructura del Dashboard de la NBA cargada. Se visualizan 540 registros de jugadores de la temporada 2023.",
    severity: "success" as 'success' | 'info' | 'warning'
  };

  const selectedPlayersData = allPlayers.filter(p => selectedPlayerIds.includes(p.id));

  // No-op handlers to keep the TS components happy, while being non-functional
  const handleNoOp = () => { };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'var(--bg-main)', pb: 8 }}>
      {/* 1. Encabezado */}
      <HeaderUI />

      <Container maxWidth="xl" sx={{ mt: 2, px: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} sx={{ justifyContent: "center", alignItems: "stretch" }}>

          {/* 2. Alertas */}
          <Grid size={{ xs: 12 }}>
            <AlertUI description={alertConfig.description} severity={alertConfig.severity} />
          </Grid>

          {/* 3. Selector & Sidebar (PlayerBrowser - Left side or Sidebar role) */}
          <Grid size={{ xs: 12, md: 3 }}>
            <PlayerBrowser
              onSelectPlayerByName={handleNoOp}
              selectedTeam={null}
              onSelectTeam={handleNoOp}
              players={[]}
            />
          </Grid>

          {/* 4. Indicadores (Horizontal player cards scroll carousel) */}
          <Grid size={{ xs: 12, md: 9 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  color: 'var(--text-secondary)',
                  letterSpacing: '1px',
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase'
                }}
              >
                🔥 JUGADORES CLAVE SELECCIONADOS
              </Typography>

              {/* Cards Carousel Area */}
              <Box className="scroll-carousel">
                {allPlayers.map((player) => (
                  <PlayerCard
                    key={player.id}
                    id={player.id}
                    name={player.name}
                    rank={player.rank}
                    rating={player.rating}
                    team={player.team}
                    gradient={player.gradient}
                    isSelected={selectedPlayerIds.includes(player.id)}
                    onClick={handleNoOp}
                  />
                ))}
                <AddPlayerCard onClick={handleNoOp} />
              </Box>
            </Box>

            {/* Charts & Tables Grid (Gráfico y Tabla) */}
            <Grid container spacing={3}>
              {/* 5. Gráfico (Comparison chart, hidden on xs, block on md+) */}
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <StatsChart selectedPlayers={selectedPlayersData} />
              </Grid>

              {/* 6. Tabla (Stats Table, hidden on xs, block on md+) */}
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <StatsTable onSelectPlayerByName={handleNoOp} selectedTeam={null} players={[]} />
              </Grid>
            </Grid>
          </Grid>

          {/* 7. Información adicional (Footer references/documentation links) */}
          <Grid size={{ xs: 12 }} sx={{ mt: 5 }}>
            <Box
              className="glass-panel"
              sx={{
                p: 3,
                bgcolor: 'rgba(10, 13, 22, 0.4)',
                borderColor: 'rgba(255, 255, 255, 0.04)',
                textAlign: 'left'
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--nba-orange)', mb: 1, fontFamily: 'var(--font-display)' }}>
                INFORMACIÓN Y FUENTE DE DATOS
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                  Dataset de referencia: <strong>2023_nba_player_stats.csv</strong>
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                  URL original: <a href="https://www.kaggle.com/" target="_blank" style={{ color: 'var(--nba-gold)', textDecoration: 'none' }}>kaggle.com/nba-stats-2023</a>
                </Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
