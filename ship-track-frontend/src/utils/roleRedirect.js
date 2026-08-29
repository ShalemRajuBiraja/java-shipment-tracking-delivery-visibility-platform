
export const redirectBasedOnRole = (role, navigate) => {

    const roleRoutes = {
        CUSTOMER: "/customer/dashboard",
        BUSINESS_CLIENT: "/business/dashboard",
        LOGISTICS_OPERATOR: "/logistics/dashboard",
        SUPPORT_AGENT: "/support/dashboard"
    };

    navigate(roleRoutes[role] || "/home");
};