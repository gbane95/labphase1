"use client";

import { Card, Title, Text, Group, ThemeIcon } from "@mantine/core";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';

// Financial metrics data
const financialData = {
  today: 360776.35,
  yesterday: 6428378.6,
  thisWeek: 2000668.85,
  thisMonth: 7215527,
  growth: 12.5
};

// 📊 Données simulées (à remplacer par API)
const salesData = [
  { mois: "Jan", ventes: 4000 },
  { mois: "Fév", ventes: 6000 },
  { mois: "Mar", ventes: 12000 },
  { mois: "Avr", ventes: 9500 },
  { mois: "Mai", ventes: 15000 },
  { mois: "Juin", ventes: 21000 },
  { mois: "Juil", ventes: 23000 },
  { mois: "Aout", ventes: 20000 },
  { mois: "Sep", ventes: 22000 },
  { mois: "Oct", ventes: 25000 },
  { mois: "Nov", ventes: 28000 },
  { mois: "Déc", ventes: 30000 },
];

const clientsData = [
  { mois: "Jan", clients: 250 },
  { mois: "Fév", clients: 550 },
  { mois: "Mar", clients: 400 },
  { mois: "Avr", clients: 450 },
  { mois: "Mai", clients: 600 },
  { mois: "Juin", clients: 900 },
  { mois: "Juil", clients: 800 },
  { mois: "Aout", clients: 950 },
  { mois: "Sep", clients: 1200 },
  { mois: "Oct", clients: 1500 },
  { mois: "Nov", clients: 1800 },
  { mois: "Déc", clients: 2000 },
];

const categoryData = [
  { name: "vetement hommes", value: 450 },
  { name: "vetement femmes", value: 600 },
  { name: "vetement enfants", value: 344 },
];

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"];

export default function DashboardAnalytics() {
  const [totalVentes, setTotalVentes] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalCommandes, setTotalCommandes] = useState(0);

  useEffect(() => {
    setTotalVentes(salesData.reduce((acc, item) => acc + item.ventes, 0));
    setTotalClients(clientsData.reduce((acc, item) => acc + item.clients, 0));
    setTotalCommandes(150); // Exemple statique, à remplacer par API
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      {/* Financial Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="apart">
            <div>
              <Text size="xs" color="dimmed">Ventes Aujourd&apos;hui</Text>
              <Text fw={700} size="xl">{formatCurrency(financialData.today)}</Text>
            </div>
            <ThemeIcon
              color={financialData.today > financialData.yesterday ? "teal" : "red"}
              variant="light"
              size="xl"
              radius="md"
            >
              {financialData.today > financialData.yesterday ? 
                <IconArrowUpRight size="1.5rem" /> : 
                <IconArrowDownRight size="1.5rem" />}
            </ThemeIcon>
          </Group>
          <Text size="xs" color="dimmed" mt="md">
            Hier: {formatCurrency(financialData.yesterday)}
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="apart">
            <div>
              <Text size="xs" color="dimmed">Cette Semaine</Text>
              <Text fw={700} size="xl">{formatCurrency(financialData.thisWeek)}</Text>
            </div>
            <ThemeIcon
              color="blue"
              variant="light"
              size="xl"
              radius="md"
            >
              <IconArrowUpRight size="1.5rem" />
            </ThemeIcon>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="apart">
            <div>
              <Text size="xs" color="dimmed">Ce Mois</Text>
              <Text fw={700} size="xl">{formatCurrency(financialData.thisMonth)}</Text>
            </div>
            <ThemeIcon
              color="grape"
              variant="light"
              size="xl"
              radius="md"
            >
              <IconArrowUpRight size="1.5rem" />
            </ThemeIcon>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="apart">
            <div>
              <Text size="xs" color="dimmed">Croissance</Text>
              <Text fw={700} size="xl">{financialData.growth}%</Text>
            </div>
            <ThemeIcon
              color={financialData.growth > 0 ? "teal" : "red"}
              variant="light"
              size="xl"
              radius="md"
            >
              {financialData.growth > 0 ? 
                <IconArrowUpRight size="1.5rem" /> : 
                <IconArrowDownRight size="1.5rem" />}
            </ThemeIcon>
          </Group>
        </Card>
      </div>

      {/* Existing charts section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* 🔹 CHIFFRE D'AFFAIRES */}
        <Card shadow="md" padding="md" className="bg-white rounded-lg p-3 sm:p-5">
          <Title order={4} className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-4">
            Chiffre d&apos;Affaires Mensuel
          </Title>
          <ResponsiveContainer width="100%" height={250} minHeight={200}>
            <BarChart data={salesData}>
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventes" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* 🔹 CLIENTS */}
        <Card shadow="md" padding="md" className="bg-white rounded-lg p-3 sm:p-5">
          <Title order={4} className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-4">
            Nombre de Clients
          </Title>
          <ResponsiveContainer width="100%" height={250} minHeight={200}>
            <LineChart data={clientsData}>
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clients" stroke="#2196F3" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* 🔹 RÉPARTITION DES VENTES */}
        <Card shadow="md" padding="md" className="bg-white rounded-lg col-span-1 md:col-span-2 p-3 sm:p-5">
          <Title order={4} className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-4">
            Répartition des Ventes par Catégorie
          </Title>
          <ResponsiveContainer width="100%" height={250} minHeight={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
