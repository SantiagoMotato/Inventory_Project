// src/components/pages/data.js

// Define las columnas que se mostrarán en la tabla
export const columns = [
  { name: "Identificación", uid: "identificacion" },
  { name: "Nombres", uid: "nombres" },
  { name: "Rol", uid: "role" },
  { name: "Unidad Productiva", uid: "nombre_unidad_productiva" },
  { name: "Telefono", uid: "telefono" },
  { name: "Estado", uid: "estado" },
  { name: "Actions", uid: "actions" },
];

// Datos de usuarios de ejemplo
export const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Manager",
    team: "Sales",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=alice.johnson@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Developer",
    team: "Engineering",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?u=bob.smith@example.com",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "Designer",
    team: "Design",
    status: "vacation",
    avatar: "https://i.pravatar.cc/150?u=charlie.brown@example.com",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "CEO",
    team: "Management",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=diana.prince@example.com",
  },
  {
    id: 5,
    name: "Edward Norton",
    email: "edward.norton@example.com",
    role: "HR",
    team: "Human Resources",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=edward.norton@example.com",
  },
];

// Opciones de estado que puedes usar en el filtro de la tabla
export const statusOptions = [
  { name: "All", uid: "all" },
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];


// // src/components/pages/data.js

// // Define las columnas que se mostrarán en la tabla
// export const columns = [
//   { name: "Name", uid: "name" },
//   { name: "Role", uid: "role" },
//   { name: "Status", uid: "status" },
//   { name: "Actions", uid: "actions" },
// ];

// // Datos de usuarios de ejemplo
// export const users = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     role: "Manager",
//     team: "Sales",
//     status: "active",
//     avatar: "https://i.pravatar.cc/150?u=alice.johnson@example.com",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     email: "bob.smith@example.com",
//     role: "Developer",
//     team: "Engineering",
//     status: "paused",
//     avatar: "https://i.pravatar.cc/150?u=bob.smith@example.com",
//   },
//   {
//     id: 3,
//     name: "Charlie Brown",
//     email: "charlie.brown@example.com",
//     role: "Designer",
//     team: "Design",
//     status: "vacation",
//     avatar: "https://i.pravatar.cc/150?u=charlie.brown@example.com",
//   },
//   {
//     id: 4,
//     name: "Diana Prince",
//     email: "diana.prince@example.com",
//     role: "CEO",
//     team: "Management",
//     status: "active",
//     avatar: "https://i.pravatar.cc/150?u=diana.prince@example.com",
//   },
//   {
//     id: 5,
//     name: "Edward Norton",
//     email: "edward.norton@example.com",
//     role: "HR",
//     team: "Human Resources",
//     status: "active",
//     avatar: "https://i.pravatar.cc/150?u=edward.norton@example.com",
//   },
// ];

// // Opciones de estado que puedes usar en el filtro de la tabla
// export const statusOptions = [
//   { name: "All", uid: "all" },
//   { name: "Active", uid: "active" },
//   { name: "Paused", uid: "paused" },
//   { name: "Vacation", uid: "vacation" },
// ];

