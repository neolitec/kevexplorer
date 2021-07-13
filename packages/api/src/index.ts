import { FileType, scanDir } from '@kevexplorer/core';
import Fastify, { FastifyRequest } from 'fastify';
import FastifyCors from 'fastify-cors';
import mercurius, { IFieldResolver, IResolvers, MercuriusContext } from 'mercurius';
import { gql } from 'mercurius-codegen';
import { AuthorizationContext } from './model';

const app = Fastify();
app.register(FastifyCors, {});

const buildContext = async (req: FastifyRequest) => ({
  authorization: req.headers.authorization,
});

const schema = gql`
  type File {
    path: String!
    name: String!
    size: String!
    lastModifiedDate: String!
    filesCount: Int
    foldersCount: Int
    isDir: Boolean!
  }

  type ListResponse {
    path: String!
    files: [File]!
    filesCount: Int!
    foldersCount: Int!
    size: String!
  }

  type Query {
    list(path: String): ListResponse!
  }
`;

const list: IFieldResolver<unknown, MercuriusContext, { path: string | null }> = async (root, args, ctx) => {
  console.log(`Scanning ${args.path}...`);
  const result = await scanDir(args.path ?? process.cwd());
  const response = {
    path: result.path,
    files: result.children.map((file) => ({
      path: file.path,
      name: file.fileName,
      size: file.size,
      lastModifiedDate: file.lastModified.toISOString(),
      ...(file.cumul ? { filesCount: file.cumul?.files } : {}),
      ...(file.cumul ? { foldersCount: file.cumul?.folders } : {}),
      isDir: file.type === FileType.DIR,
    })),
    filesCount: result.filesCount,
    foldersCount: result.foldersCount,
    size: result.size,
  };
  console.log(`Successfully scanned ${args.path}!`);
  return response;
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
