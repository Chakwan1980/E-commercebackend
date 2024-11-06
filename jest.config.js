export default {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest", // transforma archivos JS y JSX usando babel-jest
    },
    testEnvironment: 'node', // asegúrate de que Jest use un entorno compatible para Node
  };
  