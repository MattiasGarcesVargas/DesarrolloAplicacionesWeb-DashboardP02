import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Container, CircularProgress } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import { PlayerCard, AddPlayerCard } from './components/PlayerCard';
import PlayerBrowser from './components/PlayerBrowser';
import StatsChart from './components/StatsChart';
import StatsTable from './components/StatsTable';
import { getTeamStyle } from './utils/teamStyles';
import type { PlayerData } from './types/player';

export default function App() {
  const [allPlayers, setAllPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>(['1', '2', '7']); // Preselected players
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [alertConfig, setAlertConfig] = useState({
    description: "Conectando a Firebase...",
    severity: "info" as 'success' | 'info' | 'warning'
  });

  // Fetch NBA Player stats from Firebase REST endpoint
  useEffect(() => {
    fetch('https://dashboard-2023nba-default-rtdb.firebaseio.com/data.json')
      .then(res => {
        if (!res.ok) throw new Error('Error al conectar con la base de datos de Firebase');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data
            .filter((p: any) => p && p.Column1 && p.Column1 !== "PName")
            .map((p: any, idx: number) => {
              const gp = Number(p.Column5) || 1;
              const pts = Number(p.Column9) || 0;
              const reb = Number(p.Column21) || 0;
              const ast = Number(p.Column22) || 0;
              const stl = Number(p.Column24) || 0;
              const blk = Number(p.Column25) || 0;
              const totalMin = Number(p.Column8) || 0;

              const team = p.Column3 || "N/A";
              const style = getTeamStyle(team);

              return {
                id: String(idx + 1),
                name: p.Column1,
                rank: idx + 1,
                position: p.Column2 || "",
                team: team,
                age: Number(p.Column4) || 0,
                gp: gp,
                min: Number((totalMin / gp).toFixed(1)),
                pts: Number((pts / gp).toFixed(1)),
                reb: Number((reb / gp).toFixed(1)),
                ast: Number((ast / gp).toFixed(1)),
                stl: Number((stl / gp).toFixed(1)),
                blk: Number((blk / gp).toFixed(1)),
                fgPct: Number(p.Column12) || 0,
                threePct: Number(p.Column15) || 0,
                plusMinus: Number(p.Column30) || 0,
                gradient: style.gradient,
                color: style.color,
                rating: Number(p.Column30) >= 0 ? `+${p.Column30}` : String(p.Column30)
              };
            });
          setAllPlayers(mapped);
          setAlertConfig({
            description: `Éxito: Se han cargado ${mapped.length} registros de jugadores en tiempo real desde Firebase. Haz clic en las tarjetas para comparar.`,
            severity: "success"
          });
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setAlertConfig({
          description: "Error: No se pudo conectar a Firebase. Por favor revisa tu conexión.",
          severity: "warning"
        });
        setLoading(false);
      });
  }, []);

  const handleTogglePlayer = (id: string) => {
    const player = allPlayers.find(p => p.id === id);
    if (!player) return;

    if (selectedPlayerIds.includes(id)) {
      setSelectedPlayerIds(prev => prev.filter(pId => pId !== id));
      setAlertConfig({
        description: `Info: Se removió a ${player.name} de la comparación.`,
        severity: "info"
      });
    } else {
      if (selectedPlayerIds.length >= 4) {
        setAlertConfig({
          description: "Advertencia: Puedes comparar un máximo de 4 jugadores a la vez.",
          severity: "warning"
        });
        return;
      }
      setSelectedPlayerIds(prev => [...prev, id]);
      setAlertConfig({
        description: `Seleccionado: ${player.name} (${player.team}) - Promedio de PTS: ${player.pts}, AST: ${player.ast}, REB: ${player.reb}`,
        severity: "success"
      });
    }
  };

  const handleSelectPlayerByName = (name: string) => {
    const player = allPlayers.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
    if (player) {
      if (!selectedPlayerIds.includes(player.id)) {
        handleTogglePlayer(player.id);
      } else {
        setAlertConfig({
          description: `Info: ${player.name} ya se encuentra seleccionado.`,
          severity: "info"
        });
      }
    } else {
      setAlertConfig({
        description: `Búsqueda: ${name} no se encuentra en el carrusel superior, pero está en la base de datos completa.`,
        severity: "info"
      });
    }
  };

  const handleAddNextPlayer = () => {
    const unselected = allPlayers.find(p => !selectedPlayerIds.includes(p.id));
    if (unselected) {
      handleTogglePlayer(unselected.id);
    } else {
      setAlertConfig({
        description: "Advertencia: Todos los jugadores de demostración ya han sido agregados.",
        severity: "warning"
      });
    }
  };

  const selectedPlayersData = allPlayers.filter(p => selectedPlayerIds.includes(p.id));

  // Show top 10 players + any selected player in the carousel
  const carouselPlayers = allPlayers.filter((p, idx) => idx < 10 || selectedPlayerIds.includes(p.id));

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'var(--bg-main)', pb: 8 }}>
      {/* 1. Encabezado */}
      <HeaderUI />

      <Container maxWidth="xl" sx={{ mt: 2, px: { xs: 2, md: 4 } }}>
        {loading ? (
          <Grid container spacing={4} sx={{ justifyContent: "center", alignItems: "center", minHeight: 400 }}>
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                className="glass-panel"
                sx={{
                  p: 5,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  bgcolor: '#0a0d16',
                  borderColor: 'rgba(255,255,255,0.06)'
                }}
              >
                <CircularProgress sx={{ color: 'var(--nba-orange)' }} />
                <Typography sx={{ color: '#fff', fontWeight: 600, fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>
                  CONECTANDO A FIREBASE DATABASE...
                </Typography>
                <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  Cargando estadísticas en tiempo real de la temporada de la NBA
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={4} sx={{ justifyContent: "center", alignItems: "stretch" }}>
            {/* 2. Alertas */}
            <Grid size={{ xs: 12 }}>
              <AlertUI description={alertConfig.description} severity={alertConfig.severity} />
            </Grid>

            {/* 3. Selector & Sidebar (PlayerBrowser) */}
            <Grid size={{ xs: 12, md: 3 }}>
              <PlayerBrowser
                onSelectPlayerByName={handleSelectPlayerByName}
                selectedTeam={selectedTeam}
                onSelectTeam={setSelectedTeam}
                players={allPlayers}
              />
            </Grid>

            {/* 4. Indicadores (Horizontal player cards scroll carousel & comparison layout) */}
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
                  {carouselPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      id={player.id}
                      name={player.name}
                      rank={player.rank}
                      rating={player.rating}
                      team={player.team}
                      gradient={player.gradient}
                      isSelected={selectedPlayerIds.includes(player.id)}
                      onClick={() => handleTogglePlayer(player.id)}
                    />
                  ))}
                  <AddPlayerCard onClick={handleAddNextPlayer} />
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
                  <StatsTable
                    onSelectPlayerByName={handleSelectPlayerByName}
                    selectedTeam={selectedTeam}
                    players={allPlayers}
                  />
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
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 1.5, fontSize: '0.85rem' }}>
                  Este dashboard consume estadísticas en tiempo real desde la base de datos de Firebase Realtime Database.
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                    Fuente en la Nube: <strong>Firebase Realtime Database</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                    Dataset Original: <a href="https://www.kaggle.com/" target="_blank" style={{ color: 'var(--nba-gold)', textDecoration: 'none' }}>2023_nba_player_stats (Kaggle)</a>
                  </Typography>
                </Box>
              </Box>
            </Grid>

          </Grid>
        )}
      </Container>
    </Box>
  );
}

