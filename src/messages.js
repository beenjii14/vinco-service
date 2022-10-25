const messages = {
  en: {
    query: 'The query could not be made',
    required: 'Required fields are missing',
    user: {
      exists: 'User already exists',
      notFound: 'User not found',
      invalidId: 'Invalid user id',
      invalidAuth: 'Invalid email or password',
      required: 'Email and password are required',
      notFoundToken: 'Access denied. No token provided.',
      logout: 'Logout successfully',
    },
  },
  es: {
    query: 'No se ha podido realizar la consulta',
    required: 'Faltan campos obligatorios',
    user: {
      exists: 'El usuario ya existe',
      notFound: 'Usuario no encontrado',
      invalidId: 'Id de usuario inválido',
      invalidAuth: 'Email o contraseña inválidos',
      required: 'Email y contraseña son obligatorios',
      notFoundToken: 'Acceso denegado. No se ha proporcionado token.',
      logout: 'Sesión cerrada correctamente',
    },
  },
};

export default messages;
