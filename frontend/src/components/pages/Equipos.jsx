import React, {useState} from 'react'
// import TecnicosDatatable from '../tables'
import { Tabs, Tab } from "@nextui-org/react";

function Equipos() {

    const [activeTab, setActiveTab] = useState("equipos");
    const sizes = ["lg"];

  return (
    <>
      <div className="flex flex-wrap gap-4 ml-10 mt-4">
        {sizes.map((size) => (
          <Tabs
            key={size}
            size={size}
            aria-label="Tabs sizes"
            selectedKey={activeTab} // Establece la pestaña activa
            onSelectionChange={setActiveTab} // Cambia la pestaña activa
          >
            <Tab key="equipos" title="Equipos"/>
            <Tab key="enMantenimiento" title="En mantenimiento"/>
            <Tab key="activos" title="Activos"/>
            <Tab key="inactivos" title="Inactivos"/>
            <Tab key="excluidos" title="Excluidos"/>
            <Tab key="categorias" title="Categorías"/>
          </Tabs>
        ))}
      </div>
       {activeTab === "equipos" && ""}
       {activeTab === "enMantenimiento" && ""}
       {activeTab === "activos" && ""}
       {activeTab === "inactivos" && ""}
       {activeTab === "excluidos" && ""}
       {activeTab === "categorias" && ""}
    </>
  )
}

export default Equipos
