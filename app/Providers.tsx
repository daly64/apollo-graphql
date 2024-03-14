"use client";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
/**
 * Providers: component qui injecte le client Apollo dans le contexte React
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  const httpLink = new HttpLink({
    uri: process.env.API_URL,
  });

  const wsLink = () => {
    return new GraphQLWsLink(createClient({ url: process.env.API_URL_WS! }));
  };

  /* Création d'un client Apollo */
  const client = new ApolloClient({
    /* URL de l'API du backend */
    // link: typeof window === "undefined" ? httpLink : wsLink(),
    link: httpLink,
    /* Mémoire cache du client Apollo */
    cache: new InMemoryCache(),
  });

  /* Retourne un composant Provider qui injecte le client Apollo dans le contexte React */
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
