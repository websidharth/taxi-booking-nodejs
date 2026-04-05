export declare const swaggerOptions: {
    definition: {
        openapi: string;
        info: {
            title: string;
            version: string;
            description: string;
        };
        servers: {
            url: string;
        }[];
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: string;
                    scheme: string;
                    bearerFormat: string;
                };
            };
            schemas: {
                User: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            example: string;
                        };
                        name: {
                            type: string;
                            example: string;
                        };
                        email: {
                            type: string;
                            example: string;
                        };
                        role: {
                            type: string;
                            enum: string[];
                            example: string;
                        };
                    };
                };
                LoginRequest: {
                    type: string;
                    required: string[];
                    properties: {
                        email: {
                            type: string;
                        };
                        password: {
                            type: string;
                        };
                    };
                };
            };
        };
        security: {
            bearerAuth: never[];
        }[];
    };
    apis: string[];
};
//# sourceMappingURL=swagger.d.ts.map