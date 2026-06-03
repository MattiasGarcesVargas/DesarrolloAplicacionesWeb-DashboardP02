import { useState } from 'react';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';

interface PlayerData {
  id: string;
  name: string;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  color: string;
}

interface StatsChartProps {
  selectedPlayers: PlayerData[];
}

export default function StatsChart({ selectedPlayers }: StatsChartProps) {
  const [activeMetric, setActiveMetric] = useState<'comparison' | 'pts' | 'ast' | 'reb'>('comparison');

  const categories = [
    { key: 'pts', label: 'PTS', max: 35 },
    { key: 'reb', label: 'REB', max: 12 },
    { key: 'ast', label: 'AST', max: 10 },
    { key: 'stl', label: 'STL', max: 3.0 },
    { key: 'blk', label: 'BLK', max: 3.0 }
  ];

  if (selectedPlayers.length === 0) {
    return (
      <Box 
        className="glass-panel" 
        sx={{ 
          p: 3, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: 300,
          bgcolor: '#0a0d16',
          borderColor: 'rgba(255,255,255,0.06)'
        }}
      >
        <Typography sx={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: 600, mb: 1 }}>
          🏀 Comparación de Estadísticas
        </Typography>
        <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
          Selecciona jugadores del carrusel superior o del panel de navegación para ver sus métricas de rendimiento avanzadas.
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      className="glass-panel" 
      sx={{ 
        p: 3, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        bgcolor: '#0a0d16',
        borderColor: 'rgba(255,255,255,0.06)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 800, 
              color: '#fff',
              fontSize: '1rem'
            }}
          >
            📊 COMPARACIÓN DE RENDIMIENTO
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
            Estadísticas por partido
          </Typography>
        </Box>
        <ButtonGroup size="small" sx={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <Button 
            onClick={() => setActiveMetric('comparison')}
            sx={{ 
              color: activeMetric === 'comparison' ? '#fff' : 'var(--text-secondary)',
              bgcolor: activeMetric === 'comparison' ? 'rgba(255,107,0,0.1)' : 'transparent',
              borderColor: 'rgba(255,255,255,0.08) !important',
              fontWeight: 600,
              fontSize: '0.75rem',
              textTransform: 'none'
            }}
          >
            Categorías
          </Button>
          <Button 
            onClick={() => setActiveMetric('pts')}
            sx={{ 
              color: activeMetric === 'pts' ? '#fff' : 'var(--text-secondary)',
              bgcolor: activeMetric === 'pts' ? 'rgba(255,107,0,0.1)' : 'transparent',
              borderColor: 'rgba(255,255,255,0.08) !important',
              fontWeight: 600,
              fontSize: '0.75rem',
              textTransform: 'none'
            }}
          >
            PTS
          </Button>
        </ButtonGroup>
      </Box>

      {/* SVG Responsive Chart Container */}
      <Box sx={{ width: '100%', height: 230, position: 'relative', mt: 1 }}>
        <svg width="100%" height="100%" viewBox="0 0 500 220" preserveAspectRatio="none">
          {/* Horizontal Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = 20 + ratio * 150;
            return (
              <g key={idx}>
                <line x1="40" y1={y} x2="480" y2={y} stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3,3" />
                <text x="15" y={y + 4} fill="var(--text-muted)" fontSize="9" textAnchor="middle">
                  {Math.round((1 - ratio) * 35)}
                </text>
              </g>
            );
          })}

          {/* Bar rendering */}
          {categories.map((cat, catIdx) => {
            const xCenter = 70 + catIdx * 90; // Category centers
            const playersCount = selectedPlayers.length;
            const barWidth = Math.min(16, 45 / playersCount);
            const totalGroupWidth = playersCount * barWidth + (playersCount - 1) * 3;
            const startX = xCenter - totalGroupWidth / 2;

            return (
              <g key={cat.key}>
                {/* Category name below chart */}
                <text x={xCenter} y="195" fill="var(--text-secondary)" fontSize="11" fontWeight="700" textAnchor="middle">
                  {cat.label}
                </text>

                {/* Render bars for each player in this category */}
                {selectedPlayers.map((player, pIdx) => {
                  const val = player[cat.key as keyof PlayerData] as number;
                  const ratio = Math.min(1.0, val / cat.max);
                  const barHeight = ratio * 150;
                  const bx = startX + pIdx * (barWidth + 3);
                  const by = 170 - barHeight;

                  return (
                    <g key={player.id}>
                      {/* Bar body */}
                      <rect 
                        x={bx} 
                        y={by} 
                        width={barWidth} 
                        height={barHeight} 
                        fill={player.color} 
                        rx="3"
                        style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.05))' }}
                      />
                      
                      {/* Glowing overlay if hovered/selected */}
                      <rect 
                        x={bx} 
                        y={by} 
                        width={barWidth} 
                        height={barHeight} 
                        fill="url(#barGlow)" 
                        opacity="0.15"
                      />

                      {/* Tooltip value on top of bar */}
                      <text x={bx + barWidth/2} y={by - 5} fill="#fff" fontSize="9" fontWeight="700" textAnchor="middle">
                        {val}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Define linear gradient glows */}
          <defs>
            <linearGradient id="barGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', pt: 1.5 }}>
        {selectedPlayers.map(player => (
          <Box key={player.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: player.color }} />
            <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600 }}>
              {player.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
