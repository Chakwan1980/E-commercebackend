// middleware/auth.js
export const isAdmin = (req, res, next) => {
    // Aquí deberías validar el token JWT para verificar si el usuario es administrador
    const userRole = req.user?.role; // Supongamos que el token JWT tiene un campo 'role'
    
    if (userRole === 'admin') {
        next(); // Permitir acceso a la ruta
    } else {
        return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
    }
};

