import { scanDir } from '@kevexplorer/core';
import Fastify, { FastifyRequest } from 'fastify';
import mercurius, { IFieldResolver, IResolvers, MercuriusContext } from 'mercurius';
import { gql } from 'mercurius-codegen';
import { AuthorizationContext } from './model';

const app = Fastify();

const buildContext = async (req: FastifyRequest) => ({
  authorization: req.headers.authorization,
});

const schema = gql`
  type File {
    path: String!
    name: String!
  }

  type ListResponse {
    files: [File]!
    filesCount: Int!
    foldersCount: Int!
    size: Int!
  }

  type Query {
    list(path: String!): ListResponse!
  }
`;

const list: IFieldResolver<unknown, MercuriusContext, { path: string }> = async (root, args, ctx) => {
  const result = await scanDir(args.path);
  return {
    files: result.children.map((file) => ({
      path: file.path,
      name: file.fileName,
    })),
    filesCount: result.filesCount,
    foldersCount: result.foldersCount,
    size: result.size,
  };
};

const resolvers: IResolvers = {
  Query: {
    list,
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  context: buildContext,
  graphiql: true,
});

app.listen(
  {
    port: 8080,
    host: '0.0.0.0',
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening on address ${address}`);
  },
);

declare module 'mercurius' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface MercuriusContext extends AuthorizationContext { }
}
