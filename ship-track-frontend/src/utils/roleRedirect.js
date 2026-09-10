export const redirectBasedOnRole = (role, navigate) => {

    const roleRoutes = {
        CUSTOMER: "/customer/dashboard",
        BUSINESS_CLIENT: "/business/dashboard",
        LOGISTICS_OPERATOR: "/logistics-operator/shipments",
        SUPPORT_AGENT: "/support-agent/dashboard",
        ADMIN: "/admin/dashboard"
    };

    navigate(roleRoutes[role] || "/home");
};