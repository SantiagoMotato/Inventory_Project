import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import {Toaster, toast} from 'sonner'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import {Textarea} from "@nextui-org/react";

function RegistrarMantenimiento({ isOpen, onOpen, onClose, getUsuarios }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  const sizes = ["4xl"];
  const variants = ["underlined"];

  const [tipoMantenimiento, setTipoMantenimiento] = useState("");
  const [fechaMantenimiento, setFechaMantenimiento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [responsable, setResponsable] = useState("");
  const [equipo, setEquipo] = useState("");

  const [usersResponsable, setUserResponsable] = useState("");
  const [equipos, setEquipos] = useState("");

  const [validationMessages, setValidationMessages] = useState("");
  const tipoDeMantenimiento = ['predictivo','preventivo','correctivo'];

  const limpiarFormulario = () => {
    setTipoMantenimiento("");
    setFechaMantenimiento("");
    setDescripcion("");
    setResponsable("");
    setEquipo("");
  };

  const postMantenimiento = async() => {
    try {

      const res = await axios.post("http://localhost:4000/mantenimientos/registrar", {
        tipoMantenimiento,
        fechaMantenimiento,
        descripcion,
        responsable,
        equipo
      });
      const data = res.data;
      console.log("Mantenimiento registrado:", data);
      limpiarFormulario(); 
    } catch (error) {
      // console.log("Error al registrar el usuario:", error);
      setValidationMessages(error.response.data.msg);
      console.log(error.response.data);

      throw error;
    }
  };

  const getUsersResponsables = async() =>{
    try {
      const res = await axios.get("http://localhost:4000/usuarios/listar");
      const data = res.data;
      setUserResponsable(data);
      console.log(data);
    } catch (error) {
      console.log("Error al traer los usuarios: ",error);
    }
  };

  const getEquipos = async() =>{
    try {
      const res = await axios.get("http://localhost:4000/equipos/listar");
      const data = res.data;
      setEquipos(data);
      console.log(data);
    } catch (error) {
      console.log("Error al traer los equipos: ",error);
    }
  };


  const SubmitRegistrarMantenimiento = async(event) => {
    event.preventDefault();
    if (
      !tipoMantenimiento ||
      !fechaMantenimiento ||
      !descripcion ||
      !responsable ||
      !equipo
    ) {
      toast.warning('Por favor, completa todos los campos requeridos!',  {
        style: {height:"90px", fontSize: '15px',},
        icon: <IoIosWarning style={{fontSize:"24px"}}/>,
        duration: 2000
      }); 
      return;
    }
    console.log({
    tipoMantenimiento,
    fechaMantenimiento,
    descripcion,
    responsable,
    equipo
    });
    try {
      await postMantenimiento();
      onClose();
      toast.success('Mantenimiento Registrado!',  {
          description: "El mantenimiento ha sido registrado con éxito!",
          icon: <FaCheckCircle className="text-green-500 text-xl"/>,
          style: {height:"90px", fontSize: '15px',}
        }); 
    } catch (error) {
      // Si ocurre un error en la petición, el modal no se cierra
      console.error("Error al registrar el mantenimiento:", error);
    }
  
  };

  useEffect(()=>{
    getUsersResponsables();
    getEquipos();
  },[]);

  return (
    <>
      <Toaster position="top-center" richColors/>
      <Modal size={sizes} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl font-extrabold text-center text-default-500 border-b-3 w-[800px] mx-auto">
                Registrar Mantenimiento
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col justify-center mx-auto pt-6 pb-5 px-8 w-[770px]" onSubmit={SubmitRegistrarMantenimiento}>
                  <div className="grid grid-cols-2 gap-5 gap-x-28 mx-auto">
                    <div className="w-full flex flex-col">
                      {variants.map((variant) => (
                        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Select 
                            variant={variant}
                            label="Tipo Mantenimiento"
                            value={tipoMantenimiento} // Esto debería ser el valor seleccionado del estado
                            onChange={(e) => setTipoMantenimiento(e.target.value)} 
                            className="max-w-xs" 
                          >
                            {tipoDeMantenimiento.map((tipoMantenimiento) => (
                              <SelectItem key={tipoMantenimiento} value={tipoMantenimiento}>
                                {tipoMantenimiento}
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
                    <div className="w-full flex flex-col">
                      <div className="flex w-80 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input
                          type="date"
                          variant="underlined"
                          label="Fecha Mantenimiento"
                          value={fechaMantenimiento}
                          onChange={(e) => setFechaMantenimiento(e.target.value)}
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
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                          
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
                      {variants.map((variant) => (
                        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Select 
                            variant={variant}
                            label="Responsable"
                            value={responsable} // Esto debería ser el valor seleccionado del estado
                            onChange={(e) => setResponsable(e.target.value)} 
                            className="max-w-xs" 
                          >
                            {usersResponsable.map((user, index) => (
                              <SelectItem key={user.id_usuario} value={user.id}>
                                 {`${user.nombres} ${user.apellidos}`}
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
                    <div className="w-full flex flex-col">
                      {variants.map((variant) => (
                        <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                          <Select 
                            variant={variant}
                            label="Equipo"
                            value={equipo} // Esto debería ser el valor seleccionado del estado
                            onChange={(e) => setEquipo(e.target.value)} 
                            className="max-w-xs" 
                          >
                            {equipos.map((equipo) => (
                              <SelectItem key={equipo.id_equipo} value={equipo.id}>
                                {equipo.nombre_equipo}
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

export default RegistrarMantenimiento

