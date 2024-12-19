import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "./src/graphql/queries.graphql",
    generates: {
        "./src/graphql/types.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo"
            ],
        },
    }
};

export default config;
