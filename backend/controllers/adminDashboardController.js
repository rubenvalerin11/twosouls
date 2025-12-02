// backend/controllers/adminDashboardController.js


export const getDashboardMetrics = (req, res) => {
  res.status(200).json({
    totalOrders: 8,
    pendingOrders: 3,
    totalIncome: 12400,
    activeProducts: 5,
    lastOrders: [
      {
        _id: "1",
        customer: "Juan Pérez",
        total: 200,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        customer: "Lucía Gómez",
        total: 150,
        status: "shipped",
        createdAt: new Date().toISOString(),
      },
    ],
  });
};
