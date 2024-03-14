import {
  prismaGetAllUsers,
  prismaGetUserById,
  prismaCreateUser,
  prismaUpdateUser,
  prismaDeleteUser,
} from "../prisma-CRUD/userCRUD";
/**
 * Fonction pour retourner "bonjour le monde"
 *
 * @returns {string} le message de bienvenue
 */
export const hello = (): string => {
  // Le message de bienvenue
  return "bonjour le monde";
};

/**
 * Renvoie une liste de tous les utilisateurs de la base de données
 *
 * @returns une promesse résolue avec la liste des utilisateurs
 */
export const getAllUsers = prismaGetAllUsers;

/**
 * Renvoie un utilisateur en fonction de son identifiant
 *
 * @param parent non utilisé
 * @param data l'objet contenant l'identifiant de l'utilisateur à récupérer
 * @returns une promesse résolue avec l'utilisateur si trouvé, null sinon
 */
export const getUser = (parent: any, data: any): Promise<User | null> => {
  // Nous convertissons l'identifiant en nombre entier pour la recherche
  return prismaGetUserById(parseInt(data.id));
};

/**
 * Fonction pour ajouter un nouvel utilisateur dans la base de données
 *
 * @param parent non utilisé
 * @param data l'objet contenant les informations de l'utilisateur à ajouter
 * @returns une promesse résolue avec l'utilisateur créé
 */
export const createUser = (parent: any, data: any): Promise<User> => {
  // Nous ajoutons un nouvel utilisateur en base avec les informations données
  return prismaCreateUser(data.input);
};

/**
 * Fonction pour mettre à jour un utilisateur
 *
 * @param parent non utilisé
 * @param data l'objet contenant l'identifiant de l'utilisateur à mettre à jour et ses nouvelles informations
 * @returns une promesse résolue avec l'utilisateur mis à jour si trouvé, null sinon
 */
export const updateUser = (parent: any, data: any): Promise<User | null> => {
  // Nous convertissons l'identifiant en nombre entier pour la recherche
  // et nous utilisons les champs donnés en data.input pour mettre à jour l'utilisateur
  return prismaUpdateUser(parseInt(data.id), data.input);
};

/**
 * Fonction pour supprimer un utilisateur
 * @param parent non utilisé
 * @param data l'objet contenant l'identifiant de l'utilisateur à supprimer
 * @returns une promesse résolue avec true si l'utilisateur a été supprimé, false sinon
 */
export const deleteUser = (parent: any, data: any): boolean => {
  const deletedUser = prismaDeleteUser(parseInt(data.id));
  // Nous renvoyons true si l'utilisateur a été supprimé,
  // et false si l'utilisateur n'a pas été trouvé dans la base de données
  return deletedUser !== null;
};

async function allUsers() {
  return await prismaGetAllUsers();
}

// Définition des résolveurs
const resolvers = {
  Query: { hello, getAllUsers, getUser },
  Mutation: { createUser, updateUser, deleteUser },
  Subscription: { allUsers },
};

export default resolvers;
