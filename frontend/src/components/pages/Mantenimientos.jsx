import React, {useState} from 'react'
import MantenimientosDatatable from '../tables/MantenimientosDatatable'
import ActividadesDatatable from '../tables/ModuloMantenimientos/ActividadesDataTable'
import TecnicosDatatable from '../tables/TecnicosDatatable'
import { Tabs, Tab } from "@nextui-org/react";

function Mantenimientos() {

  const [activeTab, setActiveTab] = useState("mantenimientos"); // Estado para la pestaña activa
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
            <Tab key="mantenimientos" title="Matenimientos"/>
            <Tab key="actividades" title="Actividades"/>
            <Tab key="tecnicos" title="Técnicos"/>
          </Tabs>
        ))}
      </div>
       {/* Renderiza UbicacionesDatatable solo si la pestaña activa es "photos" */}
       {activeTab === "mantenimientos" && <MantenimientosDatatable />}
       {activeTab === "actividades" && <ActividadesDatatable/>}
       {activeTab === "tecnicos" && <TecnicosDatatable/>}
    </>
  )
}

export default Mantenimientos
