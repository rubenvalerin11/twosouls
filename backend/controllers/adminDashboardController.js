export const getDashboardMetrics = (req, res) => {
  res.json({
    totalOrders: 42,
    pendingOrders: 5,
    totalIncome: 1295000,
    activeProducts: 18,
    salesByDay: [
      { label: "Lun", value: 5 },
      { label: "Mar", value: 8 },
      { label: "Mié", value: 3 },
      { label: "Jue", value: 10 },
      { label: "Vie", value: 7 },
    ],
    lastOrders: [
      { id: "TS-001", client: "Juan Pérez", total: 25000, status: "completado" },
      { id: "TS-002", client: "María López", total: 39500, status: "pendiente" },
    ],
  });
};
