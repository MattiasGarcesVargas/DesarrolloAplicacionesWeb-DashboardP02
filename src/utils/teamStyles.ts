// Helper to assign team colors & gradients matching the 30 NBA teams
export interface TeamStyle {
  gradient: string;
  color: string;
}

export const getTeamStyle = (team: string): TeamStyle => {
  const teamStyles: Record<string, TeamStyle> = {
    BOS: { gradient: 'linear-gradient(135deg, #008348 0%, #0d5c34 100%)', color: '#008348' },
    CLE: { gradient: 'linear-gradient(135deg, #860038 0%, #4c0519 100%)', color: '#ec4899' },
    DAL: { gradient: 'linear-gradient(135deg, #00538c 0%, #1e3a8a 100%)', color: '#3b82f6' },
    DEN: { gradient: 'linear-gradient(135deg, #0e2240 0%, #fec524 100%)', color: '#fdb927' },
    GSW: { gradient: 'linear-gradient(135deg, #1d428a 0%, #ffc72c 100%)', color: '#ffc72c' },
    LAL: { gradient: 'linear-gradient(135deg, #552583 0%, #fdb927 100%)', color: '#fdb927' },
    MIA: { gradient: 'linear-gradient(135deg, #98002e 0%, #f9a01b 100%)', color: '#ef4444' },
    MIL: { gradient: 'linear-gradient(135deg, #00471b 0%, #eee1c6 100%)', color: '#10b981' },
    MIN: { gradient: 'linear-gradient(135deg, #0c2340 0%, #236192 100%)', color: '#10b981' },
    NYK: { gradient: 'linear-gradient(135deg, #006bb6 0%, #f58426 100%)', color: '#3b82f6' },
    PHI: { gradient: 'linear-gradient(135deg, #006bb6 0%, #ed174c 100%)', color: '#3b82f6' },
    PHX: { gradient: 'linear-gradient(135deg, #1d428a 0%, #e56020 100%)', color: '#eab308' },
    POR: { gradient: 'linear-gradient(135deg, #e03a3e 0%, #000000 100%)', color: '#ef4444' },
    SAC: { gradient: 'linear-gradient(135deg, #5a2d81 0%, #63727a 100%)', color: '#ec4899' },
    SAS: { gradient: 'linear-gradient(135deg, #c4ced4 0%, #000000 100%)', color: '#9ca3af' },
    TOR: { gradient: 'linear-gradient(135deg, #ce1141 0%, #000000 100%)', color: '#ef4444' },
    UTA: { gradient: 'linear-gradient(135deg, #002b49 0%, #f9a01b 100%)', color: '#eab308' },
    WAS: { gradient: 'linear-gradient(135deg, #002b5c 0%, #e31837 100%)', color: '#3b82f6' },
    ATL: { gradient: 'linear-gradient(135deg, #c1d32f 0%, #e03a3e 100%)', color: '#ef4444' },
    BKN: { gradient: 'linear-gradient(135deg, #000000 0%, #777777 100%)', color: '#9ca3af' },
    CHA: { gradient: 'linear-gradient(135deg, #1d1160 0%, #00788c 100%)', color: '#a855f7' },
    CHI: { gradient: 'linear-gradient(135deg, #ce1141 0%, #000000 100%)', color: '#ef4444' },
    DET: { gradient: 'linear-gradient(135deg, #1d428a 0%, #ed174c 100%)', color: '#ef4444' },
    HOU: { gradient: 'linear-gradient(135deg, #ce1141 0%, #000000 100%)', color: '#ef4444' },
    IND: { gradient: 'linear-gradient(135deg, #002d62 0%, #fdbb30 100%)', color: '#fdb927' },
    LAC: { gradient: 'linear-gradient(135deg, #c8102e 0%, #1d428a 100%)', color: '#3b82f6' },
    MEM: { gradient: 'linear-gradient(135deg, #5d76a9 0%, #12173f 100%)', color: '#3b82f6' },
    NOP: { gradient: 'linear-gradient(135deg, #0c2340 0%, #c8102e 100%)', color: '#eab308' },
    OKC: { gradient: 'linear-gradient(135deg, #007ac1 0%, #ef3b24 100%)', color: '#3b82f6' },
    ORL: { gradient: 'linear-gradient(135deg, #0077c0 0%, #c4ced4 100%)', color: '#3b82f6' }
  };
  return teamStyles[team] || { gradient: 'linear-gradient(135deg, #374151 0%, #111827 100%)', color: '#f58426' };
};
