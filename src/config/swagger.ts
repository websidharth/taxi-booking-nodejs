const port = process.env.PORT || 4000;

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Project API 🏨",
      version: "1.0.0",
      description: "API documentation for Email Marketing Platform",
    },
    servers: [{ url: `http://localhost:${port}` },{ url: `http://192.168.1.67:${port}` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      // --- MOVED SCHEMAS INSIDE COMPONENTS ---
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "STU-2025-1234" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            role: {
              type: "string",
              enum: ["ADMIN", "STUDENT"],
              example: "STUDENT",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};
