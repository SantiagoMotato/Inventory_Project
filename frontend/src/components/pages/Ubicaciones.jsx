import React, { useState } from "react";
import UbicacionesDatatable from "../tables/UbicationsDatatable";
import UnidadesProductivasDatatable from '../tables/UnidadesProductivasDatable'
import { Tabs, Tab } from "@nextui-org/react";

function Ubicaciones() {
  const [activeTab, setActiveTab] = useState("ubicaciones"); // Estado para la pestaña activa

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
            <Tab key="ubicaciones" title="Ubicaciones"/>
            <Tab key="unidadesProductivas" title="Unidades Productivas"/>
          </Tabs>
        ))}
      </div>
      {/* Renderiza UbicacionesDatatable solo si la pestaña activa es "photos" */}
      {activeTab === "ubicaciones" && <UbicacionesDatatable />}
      {activeTab === "unidadesProductivas" && <UnidadesProductivasDatatable />}
    </>
  );
}

export default Ubicaciones;
