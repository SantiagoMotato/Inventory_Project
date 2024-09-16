export const columns = [
    { name: "ID", uid: "id_actividad" },
    { name: "Fecha Actividad", uid: "fecha_actividad" },
    { name: "Descripción", uid: "descripcion" },
    { name: "ID Mantenimiento", uid: "fk_mantenimiento" },
    { name: "Técnico", uid: "fk_tecnico" },
    { name: "Equipo", uid: "fk_equipo" },
    { name: "Responsable", uid: "fk_user_responsable" },
    { name: "Actions", uid: "actions" },
  ];

  export const statusOptions = [
    { name: "All", uid: "all" },
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
  ];