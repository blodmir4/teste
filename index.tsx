import { useState } from "react";
import { Shield, Users, CheckCircle, Calendar, Clock } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from "recharts";

// ========================
// TYPES
// ========================
interface MemberAttendance {
  nickname: string;
  schedule: {
    [day: string]: {
      [time: string]: boolean;
    };
  };
}

// ========================
// CONSTANTS
// ========================
const DAYS = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO", "DOMINGO"] as const;
const TIMES = ["10H", "12H", "20H", "22H", "00H"] as const;

const NEON_COLORS = [
  "hsl(175, 80%, 50%)",
  "hsl(280, 70%, 55%)",
  "hsl(150, 70%, 45%)",
  "hsl(40, 90%, 55%)",
  "hsl(340, 70%, 55%)",
  "hsl(200, 80%, 55%)",
  "hsl(120, 60%, 50%)",
];

// ========================
// ATTENDANCE DATA
// ========================
const attendanceData: MemberAttendance[] = [
  {
    nickname: "SENIOR96",
    schedule: {
      SEGUNDA: { "10H": true, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": true, "12H": false, "20H": true, "22H": true, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": true },
      QUINTA: { "10H": true, "12H": true, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": true, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "EXO 丶Rayvèn",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": true, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "pixie",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": true, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Rebel Byob",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": true, "22H": true, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Psychodavid",
    schedule: {
      SEGUNDA: { "10H": false, "12H": true, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": true, "12H": false, "20H": false, "22H": true, "00H": true },
      QUARTA: { "10H": true, "12H": false, "20H": true, "22H": false, "00H": true },
      QUINTA: { "10H": false, "12H": false, "20H": true, "22H": true, "00H": false },
      SEXTA: { "10H": true, "12H": false, "20H": true, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "bloodcross",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": true, "12H": false, "20H": true, "22H": true, "00H": false },
      SEXTA: { "10H": true, "12H": true, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "andersong30",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "LunadeLuz",
    schedule: {
      SEGUNDA: { "10H": true, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": true, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": true, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": true, "12H": false, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "77 thung",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": true, "22H": true, "00H": false },
      SEXTA: { "10H": true, "12H": false, "20H": false, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Pescadora",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "pujone",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "laetshin",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "picador",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Luffy",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": true, "22H": true, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": true, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "thago",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Violeta",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "vladesko",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": true },
      QUARTA: { "10H": true, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Chaos Sunny",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": true },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Tuero",
    schedule: {
      SEGUNDA: { "10H": true, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Rey Bye",
    schedule: {
      SEGUNDA: { "10H": true, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "77REAPERWins",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": true },
      QUINTA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Adonis 333",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "ivanvulman",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "VenManCo",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "CMPUNK",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": true },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "jeonyeon",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": true, "12H": false, "20H": true, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Rhovania",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": true },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Soleyi",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "bumbum",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": true, "12H": true, "20H": false, "22H": true, "00H": false },
      SEXTA: { "10H": true, "12H": true, "20H": false, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "Diana Rivera",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": true, "22H": false, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
  {
    nickname: "VKS",
    schedule: {
      SEGUNDA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      TERÇA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUARTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      QUINTA: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      SEXTA: { "10H": false, "12H": false, "20H": false, "22H": true, "00H": false },
      SÁBADO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
      DOMINGO: { "10H": false, "12H": false, "20H": false, "22H": false, "00H": false },
    },
  },
];

// ========================
// HELPER FUNCTIONS
// ========================
function getMemberTotalPresences(member: MemberAttendance): number {
  let count = 0;
  for (const day of Object.values(member.schedule)) {
    for (const present of Object.values(day)) {
      if (present) count++;
    }
  }
  return count;
}

function getPresencesByDay(): { day: string; count: number }[] {
  return DAYS.map((day) => {
    let count = 0;
    attendanceData.forEach((member) => {
      const daySchedule = member.schedule[day];
      if (daySchedule) {
        Object.values(daySchedule).forEach((v) => { if (v) count++; });
      }
    });
    return { day, count };
  });
}

function getPresencesByTime(): { time: string; count: number }[] {
  return TIMES.map((time) => {
    let count = 0;
    attendanceData.forEach((member) => {
      Object.values(member.schedule).forEach((daySchedule) => {
        if (daySchedule[time]) count++;
      });
    });
    return { time, count };
  });
}

function getMemberRanking(): { nickname: string; total: number }[] {
  return attendanceData
    .map((m) => ({ nickname: m.nickname, total: getMemberTotalPresences(m) }))
    .filter((m) => m.total > 0)
    .sort((a, b) => b.total - a.total);
}

function getTotalPresences(): number {
  return attendanceData.reduce((sum, m) => sum + getMemberTotalPresences(m), 0);
}

function getActiveMembersCount(): number {
  return attendanceData.filter((m) => getMemberTotalPresences(m) > 0).length;
}

function getTotalMembers(): number {
  return attendanceData.length;
}

// ========================
// CHART TOOLTIP
// ========================
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="neon-card rounded-md px-3 py-2 text-sm">
      <p className="font-display text-primary text-xs">{label}</p>
      <p className="text-foreground font-semibold">{payload[0].value} presenças</p>
    </div>
  );
}

// ========================
// STAT CARD
// ========================
function StatCard({ title, value, subtitle, icon, delay = 0 }: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="neon-card rounded-lg p-6 opacity-0 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-3xl font-bold font-display neon-text">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}

// ========================
// MAIN PAGE COMPONENT
// ========================
const MIR4 = () => {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  // Stats
  const totalPresences = getTotalPresences();
  const activeMembers = getActiveMembersCount();
  const totalMembers = getTotalMembers();
  const avgPerMember = activeMembers > 0 ? (totalPresences / activeMembers).toFixed(1) : "0";

  // Charts data
  const rankingData = getMemberRanking().slice(0, 15);
  const dayData = getPresencesByDay();
  const timeData = getPresencesByTime();

  // Table filter
  const filteredData = attendanceData.filter((m) => {
    const total = getMemberTotalPresences(m);
    if (filter === "active") return total > 0;
    if (filter === "inactive") return total === 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* ============ HEADER ============ */}
      <header className="border-b border-border/50 neon-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg gradient-accent p-2.5">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display neon-text tracking-wide">
                SCALT SA21
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Painel de Participação • Semana 02/02 - 08/02/2026
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ============ MAIN CONTENT ============ */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">

        {/* ============ STATS CARDS ============ */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Presenças"
            value={totalPresences}
            subtitle="registros na semana"
            icon={<CheckCircle className="h-6 w-6" />}
            delay={0}
          />
          <StatCard
            title="Membros Ativos"
            value={activeMembers}
            subtitle={`de ${totalMembers} membros`}
            icon={<Users className="h-6 w-6" />}
            delay={100}
          />
          <StatCard
            title="Média por Membro"
            value={avgPerMember}
            subtitle="presenças por ativo"
            icon={<Calendar className="h-6 w-6" />}
            delay={200}
          />
          <StatCard
            title="Dias Ativos"
            value="5"
            subtitle="seg a sex"
            icon={<Clock className="h-6 w-6" />}
            delay={300}
          />
        </section>

        {/* ============ CHARTS ROW ============ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Day Chart */}
          <div className="neon-card rounded-lg p-6 opacity-0 animate-slide-up" style={{ animationDelay: "500ms" }}>
            <h3 className="font-display text-sm uppercase tracking-wider text-primary mb-4">
              📅 Presenças por Dia da Semana
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayData} margin={{ bottom: 10 }}>
                  <XAxis
                    dataKey="day"
                    stroke="hsl(220, 10%, 35%)"
                    tick={{ fill: "hsl(180, 10%, 80%)", fontSize: 11 }}
                    tickFormatter={(v) => v.slice(0, 3)}
                  />
                  <YAxis stroke="hsl(220, 10%, 35%)" tick={{ fill: "hsl(180, 10%, 60%)", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={50}>
                    {dayData.map((_, i) => (
                      <Cell key={i} fill={NEON_COLORS[i % NEON_COLORS.length]} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Time Chart */}
          <div className="neon-card rounded-lg p-6 opacity-0 animate-slide-up" style={{ animationDelay: "600ms" }}>
            <h3 className="font-display text-sm uppercase tracking-wider text-primary mb-4">
              🕐 Presenças por Horário
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeData}
                    dataKey="count"
                    nameKey="time"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    stroke="none"
                    label={({ time, count }) => `${time}: ${count}`}
                  >
                    {timeData.map((_, i) => (
                      <Cell key={i} fill={NEON_COLORS[i % NEON_COLORS.length]} fillOpacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    formatter={(value) => <span style={{ color: "hsl(180, 10%, 80%)", fontSize: 12 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ============ RANKING CHART ============ */}
        <section>
          <div className="neon-card rounded-lg p-6 opacity-0 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <h3 className="font-display text-sm uppercase tracking-wider text-primary mb-4">
              🏆 Ranking de Presenças por Membro
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rankingData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <XAxis type="number" stroke="hsl(220, 10%, 35%)" tick={{ fill: "hsl(180, 10%, 60%)", fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="nickname"
                    width={110}
                    tick={{ fill: "hsl(180, 10%, 80%)", fontSize: 11 }}
                    stroke="hsl(220, 10%, 35%)"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="total" radius={[0, 6, 6, 0]} maxBarSize={28}>
                    {rankingData.map((_, i) => (
                      <Cell key={i} fill={NEON_COLORS[i % NEON_COLORS.length]} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ============ ATTENDANCE TABLE ============ */}
        <section>
          <div className="neon-card rounded-lg p-6 opacity-0 animate-slide-up" style={{ animationDelay: "700ms" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
              <h3 className="font-display text-sm uppercase tracking-wider text-primary">
                📋 Tabela de Presença Semanal
              </h3>
              <div className="flex gap-2">
                {(["all", "active", "inactive"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      filter === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {f === "all" ? "Todos" : f === "active" ? "Ativos" : "Inativos"}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="sticky left-0 bg-card z-10 px-3 py-2 text-left font-display text-muted-foreground uppercase tracking-wider">
                      Membro
                    </th>
                    {DAYS.map((day) => (
                      <th
                        key={day}
                        colSpan={5}
                        className="px-1 py-2 text-center font-display text-muted-foreground uppercase tracking-wider border-l border-border"
                      >
                        {day.slice(0, 3)}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-center font-display text-primary uppercase tracking-wider border-l border-border">
                      Total
                    </th>
                  </tr>
                  <tr className="border-b border-border/50">
                    <th className="sticky left-0 bg-card z-10"></th>
                    {DAYS.map((day) =>
                      TIMES.map((time) => (
                        <th
                          key={`${day}-${time}`}
                          className={`px-1 py-1 text-center text-[10px] text-muted-foreground/70 ${
                            time === "10H" ? "border-l border-border" : ""
                          }`}
                        >
                          {time}
                        </th>
                      ))
                    )}
                    <th className="border-l border-border"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((member, idx) => {
                    const total = getMemberTotalPresences(member);
                    return (
                      <tr
                        key={member.nickname}
                        className={`border-b border-border/30 transition-colors hover:bg-secondary/30 ${
                          idx % 2 === 0 ? "" : "bg-secondary/10"
                        }`}
                      >
                        <td className="sticky left-0 bg-card z-10 px-3 py-2 font-medium text-foreground whitespace-nowrap">
                          {member.nickname}
                        </td>
                        {DAYS.map((day) =>
                          TIMES.map((time) => {
                            const present = member.schedule[day]?.[time] ?? false;
                            return (
                              <td
                                key={`${day}-${time}`}
                                className={`px-1 py-2 text-center ${
                                  time === "10H" ? "border-l border-border/30" : ""
                                }`}
                              >
                                <span
                                  className={`inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                                    present ? "presence-true" : "presence-false"
                                  }`}
                                >
                                  {present ? "✓" : "·"}
                                </span>
                              </td>
                            );
                          })
                        )}
                        <td className="px-3 py-2 text-center font-display font-bold border-l border-border/30">
                          <span className={total > 0 ? "neon-text" : "text-muted-foreground/40"}>
                            {total}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Mostrando {filteredData.length} de {attendanceData.length} membros
            </p>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="border-t border-border/30 pt-6 pb-8 text-center">
          <p className="text-xs text-muted-foreground">
            SCALT SA21 • Sistema de Controle de Presença
          </p>
        </footer>
      </main>
    </div>
  );
};

export default MIR4;
