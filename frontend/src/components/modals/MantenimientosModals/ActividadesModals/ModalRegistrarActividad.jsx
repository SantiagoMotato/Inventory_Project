import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import {Toaster, toast} from 'sonner'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import {Textarea} from "@nextui-org/react";

function RegistrarActividad({ isOpen, onOpen, onClose, mantenimientoID }) {
  const [size, setSize] = React.useState("md");

  const sizes = ["4xl"];
  const variants = ["underlined"];

  const [fecha_actividad, setFechaActividad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  // const [fk_mantenimiento, setFk_mantenimiento] = useState("");
  const [fk_mantenimiento, setFk_mantenimiento] = useState(mantenimientoID || "");  // Vincula automáticamente el ID
  const [fk_tecnico, setFk_tecnico] = useState("");

  // const [id_mantenimiento, setId_mantenimiento] = useState("");

  const [tenicos, setTecnicos] = useState("");
  const [validationMessages, setValidationMessages] = useState("");

  const limpiarFormulario = () => {
    setFechaActividad("");
    setDescripcion("");
    setFk_mantenimiento("");
    setFk_tecnico("");
  };

  const getTecnicos = async() => {
    try {
      const res = await axios.get("http://localhost:4000/tecnicos/listar");
      const data = res.data;
      setTecnicos(data);
      console.log(data)
    } catch (error) {
      console.log("Error al traer los ténicos: ",error);
    }
  }

  const postActividad= async() => {
    try {
      // const id_mantenimiento = mantenimiento;

      const res = await axios.post("http://localhost:4000/actividades/registrar", {
        fecha_actividad,
        descripcion,
        fk_mantenimiento,
        fk_tecnico,
      });
      const data = res.data;
      console.log("Actividad registrada:", data);
      limpiarFormulario(); 
    } catch (error) {
      // console.log("Error al registrar la actividad:", error);
      setValidationMessages(error.response.data.msg);
      console.log(error.response.data);

      throw error;
    }
  };

  const SubmitRegistrarActividad = async(event) => {
    event.preventDefault();
    if (
      !fecha_actividad ||
      !descripcion ||
      // !fk_mantenimiento ||
      !fk_tecnico
    ) {
      toast.warning('Por favor, completa todos los campos requeridos!',  {
        style: {height:"90px", fontSize: '15px',},
        icon: <IoIosWarning style={{fontSize:"24px"}}/>,
        duration: 2000
      }); 
      return;
    }
    console.log({
      fecha_actividad,
      descripcion,
      fk_mantenimiento,
      fk_tecnico
    });
    try {
      await postActividad();
      onClose();
      toast.success('Actividad Registrada!',  {
          description: "La actividad ha sido registrada con éxito!",
          icon: <FaCheckCircle className="text-green-500 text-xl"/>,
          style: {height:"90px", fontSize: '15px',}
        }); 
    } catch (error) {
      // Si ocurre un error en la petición, el modal no se cierra
      console.error("Error al registrar la actividad:", error);
    }
  
  };

  useEffect(()=>{
    getTecnicos();
    setFk_mantenimiento(mantenimientoID || "");  // Establece el ID del mantenimiento al abrir
    console.log("Valor ID del mantenimiento:", mantenimientoID);
  },[mantenimientoID]);

  return (
    <>
      <Toaster position="top-center" richColors/>
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[800px] mx-auto">
                Registrar Actividad
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[770px]" onSubmit={SubmitRegistrarActividad}>
                  <div className="grid grid-cols-2 gap-5 gap-x-28 mx-auto">
                  <div className="w-full flex flex-col">
                    <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="ID Mantenimiento"
                          name="fk_mantenimiento"
                          value={fk_mantenimiento}
                          // onChange={(e) => setFk_mantenimiento(e.target.value)}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="date"
                          variant="underlined"
                          label="Fecha Actividad"
                          name="fecha_actividad"
                          value={fecha_actividad}
                          onChange={(e) => setFechaActividad(e.target.value)}
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'email') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'email')[1]}
                            </p>
                          )
                        }
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Textarea
                          placeholder="Ingrese una descripción"
                          className="max-w-xs"
                          label="Descripción"
                          name="descripcion"
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
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
                    <div className="w-full flex flex-col">
                      {variants.map((variant) => (
                        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Select 
                            variant={variant}
                            label="Técnico"
                            value={fk_tecnico}
                            onChange={(e) => setFk_tecnico(e.target.value)} 
                            className="max-w-xs" 
                          >
                            {tenicos.map((tecnico, index) => (
                              <SelectItem key={tecnico.id_tecnico} value={tecnico.id}>
                                 {`${tecnico.nombres} ${tecnico.apellidos}`}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      ))}  
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'estado') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'estado')[1]}
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
                  Registrar
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

export default RegistrarActividad

