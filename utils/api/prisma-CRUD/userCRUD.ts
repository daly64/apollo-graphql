import { PrismaClient } from "@prisma/client";

// Cette classe permet de faire des CRUD (Create, Read, Update, Delete) sur l'entité User
// via la librairie Prisma (https://www.prisma.io/)
// toutes les méthodes renvoient une promesse (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)
// il est donc possible d'utiliser l'opérateur async/await ou la méthode then (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise/then) pour récupérer le résultat


const prisma = new PrismaClient();

/**
 * Renvoie une liste de tous les utilisateurs de la base de données
 * @returns une promesse résolue avec la liste des utilisateurs
 */
export const prismaGetAllUsers = async (): Promise<User[]> => {
  // findMany est une méthode de Prisma qui permet de récupérer plusieurs entités
  // dans ce cas, nous récupérons toutes les entités User
  return prisma.user.findMany(); // cette méthode renvoie une promesse
}

/**
 * Renvoie l'utilisateur dont l'identifiant est passé en paramètre
 * @param id L'identifiant de l'utilisateur à récupérer
 * @returns Une promesse résolue avec l'utilisateur si trouvé, null sinon
 */
export const prismaGetUserById = async (id: number): Promise<User | null> => {
  // findUnique est une méthode de Prisma qui permet de récupérer une seule entité
  // dans ce cas, nous cherchons l'entité User dont l'identifiant est passé en paramètre
  // nous utilisons l'opérateur async/await pour attendre la résolution de la promesse
  const user = await prisma.user.findUnique({ where: { id: id } }); // cette méthode renvoie une promesse
  return user;
}

/**
 * Créé un nouvel utilisateur dans la base de données
 * @param user Les données de l'utilisateur à créer
 * @returns La promesse résolue avec l'utilisateur créé
 */
export const prismaCreateUser = async (user: User): Promise<User> => {
  // create est une méthode de Prisma qui permet de créer une nouvelle entité
  // dans ce cas, nous créons une entité User avec les données passées en paramètre
  // nous utilisons l'opérateur async/await pour attendre la résolution de la promesse
  return prisma.user.create({ data: user }); // cette méthode renvoie une promesse
}

/**
 * Met à jour un utilisateur dans la base de données
 * @param id L'identifiant de l'utilisateur à mettre à jour
 * @param user Les données de l'utilisateur à mettre à jour
 * @returns Une promesse résolue avec l'utilisateur mis à jour si trouvé, null sinon
 */
export const prismaUpdateUser = async (
  id: number,
  user: User
): Promise<User | null> => {
  // update est une méthode de Prisma qui permet de mettre à jour une entité
  // dans ce cas, nous mettons à jour l'entité User dont l'identifiant est passé en paramètre
  // nous spécifions les champs à mettre à jour avec l'opérateur spread {...user}
  // nous utilisons l'opérateur async/await pour attendre la résolution de la promesse
  return await prisma.user.update({
    where: { id: id }, // where est utilisé pour spécifier les critères de recherche
    data: { ...user, name: user.name, score: user.score }, // data est utilisé pour spécifier les champs à mettre à jour
  });
}
/**
 * Supprime un utilisateur de la base de données
 * @param id L'identifiant de l'utilisateur à supprimer
 * @returns Une promesse résolue avec l'utilisateur supprimé si trouvé, null sinon
 */
export const prismaDeleteUser = async (id: number): Promise<User | null> => {
  // delete est une méthode de Prisma qui permet de supprimer une entité
  // dans ce cas, nous supprimons l'entité User dont l'identifiant est passé en paramètre
  // nous utilisons l'opérateur async/await pour attendre la résolution de la promesse
  return await prisma.user.delete({ where: { id: id } }); // cette méthode renvoie une promesse
}