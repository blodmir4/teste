<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIR4 - Presença SCALT SA21</title>
    <meta name="description" content="Controle de presença do clã SCALT no MIR4 - Servidor SA21">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* ========================================
           DESIGN SYSTEM - CORES E VARIÁVEIS
           ======================================== */
        :root {
            --bg-primary: #f0f4f8;
            --bg-secondary: #e2e8f0;
            --bg-card: #ffffff;
            --bg-card-hover: #f7fafc;
            --bg-table-header: #1e293b;
            --bg-table-row: #ffffff;
            --bg-table-row-alt: #f8fafc;

            --accent-primary: #6366f1;
            --accent-light: #818cf8;
            --accent-dark: #4f46e5;
            --accent-glow: rgba(99, 102, 241, 0.2);

            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --text-muted: #94a3b8;
            --text-on-dark: #f1f5f9;

            --green-high: #10b981;
            --green-high-bg: rgba(16, 185, 129, 0.12);
            --green-mid: #34d399;
            --yellow: #f59e0b;
            --yellow-bg: rgba(245, 158, 11, 0.12);
            --orange: #f97316;
            --orange-bg: rgba(249, 115, 22, 0.12);
            --red: #ef4444;
            --red-bg: rgba(239, 68, 68, 0.1);
            --blue: #3b82f6;
            --cyan: #06b6d4;
            --purple: #8b5cf6;
            --pink: #ec4899;
            --teal: #14b8a6;

            --border: #e2e8f0;
            --border-accent: rgba(99, 102, 241, 0.25);

            --shadow-soft: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
            --shadow-card: 0 4px 16px rgba(0, 0, 0, 0.08);
            --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.1);

            --font-display: 'Nunito', sans-serif;
            --font-body: 'Quicksand', sans-serif;

            --radius: 16px;
            --radius-sm: 10px;
        }

        /* ========================================
           RESET E BASE
           ======================================== */
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: var(--font-body);
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
        }

        /* ========================================
           HERO BANNER
           ======================================== */
        .hero {
            position: relative;
            height: 280px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 30%, #ec4899 60%, #f97316 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
        }

        .hero::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(to bottom, transparent, var(--bg-primary));
        }

        .hero-content {
            position: relative;
            z-index: 1;
        }

        .hero h1 {
            font-family: var(--font-display);
            font-size: 3.2rem;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
            letter-spacing: 3px;
            text-transform: uppercase;
        }

        .hero .subtitle {
            font-family: var(--font-body);
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.85);
            margin-top: 8px;
            font-weight: 600;
            letter-spacing: 4px;
            text-transform: uppercase;
        }

        /* ========================================
           LAYOUT
           ======================================== */
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* ========================================
           STATS BAR
           ======================================== */
        .stats-bar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin: -40px auto 40px;
            position: relative;
            z-index: 2;
        }

        .stat-card {
            background: var(--bg-card);
            border: none;
            border-radius: var(--radius);
            padding: 20px 20px;
            text-align: center;
            box-shadow: var(--shadow-card);
            transition: transform 0.25s, box-shadow 0.25s;
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
        }

        .stat-card:nth-child(1)::before { background: linear-gradient(90deg, #6366f1, #818cf8); }
        .stat-card:nth-child(2)::before { background: linear-gradient(90deg, #10b981, #34d399); }
        .stat-card:nth-child(3)::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
        .stat-card:nth-child(4)::before { background: linear-gradient(90deg, #ec4899, #f472b6); }
        .stat-card:nth-child(5)::before { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
        .stat-card:nth-child(6)::before { background: linear-gradient(90deg, #06b6d4, #22d3ee); }

        .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }

        .stat-card .stat-value {
            font-family: var(--font-display);
            font-size: 2.2rem;
            font-weight: 900;
            color: var(--text-primary);
        }

        .stat-card:nth-child(1) .stat-value { color: #6366f1; }
        .stat-card:nth-child(2) .stat-value { color: #10b981; }
        .stat-card:nth-child(3) .stat-value { color: #f59e0b; }
        .stat-card:nth-child(4) .stat-value { color: #ec4899; }
        .stat-card:nth-child(5) .stat-value { color: #8b5cf6; }
        .stat-card:nth-child(6) .stat-value { color: #06b6d4; }

        .stat-card .stat-label {
            font-size: 0.8rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-top: 4px;
            font-weight: 600;
        }

        /* ========================================
           SEÇÕES
           ======================================== */
        .section {
            margin-bottom: 48px;
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 3px solid var(--border);
        }

        .section-header h2 {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--text-primary);
        }

        .section-header .badge {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: #fff;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* ========================================
           TABELA DE PRESENÇA
           ======================================== */
        .table-wrapper {
            overflow-x: auto;
            border-radius: var(--radius);
            box-shadow: var(--shadow-card);
            background: var(--bg-card);
        }

        .table-wrapper::-webkit-scrollbar {
            height: 8px;
        }

        .table-wrapper::-webkit-scrollbar-track {
            background: var(--bg-secondary);
            border-radius: 4px;
        }

        .table-wrapper::-webkit-scrollbar-thumb {
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            border-radius: 4px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85rem;
        }

        table thead th {
            background: var(--bg-table-header);
            color: #ffffff;
            font-family: var(--font-display);
            font-weight: 700;
            padding: 12px 8px;
            text-align: center;
            border-bottom: none;
            white-space: nowrap;
            position: sticky;
            top: 0;
            z-index: 10;
        }

        table thead th.day-header {
            font-size: 0.85rem;
            letter-spacing: 1px;
            border-left: 2px solid rgba(255,255,255,0.1);
        }

        table thead th.time-header {
            font-size: 0.7rem;
            color: rgba(255,255,255,0.6);
            font-family: var(--font-body);
            padding: 6px 4px;
            background: #334155;
        }

        table thead th.nickname-header {
            text-align: left;
            padding-left: 16px;
            min-width: 160px;
            position: sticky;
            left: 0;
            z-index: 11;
            background: var(--bg-table-header);
        }

        table tbody td {
            padding: 8px 6px;
            text-align: center;
            border-bottom: 1px solid var(--border);
            transition: background 0.15s;
        }

        table tbody tr:nth-child(even) td {
            background: var(--bg-table-row-alt);
        }

        table tbody tr:nth-child(odd) td {
            background: var(--bg-table-row);
        }

        table tbody tr:hover td {
            background: #ede9fe;
        }

        table tbody td.nickname-cell {
            text-align: left;
            padding-left: 16px;
            font-weight: 700;
            color: var(--text-primary);
            white-space: nowrap;
            position: sticky;
            left: 0;
            z-index: 5;
            font-family: var(--font-display);
        }

        table tbody tr:nth-child(even) td.nickname-cell {
            background: var(--bg-table-row-alt);
        }

        table tbody tr:nth-child(odd) td.nickname-cell {
            background: var(--bg-table-row);
        }

        table tbody tr:hover td.nickname-cell {
            background: #ede9fe;
        }

        /* Presença colorida na tabela */
        .check { 
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #10b981, #34d399);
            color: #fff; 
            font-size: 0.75rem;
            font-weight: 800;
            box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
        }
        .cross { 
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #f1f5f9;
            color: #cbd5e1; 
            font-size: 0.65rem;
        }

        td.total-cell {
            font-weight: 800;
            font-size: 0.95rem;
            font-family: var(--font-display);
        }

        /* Cores do total baseadas na presença */
        .total-high { color: #10b981; }
        .total-mid { color: #f59e0b; }
        .total-low { color: #f97316; }
        .total-zero { color: #ef4444; }

        /* Cores do nickname baseadas na presença */
        .nick-high { color: #059669; }
        .nick-mid { color: #d97706; }
        .nick-low { color: #ea580c; }
        .nick-zero { color: #dc2626; }

        /* Row coloring by presence */
        tr.row-high td { background: rgba(16, 185, 129, 0.06) !important; }
        tr.row-high:hover td { background: rgba(16, 185, 129, 0.12) !important; }
        tr.row-mid td { background: rgba(245, 158, 11, 0.05) !important; }
        tr.row-mid:hover td { background: rgba(245, 158, 11, 0.1) !important; }
        tr.row-low td { background: rgba(249, 115, 22, 0.04) !important; }
        tr.row-low:hover td { background: rgba(249, 115, 22, 0.08) !important; }
        tr.row-zero td { background: rgba(239, 68, 68, 0.03) !important; }
        tr.row-zero:hover td { background: rgba(239, 68, 68, 0.06) !important; }

        tr.row-high td.nickname-cell { background: rgba(16, 185, 129, 0.06) !important; }
        tr.row-mid td.nickname-cell { background: rgba(245, 158, 11, 0.05) !important; }
        tr.row-low td.nickname-cell { background: rgba(249, 115, 22, 0.04) !important; }
        tr.row-zero td.nickname-cell { background: rgba(239, 68, 68, 0.03) !important; }

        /* ========================================
           GRÁFICOS
           ======================================== */
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }

        .chart-card {
            background: var(--bg-card);
            border: none;
            border-radius: var(--radius);
            padding: 24px;
            box-shadow: var(--shadow-card);
        }

        .chart-card h3 {
            font-family: var(--font-display);
            color: var(--text-primary);
            font-size: 1.1rem;
            font-weight: 800;
            margin-bottom: 16px;
        }

        .chart-card canvas {
            width: 100% !important;
            max-height: 350px;
        }

        /* ========================================
           RANKING
           ======================================== */
        .ranking-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 12px;
        }

        .ranking-item {
            display: flex;
            align-items: center;
            gap: 12px;
            background: var(--bg-card);
            border: none;
            border-radius: var(--radius-sm);
            padding: 14px 18px;
            box-shadow: var(--shadow-soft);
            transition: transform 0.2s, box-shadow 0.2s;
            border-left: 4px solid transparent;
        }

        .ranking-item:hover {
            transform: translateX(4px);
            box-shadow: var(--shadow-card);
        }

        .ranking-item .rank {
            font-family: var(--font-display);
            font-size: 1.3rem;
            font-weight: 900;
            color: var(--text-muted);
            min-width: 36px;
            text-align: center;
        }

        .ranking-item:nth-child(1) { border-left-color: #fbbf24; background: linear-gradient(90deg, rgba(251,191,36,0.08), transparent); }
        .ranking-item:nth-child(1) .rank { color: #f59e0b; }
        .ranking-item:nth-child(2) { border-left-color: #94a3b8; background: linear-gradient(90deg, rgba(148,163,184,0.08), transparent); }
        .ranking-item:nth-child(2) .rank { color: #64748b; }
        .ranking-item:nth-child(3) { border-left-color: #d97706; background: linear-gradient(90deg, rgba(217,119,6,0.08), transparent); }
        .ranking-item:nth-child(3) .rank { color: #d97706; }

        .ranking-item .player-info {
            flex: 1;
        }

        .ranking-item .player-name {
            font-weight: 700;
            font-size: 1rem;
            font-family: var(--font-display);
        }

        .ranking-item .player-stats {
            font-size: 0.8rem;
            color: var(--text-secondary);
            font-weight: 500;
        }

        .ranking-item .presence-bar {
            width: 90px;
            height: 8px;
            background: var(--bg-secondary);
            border-radius: 4px;
            overflow: hidden;
        }

        .ranking-item .presence-bar .fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.6s ease;
        }

        .ranking-item .presence-pct {
            font-family: var(--font-display);
            font-size: 1rem;
            font-weight: 800;
            min-width: 50px;
            text-align: right;
        }

        /* ========================================
           FOOTER
           ======================================== */
        footer {
            text-align: center;
            padding: 40px 20px;
            border-top: 2px solid var(--border);
            color: var(--text-secondary);
            font-size: 0.85rem;
            font-weight: 500;
        }

        footer .clan-name {
            font-family: var(--font-display);
            font-weight: 800;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 1.2rem;
            margin-bottom: 4px;
        }

        /* ========================================
           RESPONSIVO
           ======================================== */
        @media (max-width: 768px) {
            .hero { height: 220px; }
            .hero h1 { font-size: 2rem; letter-spacing: 2px; }
            .hero .subtitle { font-size: 0.9rem; letter-spacing: 3px; }
            .stats-bar { grid-template-columns: repeat(2, 1fr); margin-top: -30px; }
            .charts-grid { grid-template-columns: 1fr; }
            .ranking-grid { grid-template-columns: 1fr; }
            .stat-card .stat-value { font-size: 1.6rem; }
        }
    </style>
</head>
<body>

    <!-- ========================================
         HERO BANNER
         ======================================== -->
    <header class="hero">
        <div class="hero-content">
            <h1>SCALT</h1>
            <p class="subtitle">Controle de Presença — SA21</p>
        </div>
    </header>

    <main class="container">

        <!-- ========================================
             STATS RESUMO (gerado via JS)
             ======================================== -->
        <div class="stats-bar" id="statsBar"></div>

        <!-- ========================================
             GRÁFICOS
             ======================================== -->
        <section class="section">
            <div class="section-header">
                <h2>Gráficos</h2>
                <span class="badge">Análise Visual</span>
            </div>
            <div class="charts-grid">
                <div class="chart-card">
                    <h3>Presença por Dia da Semana</h3>
                    <canvas id="chartDia"></canvas>
                </div>
                <div class="chart-card">
                    <h3>Presença por Horário</h3>
                    <canvas id="chartHorario"></canvas>
                </div>
                <div class="chart-card">
                    <h3>Top 10 — Mais Presentes</h3>
                    <canvas id="chartTop10"></canvas>
                </div>
                <div class="chart-card">
                    <h3>Distribuição de Presenças</h3>
                    <canvas id="chartDistribuicao"></canvas>
                </div>
            </div>
        </section>

        <!-- ========================================
             RANKING DE PRESENÇA
             ======================================== -->
        <section class="section">
            <div class="section-header">
                <h2>Ranking de Presença</h2>
                <span class="badge">Semanal</span>
            </div>
            <div class="ranking-grid" id="rankingGrid"></div>
        </section>

        <!-- ========================================
             TABELA COMPLETA DE PRESENÇA
             ======================================== -->
        <section class="section">
            <div class="section-header">
                <h2>Tabela de Presença</h2>
                <span class="badge">Detalhada</span>
            </div>
            <div class="table-wrapper" id="tableWrapper"></div>
        </section>

    </main>

    <footer>
        <p class="clan-name">SCALT — MIR4 SA21</p>
        <p>Atualizado semanalmente • Semana 02/02 a 08/02/2026</p>
    </footer>

    <script>
    /* ==========================================================================
       ███████╗██████╗  █████╗  ██████╗ ██████╗     ██████╗ ███████╗
       ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔═══██╗    ██╔══██╗██╔════╝
       █████╗  ███████║███████║██║     ██║   ██║    ██║  ██║█████╗
       ██╔══╝  ██╔═══╝██╔══██║██║     ██║   ██║    ██║  ██║██╔══╝
       ███████╗██║     ██║  ██║╚██████╗╚██████╔╝    ██████╔╝███████╗
       ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝     ╚═════╝ ╚══════╝
       
       EDIÇÃO DE DADOS
       ============================================================================
       
       Para atualizar os dados do site, edite SOMENTE a seção abaixo.
       Cada jogador tem TRUE (presente) ou FALSE (ausente) para cada horário.
       Os dias são: SEG, TER, QUA, QUI, SEX, SAB, DOM
       Os horários são: 10H, 12H, 20H, 22H, 00H
       
       ========================================================================== */

    const DIAS = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO", "DOMINGO"];
    const HORARIOS = ["10H", "12H", "20H", "22H", "00H"];

    // ╔══════════════════════════════════════════════════════════════╗
    // ║  DADOS DOS JOGADORES — EDITE AQUI                          ║
    // ║  Formato: { nome: "Nick", presenca: [SEG, TER, ...] }      ║
    // ║  Cada dia = [10H, 12H, 20H, 22H, 00H] (true/false)        ║
    // ╚══════════════════════════════════════════════════════════════╝

    const JOGADORES = [
        {
            nome: "SENIOR96",
            presenca: [
                [true,  false, false, false, false],  // SEGUNDA
                [true,  false, true,  true,  true ],  // TERÇA
                [false, false, true,  false, true ],  // QUARTA
                [true,  true,  false, false, false],  // QUINTA
                [false, false, true,  true,  false],  // SEXTA
                [false, false, false, false, false],  // SÁBADO
                [false, false, false, false, false],  // DOMINGO
            ]
        },
        {
            nome: "EXO 丶Rayvèn",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, true,  true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Wedeed",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "glauber",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "pixie",
            presenca: [
                [false, false, false, false, false],
                [false, false, true,  false, false],
                [false, false, true,  false, false],
                [false, false, false, true,  false],
                [false, false, true,  true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Rebel Byob",
            presenca: [
                [false, false, false, false, false],
                [false, false, true,  true,  true ],
                [false, false, true,  false, false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Psychodavid",
            presenca: [
                [false, true,  false, false, false],
                [true,  false, false, true,  true ],
                [true,  false, true,  false, true ],
                [false, false, true,  true,  false],
                [true,  false, true,  false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Siwel",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "bloodcross",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [true,  false, true,  true,  false],
                [true,  true,  false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Euphoria",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "andersong30",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, true,  true ],
                [false, false, false, true,  false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "LunadeLuz",
            presenca: [
                [true,  false, false, false, false],
                [true,  false, false, false, false],
                [true,  false, false, false, false],
                [true,  false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "77 thung",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, true,  true,  false],
                [true,  false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Pescadora",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "pujone",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, true ],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "elfo",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "laetshin",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, true ],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "picador",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, true ],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Lutien",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Luffy",
            presenca: [
                [false, false, false, false, false],
                [false, false, true,  true,  false],
                [false, false, false, false, false],
                [false, false, true,  true,  false],
                [false, false, true,  false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "thago",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Violeta",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, true ],
                [false, false, false, false, false],
                [false, false, false, true,  false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "vladesko",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, true,  true ],
                [true,  false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "shotlove",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Chaos Sunny",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, true ],
                [false, false, false, false, false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Tuero",
            presenca: [
                [true,  false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Rey Bye",
            presenca: [
                [true,  false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "77REAPERWins",
            presenca: [
                [false, false, false, false, false],
                [false, false, true,  false, false],
                [false, false, true,  false, true ],
                [false, false, true,  false, false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Adonis 333",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, true,  true ],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "ivanvulman",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, true,  true ],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "VenManCo",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, true ],
                [false, false, false, false, false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "CMPUNK",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, true ],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "jeonyeon",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [true,  false, true,  false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Rhovania",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true,  true ],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Soleyi",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true,  false],
                [false, false, false, true,  false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "bumbum",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [true,  true,  false, true,  false],
                [true,  true,  false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "Diana Rivera",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, true,  false, false],
                [false, false, true,  false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
        {
            nome: "VKS",
            presenca: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, true,  false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]
        },
    ];

    // ╔══════════════════════════════════════════════════════════════╗
    // ║  FIM DA ÁREA DE EDIÇÃO DE DADOS                            ║
    // ╚══════════════════════════════════════════════════════════════╝


    /* ==========================================================================
       FUNÇÕES AUXILIARES — NÃO PRECISA EDITAR ABAIXO
       ========================================================================== */

    // Calcula total de presenças de um jogador
    function totalPresenca(jogador) {
        return jogador.presenca.flat().filter(Boolean).length;
    }

    // Calcula total máximo possível
    const MAX_PRESENCAS = DIAS.length * HORARIOS.length; // 35

    // Total de presenças por dia
    function presencasPorDia() {
        return DIAS.map((_, dIdx) =>
            JOGADORES.reduce((sum, j) =>
                sum + j.presenca[dIdx].filter(Boolean).length, 0
            )
        );
    }

    // Total de presenças por horário
    function presencasPorHorario() {
        return HORARIOS.map((_, hIdx) =>
            JOGADORES.reduce((sum, j) =>
                sum + j.presenca.reduce((s, dia) => s + (dia[hIdx] ? 1 : 0), 0), 0
            )
        );
    }

    // Jogadores ativos (pelo menos 1 presença)
    function jogadoresAtivos() {
        return JOGADORES.filter(j => totalPresenca(j) > 0);
    }

    /* ==========================================================================
       RENDERIZAR STATS BAR
       ========================================================================== */
    function renderStats() {
        const totalGeral = JOGADORES.reduce((s, j) => s + totalPresenca(j), 0);
        const ativos = jogadoresAtivos().length;
        const mediaPresenca = ativos > 0 ? (totalGeral / ativos).toFixed(1) : 0;
        const melhorDia = DIAS[presencasPorDia().indexOf(Math.max(...presencasPorDia()))];
        const melhorHora = HORARIOS[presencasPorHorario().indexOf(Math.max(...presencasPorHorario()))];

        document.getElementById('statsBar').innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${JOGADORES.length}</div>
                <div class="stat-label">Membros</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${ativos}</div>
                <div class="stat-label">Ativos</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${totalGeral}</div>
                <div class="stat-label">Presenças Totais</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${mediaPresenca}</div>
                <div class="stat-label">Média por Ativo</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${melhorDia.slice(0,3)}</div>
                <div class="stat-label">Melhor Dia</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${melhorHora}</div>
                <div class="stat-label">Melhor Horário</div>
            </div>
        `;
    }

    /* ==========================================================================
       RENDERIZAR TABELA
       ========================================================================== */
    function getPresenceClass(total) {
        const pct = total / MAX_PRESENCAS * 100;
        if (pct >= 20) return 'high';
        if (pct >= 10) return 'mid';
        if (pct > 0) return 'low';
        return 'zero';
    }

    function getPresenceColor(total) {
        const cls = getPresenceClass(total);
        if (cls === 'high') return '#10b981';
        if (cls === 'mid') return '#f59e0b';
        if (cls === 'low') return '#f97316';
        return '#ef4444';
    }

    function getBarGradient(total) {
        const cls = getPresenceClass(total);
        if (cls === 'high') return 'linear-gradient(90deg, #10b981, #34d399)';
        if (cls === 'mid') return 'linear-gradient(90deg, #f59e0b, #fbbf24)';
        if (cls === 'low') return 'linear-gradient(90deg, #f97316, #fb923c)';
        return 'linear-gradient(90deg, #ef4444, #f87171)';
    }

    function renderTable() {
        const jogadoresAtivosLista = JOGADORES.filter(j => totalPresenca(j) > 0)
            .sort((a, b) => totalPresenca(b) - totalPresenca(a));
        const jogadoresInativos = JOGADORES.filter(j => totalPresenca(j) === 0)
            .sort((a, b) => a.nome.localeCompare(b.nome));
        const sorted = [...jogadoresAtivosLista, ...jogadoresInativos];

        let html = '<table>';
        
        // Header - Dias
        html += '<thead><tr><th class="nickname-header" rowspan="2">Jogador</th><th rowspan="2">Total</th>';
        DIAS.forEach((dia, i) => {
            html += `<th class="day-header" colspan="${HORARIOS.length}">${dia}</th>`;
        });
        html += '</tr><tr>';
        
        // Header - Horários
        DIAS.forEach(() => {
            HORARIOS.forEach(h => {
                html += `<th class="time-header">${h}</th>`;
            });
        });
        html += '</tr></thead>';

        // Body
        html += '<tbody>';
        sorted.forEach(jogador => {
            const total = totalPresenca(jogador);
            const cls = getPresenceClass(total);
            html += `<tr class="row-${cls}">`;
            html += `<td class="nickname-cell nick-${cls}">${jogador.nome}</td>`;
            html += `<td class="total-cell total-${cls}">${total}</td>`;
            jogador.presenca.forEach(dia => {
                dia.forEach(presente => {
                    html += `<td>${presente ? '<span class="check">✓</span>' : '<span class="cross">·</span>'}</td>`;
                });
            });
            html += '</tr>';
        });
        html += '</tbody></table>';

        document.getElementById('tableWrapper').innerHTML = html;
    }

    /* ==========================================================================
       RENDERIZAR RANKING
       ========================================================================== */
    function renderRanking() {
        const sorted = [...JOGADORES]
            .map(j => ({ ...j, total: totalPresenca(j) }))
            .sort((a, b) => b.total - a.total);

        document.getElementById('rankingGrid').innerHTML = sorted.map((j, i) => {
            const color = getPresenceColor(j.total);
            const gradient = getBarGradient(j.total);
            return `
            <div class="ranking-item">
                <span class="rank">${i + 1}°</span>
                <div class="player-info">
                    <div class="player-name" style="color: ${color}">${j.nome}</div>
                    <div class="player-stats">${j.total} de ${MAX_PRESENCAS} slots</div>
                </div>
                <div class="presence-bar">
                    <div class="fill" style="width: ${(j.total / MAX_PRESENCAS * 100)}%; background: ${gradient}"></div>
                </div>
                <span class="presence-pct" style="color: ${color}">${Math.round(j.total / MAX_PRESENCAS * 100)}%</span>
            </div>
        `}).join('');
    }

    /* ==========================================================================
       GRÁFICOS (Chart.js)
       ========================================================================== */

    Chart.defaults.color = '#64748b';
    Chart.defaults.font.family = "'Quicksand', sans-serif";
    Chart.defaults.font.weight = 600;

    function renderCharts() {
        // Presença por Dia
        const dadosDia = presencasPorDia();
        new Chart(document.getElementById('chartDia'), {
            type: 'bar',
            data: {
                labels: DIAS.map(d => d.slice(0, 3)),
                datasets: [{
                    label: 'Presenças',
                    data: dadosDia,
                    backgroundColor: [
                        '#6366f1', '#8b5cf6', '#ec4899',
                        '#f97316', '#10b981', '#06b6d4', '#3b82f6'
                    ],
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#e2e8f0' } },
                    x: { grid: { display: false } }
                }
            }
        });

        // Presença por Horário
        const dadosHora = presencasPorHorario();
        new Chart(document.getElementById('chartHorario'), {
            type: 'doughnut',
            data: {
                labels: HORARIOS,
                datasets: [{
                    data: dadosHora,
                    backgroundColor: ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle' } }
                }
            }
        });

        // Top 10
        const top10 = [...JOGADORES]
            .map(j => ({ nome: j.nome, total: totalPresenca(j) }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 10);

        new Chart(document.getElementById('chartTop10'), {
            type: 'bar',
            data: {
                labels: top10.map(j => j.nome),
                datasets: [{
                    label: 'Presenças',
                    data: top10.map(j => j.total),
                    backgroundColor: top10.map(j => getPresenceColor(j.total)),
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, grid: { color: '#e2e8f0' } },
                    y: { grid: { display: false } }
                }
            }
        });

        // Distribuição
        const distribuicao = { '0': 0, '1-3': 0, '4-7': 0, '8-14': 0, '15+': 0 };
        JOGADORES.forEach(j => {
            const t = totalPresenca(j);
            if (t === 0) distribuicao['0']++;
            else if (t <= 3) distribuicao['1-3']++;
            else if (t <= 7) distribuicao['4-7']++;
            else if (t <= 14) distribuicao['8-14']++;
            else distribuicao['15+']++;
        });

        new Chart(document.getElementById('chartDistribuicao'), {
            type: 'pie',
            data: {
                labels: Object.keys(distribuicao).map(k => k + ' presenças'),
                datasets: [{
                    data: Object.values(distribuicao),
                    backgroundColor: ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#6366f1'],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle' } }
                }
            }
        });
    }

    /* ==========================================================================
       INICIALIZAR
       ========================================================================== */
    document.addEventListener('DOMContentLoaded', () => {
        renderStats();
        renderTable();
        renderRanking();
        renderCharts();
    });
    </script>

</body>
</html>
