export const redirectBasedOnRole = (role, navigate) => {

    const roleRoutes = {
        CUSTOMER: "/customer/dashboard",
        BUSINESS_CLIENT: "/business/dashboard",
        LOGISTICS_OPERATOR: "/logistics-operator/dashboard",
        SUPPORT_AGENT: "/support/dashboard",
        ADMIN: "/admin/dashboard"
    };

    navigate(roleRoutes[role] || "/home");
};