import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import { Toaster, toast } from 'sonner';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function ActualizarUsuario({ isOpen, onClose, actividad, getActividades }) {

    const [size] = React.useState("md");
    const sizes = ["5xl"];
    const variants = ["underlined"];

    const [tecnicos, setTecnicos] = useState([]);
    const [descripcion, setDescripcion] = useState([]);
    const [validationMessages, setValidationMessages] = useState("");
    
  const [actividadData, setActividadData] = useState({
    fecha_actividad: '',
    descripcion:'',
    fk_tecnico: '',
    fk_mantenimiento: '',
  });

  const limpiarFormulario = () => {
    setActividadData({
        fecha_actividad: '',
        descripcion:'',
        fk_tecnico: '',
        fk_mantenimiento: ''
    });
    setValidationMessages("");
  };

  const putActividad = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/actividades/actualizar/${actividadData.id_actividad}`, {
        ...actividadData,
      });
      const data = res.data;
      console.log("Actividad actualizada:", data);
      limpiarFormulario();
      onClose();
      toast.info('Actividad Actualizada!', {
        description: "La actividad ha sido actualizada con éxito!",
        icon: <FaCheckCircle className="text-blue-500 text-xl"/>,
        style: { height: "90px", fontSize: '15px', }
      });
      getActividades();
    } catch (error) {
      setValidationMessages(error.response.data.msg);
      console.log("Error al actualizar la actividad:", error.response.data);
    }
  };

  const getTecnicos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/tecnicos/listar");
      setTecnicos(res.data);
    } catch (error) {
      console.log("Error al traer los tecnicos: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(actividadData).some(value => value === "")) {
      toast.warning('Por favor, completa todos los campos requeridos!', {
        style: { height: "90px", fontSize: '15px', },
        icon: <IoIosWarning style={{ fontSize: "24px" }} />,
        duration: 2000
      });
      return;
    }
    await putActividad();
  };

  useEffect(() => {
    if (actividad) {
      setActividadData(actividad);
    }
    getTecnicos();
  }, [actividad]);

  const handleChange = (e) => {
    setActividadData({
      ...actividadData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[900px] mx-auto">
              Actualizar Actividad
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[900px]" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-10 gap-x-52 mx-auto">
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="date"
                        variant="underlined"
                        label="Fecha de la actividad"
                        name="fecha_actividad"
                        value={actividadData.fecha_actividad}
                        onChange={handleChange}
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'apellidos') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'apellidos')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    {variants.map((variant) => (
                      <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Select
                          variant={variant}
                          label={
                            <span>
                              {"Técnico - "}
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                {`${actividadData.nombres_tecnico} ${actividadData.apellidos_tecnico}`}
                              </span>
                            </span>}
                          name="fk_tenico"
                          value={actividadData.fk_tecnico}
                          onChange={(e) => setActividadData({ ...actividadData, fk_tecnico: e.target.value })}
                          className="max-w-xs"
                        >
                          {tecnicos.map((tecnico) => (
                            <SelectItem key={tecnico.id_tecnico} value={tecnico.id_tecnico}>
                              {`${tecnico.nombres} ${tecnico.apellidos}`}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    ))}
                    {validationMessages && validationMessages.some(([campo]) => campo === 'fk_tipo_usuario') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'fk_tipo_usuario')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        type="tel"
                        variant="underlined"
                        label="ID Mantenimiento"
                        name="fk_mantenimiento"
                        value={actividadData.fk_mantenimiento}
                        readOnly
                      />
                    </div>
                    {validationMessages && validationMessages.some(([campo]) => campo === 'telefono') && (
                      <p className="text-xs text-red-600 font-semibold">
                        {validationMessages.find(([campo]) => campo === 'telefono')[1]}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Textarea
                          placeholder="Ingrese una descripción"
                          className="max-w-xs"
                          label="Descripción de la actividad"
                          name="descripcion"
                          value={actividadData.descripcion}
                          onChange={(e) => setActividadData({...actividadData, descripcion:e.target.value})}
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'descripcion') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'descripcion')[1]}
                            </p>
                          )
                        }
                  </div>
                </div>
              <ModalFooter className="relative left-[94px] top-7">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Actualizar
                </Button>
              </ModalFooter>
              </form>
            </ModalBody>
          </>
            )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ActualizarUsuario;
