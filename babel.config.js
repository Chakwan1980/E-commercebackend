module.exports = {
    presets: [
        '@babel/preset-env', // Asegúrate de que este preset esté instalado
    ],
    plugins: [
        '@babel/plugin-transform-runtime', // Necesario para manejar async/await y otras características
    ],
};
