module.exports = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied" });
    }
    console.log("User Role:", req.user.role);
console.log("Allowed Roles:", allowedRoles);


    const userRole = req.user.role.toLowerCase();

    const normalizedRoles = allowedRoles.map((role) =>
      role.toLowerCase()
    );

    if (!normalizedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
