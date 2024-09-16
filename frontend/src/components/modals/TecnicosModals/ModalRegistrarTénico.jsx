import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import {Toaster, toast} from 'sonner'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function RegistrarTecnico({ isOpen, onOpen, onClose, getTecnicos }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const sizes = ["4xl"];
  const variants = ["underlined"];

  const [identificacion, setIdentificacion] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [validationMessages, setValidationMessages] = useState("");

  const limpiarFormulario = () => {
    setIdentificacion("");
    setNombres("");
    setApellidos("");
    setCorreo("");
    setTelefono("");
  };

  const postTecnico = async() => {
    try {
      const res = await axios.post("http://localhost:4000/tecnicos/registrar", {
        identificacion,
        nombres,
        apellidos,
        correo,
        telefono
      });
      const data = res.data;
      console.log("Técnico registrado:", data);
      limpiarFormulario();
      getTecnicos();
    } catch (error) {
      setValidationMessages(error.response.data.msg);
      console.log(error.response.data);

      throw error; 
    }
  };

  // Maneja el evento de click del botón "Registrar"
  const SubmitRegistrarTecnico = async(event) => {
    event.preventDefault();
    if (
      !identificacion ||
      !nombres ||
      !apellidos ||
      !correo ||
      !telefono 
    ) {
      toast.warning('Por favor, completa todos los campos requeridos!',  {
        style: {height:"90px", fontSize: '15px',},
        icon: <IoIosWarning style={{fontSize:"24px"}}/>,
        duration: 2000
      }); 
      return;
    }
    console.log({
        identificacion,
        nombres,
        apellidos,
        correo,
        telefono 
    });
    try {
      await postTecnico();
      onClose();
      toast.success('Ténico Registrado!',  {
          description: "El técnico ha sido registrado con éxito!",
          icon: <FaCheckCircle className="text-green-500 text-xl"/>,
          style: {height:"90px", fontSize: '15px',}
        }); 
    } catch (error) {
      // Si ocurre un error en la petición, el modal no se cierra
      console.error("Error al registrar el técnico:", error);
    }
  
  };

  useEffect(()=>{
    getTecnicos();
  },[]);

  return (
    <>
      <Toaster position="top-center" richColors/>
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[800px] mx-auto">
                Registrar Técnico
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[700px]" onSubmit={SubmitRegistrarTecnico}>
                  <div className="grid grid-cols-2 gap-10 gap-x-32 mx-auto relative right-5">
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="number"
                          variant="underlined"
                          label="Indentificación"
                          value={identificacion}
                          onChange={(e) => setIdentificacion(e.target.value)}
                        />
                      </div>
                        {
                          validationMessages && validationMessages.some(([campo]) => campo === 'identificacion') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'identificacion')[1]}
                            </p>
                          )
                        }
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Nombres"
                          name="nombres"
                          value={nombres}
                          onChange={(e) => setNombres(e.target.value)}
                          
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'nombres') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'nombres')[1]}
                            </p>
                          )
                        }
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="text"
                          variant="underlined"
                          label="Apellidos"
                          name="apellidos"
                          value={apellidos}
                          onChange={(e) => setApellidos(e.target.value)}
                          
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'apellidos') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'apellidos')[1]}
                            </p>
                          )
                        }
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="email"
                          variant="underlined"
                          label="Correo"
                          name="correo"
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'correo') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'correo')[1]}
                            </p>
                          )
                        }
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="number"
                          variant="underlined"
                          label="Teléfono"
                          name="telefono"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          
                        />
                      </div>
                      {
                          validationMessages && validationMessages.some(([campo]) => campo === 'telefono') && (
                            <p className="text-xs text-red-600 font-semibold">
                              {validationMessages.find(([campo]) => campo === 'telefono')[1]}
                            </p>
                          )
                        }
                    </div>
                  </div>
                  <ModalFooter className="relative left-[110px] top-7">
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

export default RegistrarTecnico
