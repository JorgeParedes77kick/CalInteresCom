export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1", // Ajuste para rutas basadas en "src/"
    "^pages/(.*)$": "<rootDir>/src/pages/$1", // Ajuste para rutas basadas en "src/"
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
};
